"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { db} from '../database';
const express_1 = __importDefault(require("express"));
const database_1 = require("../database");
var { buildSchema } = require("graphql");
const router = express_1.default.Router();
var DocumentoSchema = new buildSchema({
    name: String,
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now }
});
router.get("/:idEjemplar", async (req, res) => {
    const idEjemplar = req.params.idEjemplar;
    let results = idEjemplar;
    res.send(results).status(200);
    //res.send('Esta es una prueba').status(200);
});
router.put("/:idEjemplar", async (req, res) => {
    const idEjemplar = req.params.idEjemplar;
    let db = (0, database_1.getDatabase)();
    const collection = db.collection("Loans");
    let result = await collection.updateOne({ id: idEjemplar }, { $set: { fechaDevolucion: new Date(), estado: "Prestado" } });
    res.send(result).status(200);
});
exports.default = router;
//# sourceMappingURL=devolucion.js.map