//import { db} from '../database';
import express from "express";
import {getDatabase} from "../database";
import { ObjectId } from 'mongodb';
const { GraphQLObjectType, GraphQLString } = require('graphql');

const router = express.Router();


router.get("/:idEjemplar", async (req, res) => {
    const idEjemplar = req.params.idEjemplar;
    let results = idEjemplar;
    
    res.send(results).status(200);
    //res.send('Esta es una prueba').status(200);
  });



router.put("/:idEjemplar"  , async (req, res) => {
    const idEjemplar = req.params.idEjemplar;
    
    let db = getDatabase();
    const collection = db.collection("Loans");
    let result = await collection.updateOne({_id: new ObjectId(idEjemplar) }, { $set: {fechaDevolucion: new Date(), estado: "Prestado"} });
    
    res.send(result).status(200);
})

export default router;