import { ObjectId, OptionalId, Filter, UpdateFilter, Collection } from 'mongodb';
import { Router, Request, Response } from 'express';
import { getDatabase } from '../database';
import  LoanModel, {Loan} from './Loan';

const router = Router();
let collection: Collection<Loan>;
let collectionNameDB = "Loans";

// Obtener la colección de prestamos
export const getCollection = async (): Promise<Collection<Loan>> => {
    if (!collection) {
        const db = await getDatabase();
        collection = db.collection<Loan>(collectionNameDB);
    }
  return collection;
};

//Global error handler - TODO: inprove with includes substring intead exact match
function HandleErrorCode(e: Error, collectionName: String, sourceError: String){
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
    return HTTPcode.toString(); //res.status(HTTPcode).json({ status: 'error', message: String(e), source: collectionName + "(" + sourceError +")" })
}

// === GETS's ===
// All
export const getAllLoansController = async (req: Request, res: Response) => {
    try {
        const Loans = await getCollection();
        const all_loans = await Loans.find().toArray();
        return all_loans;
    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "getAll");
    }
};

//By Loan ID
export const getLoanByIDController = async (id:string) => {
    try {
        const Loans = await getCollection();
        const loanX = await Loans.findOne({_id: new ObjectId(id)});

        if(loanX){
            return loanX
        }else{
            throw new Error("Loan not found");
        }

    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "get/:id");
    }
};

//By state - PD: if need a specific user: get from id and later filter in front
export const getLoansByStateController = async (estado:string) => {
    try {
        //chequeo de query
        const state = estado.slice(0, -1); //delete the 's' -> (Solicitados, Prestados, Devueltos)
        const Choices = ["Solicitado", "Prestado", "Devuelto", "Rechazado"];
        if (!Choices.some(Choices => state.includes(Choices))) {
            throw new Error("invalid query syntax"); 
        }
        
        //Lista de Prestamos
        const Loans = await getCollection();
        const requested_loans = await Loans.find({estado: state}).toArray();
        console.log(requested_loans)

        return requested_loans;
    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "getAllState/:state");
    }
};

//By a userID
export const getLoansByUserIDController = async (idUsuario:string) => {
    try {
        const userId = idUsuario;
        const Loans = await getCollection();
        const user_loans = await Loans.find({idUsuario: userId}).toArray();
        console.log(user_loans)
        return user_loans;
    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "getAllUser/:userId");
    }
};

//By document ID
export const getLoansByDocumentIDController = async (idEjemplar:string) => {
    try {
        const documentId = idEjemplar
        //Lista de usuarios (Documentos) de la base de datos (DB)
        const Loans = await getCollection();
        const user_loans = await Loans.find({idEjemplar: documentId}).toArray();
        return user_loans;
    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "getAllCopyHistory/:documentId");
    }
};

// === POST ===
// Create one
export const newLoanController = async (idUsuario: string, idEjemplar: string, tipoPrestamo: string) => {
    try {
        const Loans = await getCollection();

        const newLoan = new LoanModel(
            {idUsuario, idEjemplar, tipoPrestamo} //implicit assignation (same var names)
        );        
        const result = await Loans.insertOne(newLoan);
        
        if (result.insertedId) {
            return result.insertedId
        } else {
            throw new Error("Internal DB error");
        }
    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "new");
    }
};

// === PATCH ===
// Update one by step and date (optional)
export const updateLoanController = async (idPrestamo:string, tipoActualizacion: string, fechaDevolucion: string) => {
    try {
        //const { idPrestamo, tipoActualizacion, fechaDevolucion } = req.body; // fechaDevolucion solo cuando tipo es aceptar
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
                let transformFd = fechaDevolucion ? fechaDevolucion : new Date(Date.now() + 7);
                result = await Loans.updateOne({_id: targetId}, { $set: {fechaPrestamo: new Date(Date.now()), fechaDevolucion: new Date(transformFd), estado: "Prestado"}});
                break;
            case 'cerrar':
                result = await Loans.updateOne({_id: targetId},{$set:{fechaDevolucionReal: new Date(Date.now()), estado: "Devuelto"}});
                break;
            default:
                throw new Error("Invalid query syntax");
        }

        if (result.modifiedCount) {
            return true;
        } else {
            throw new Error("Element not found");
        }

    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "update");
    }
};

// === DELETE ===
// By ID
export const deleteLoanController = async (_id:string) => {
    try {
        const requested_id = _id;
        const Loans = await getCollection();
        const loanX = await Loans.deleteOne({_id: new ObjectId(requested_id)});

        if (loanX.deletedCount) {
            return true
        } else {
            throw new Error("Element not found");
        }

    } catch (e: any){
        return HandleErrorCode(e, collectionNameDB, "delete");
    }
};

export default router;