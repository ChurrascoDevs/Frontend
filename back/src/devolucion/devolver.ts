//import { db} from '../database';
import express from "express";
import {getDatabase} from "../database";

const router = express.Router();


router.get("/:idEjemplar", async (req, res) => {
    const idEjemplar = req.params.idEjemplar;
    let results = idEjemplar;
  
    res.send(results).status(200);
    //res.send('Esta es una prueba').status(200);
  });

router.put("/:idEjemplar"  , async (req, res) => {
    const idEjemplar = req.params.idEjemplar;
    let results = idEjemplar;
    let db = getDatabase();
    const collection = db.collection("Loans");
    collection.findOneAndUpdate(
        { idEjemplar },
        { $set: { fechaDevolucion: new Date() } },
      );
    
    res.send(results).status(200);
})

export default router;