"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabase = exports.connectDatabase = void 0;
const mongodb_1 = require("mongodb");
const dbUrl = 'mongodb+srv://churrascodev:tl3KOlTJknX9famR@biblioteca.gwpwikv.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'BibliotecaDB'; //nombre de la base de datos
let db;
const connectDatabase = async () => {
    try {
        const client = await mongodb_1.MongoClient.connect(dbUrl); //se conecta con el mongodb atlas (servidor que aloja la DB)
        db = client.db(dbName);
        console.log('Conexión exitosa a MongoDB Atlas');
    }
    catch (error) {
        console.error('Error de conexión a MongoDB:', error);
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
const getDatabase = () => {
    if (!db) {
        throw new Error('La conexión a la base de datos no ha sido establecida');
    }
    return db;
};
exports.getDatabase = getDatabase;
//# sourceMappingURL=database.js.map