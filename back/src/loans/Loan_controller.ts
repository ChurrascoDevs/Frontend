import { ObjectId, OptionalId, Filter, UpdateFilter, Collection } from 'mongodb';
import { Router, Request, Response } from 'express';
import { getDatabase } from '../database';
import  LoanModel, {Loan} from './Loan';
import { updateEjemplar } from '../Ejemplar/Ejemplar_Controller';
import { json } from 'body-parser';

const router = Router();
let collection: Collection<Loan>;
let collectionNameDB = "Loans";

// Obtener la colección de prestamos
const getCollection = async (): Promise<Collection<Loan>> => {
    if (!collection) {
        const db = await getDatabase();
        collection = db.collection<Loan>(collectionNameDB);
    }
  return collection;
};

//Global error handler - TODO: inprove with includes substring intead exact match
function HandleErrorCode(e: Error, collectionName: String, sourceError: String, res: Response){
    let HTTPcode = null;
    switch (e.message) {
        case "invalid query syntax":
            HTTPcode = 400;
            break;
        case "Element not found":
            HTTPcode = 404
            break;
        case "Internal DB error":
            HTTPcode = 502 //bad gateway, db not work properly
        default:
            HTTPcode = 500
            break;
    }
    //Print in server - TODO save errors in DB
    console.error("Error in collection, function: ", collectionName + "(" + sourceError +")");
    console.error("Details: ", HTTPcode, " - ", e.message);

    //final response
    return res.status(HTTPcode).json({ status: 'error', message: String(e), source: collectionName + "(" + sourceError +")" })
}

// === GETS's ===
// All
router.get('/getAll', async (req, res) => {
    try {
        const Loans = await getCollection();
        const all_loans = await Loans.find().toArray();

        return res.status(200).json({content: all_loans});
    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "getAll" , res);
    }
});

//By Loan ID
router.get('/get/:id', async (req, res) => {
    try {
        const requested_id = req.params.id;
        const Loans = await getCollection();
        const loanX = await Loans.findOne({_id: new ObjectId(requested_id)});

        return res.status(200).json({content: loanX})
    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "get/:id" , res);
    }
});

//By state - PD: if need a specific user: get from id and later filter in front
router.get('/getAllState/:state', async (req, res) => {
    try {
        //chequeo de query
        const state = req.params.state.slice(0, -1); //delete the 's' -> (Solicitados, Prestados, Devueltos)
        const Choices = ["Solicitado", "Prestado", "Devuelto", "Rechazado"];
        if (!Choices.some(Choices => state.includes(Choices))) {
            throw new Error("invalid query syntax"); 
        }
        
        //Lista de Prestamos
        const Loans = await getCollection();
        const requested_loans = await Loans.find({estado: state}).toArray();

        return res.status(200).json({content: requested_loans});
    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "getAllState/:state" , res);
    }
});

//By a userID
router.get('/getAllUser/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const Loans = await getCollection();
        const user_loans = await Loans.find({idUsuario: userId}).toArray();
        return res.status(200).json({content: user_loans});
    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "getAllUser/:userId" , res);
    }
});

//By document ID
router.get('/getAllCopyHistory/:documentId', async (req, res) => {
    try {
        const documentId = req.params.documentId
        //Lista de usuarios (Documentos) de la base de datos (DB)
        const Loans = await getCollection();
        const user_loans = await Loans.find({idEjemplar: documentId}).toArray();
        return res.status(200).json({content: user_loans});
    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "getAllCopyHistory/:documentId" , res);
    }
});

// === POST ===
// Create one
router.post('/new', async (req, res) => {
    try {
        const { idUsuario, idEjemplar, tipoPrestamo } = req.body;
        const Loans = await getCollection();

        const newLoan = new LoanModel(
            {idUsuario, idEjemplar, tipoPrestamo} //implicit assignation (same var names)
        );        
        const result = await Loans.insertOne(newLoan);
        
        if (result.insertedId) {
            return res.status(200).json({success: true, content: result.insertedId})
        } else {
            throw new Error("Internal DB error");
        }
    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "new" , res);
    }
});

// === PATCH ===
// Update one by step and date (optional)
router.patch('/update', async (req, res) => {
    try {
        const { idPrestamo, tipoActualizacion, fechaDevolucion } = req.body; // fechaDevolucion solo cuando tipo es aceptar
        const Loans = await getCollection();
        const targetId = new ObjectId(idPrestamo)
        let target_loan = await Loans.findOne({_id: targetId});
        let result = null;
        
        if(!target_loan){
            throw new Error("Element not found");
        }

        switch (tipoActualizacion) {
            case 'rechazar':
                result = await Loans.updateOne({_id: targetId},{$set: {estado: "Rechazado"}});
                break;
            case 'aceptar':
                //validation of document not "Tomado" ("Disponible") via front
                let transformFd = fechaDevolucion ? fechaDevolucion : new Date(Date.now() + 7);
                result = await Loans.updateOne({_id: targetId}, { $set: {fechaPrestamo: new Date(Date.now()), fechaDevolucion: new Date(transformFd), estado: "Prestado"}});
                //updateEjemplar handled via front + rollback if needed
                break;
            case 'cerrar':
                result = await Loans.updateOne({_id: targetId},{$set:{fechaDevolucionReal: new Date(Date.now()), estado: "Devuelto"}});
                break;
            default:
                throw new Error("Invalid query syntax");
        }

        if (result.modifiedCount) {
            return res.status(200).json({success: true});
        } else {
            throw new Error("Element not found");
        }

    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "update" , res);
    }
});

// === DELETE ===
// By ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const requested_id = req.params.id;
        const Loans = await getCollection();
        const loanX = await Loans.deleteOne({_id: new ObjectId(requested_id)});

        if (loanX.deletedCount) {
            return res.status(200).json({success: true})
        } else {
            throw new Error("Element not found");
        }

    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "delete" , res);
    }
});

export default router;