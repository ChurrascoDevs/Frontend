"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const express_1 = require("express");
const database_1 = require("../database");
const router = (0, express_1.Router)();
let collection;
// Obtener la colección de documentos
const getCollection = async () => {
    if (!collection) {
        const db = await (0, database_1.getDatabase)();
        collection = db.collection('documents');
    }
    return collection;
};
// Crear un nuevo documento
router.post('/create', async (req, res) => {
    try {
        const document = req.body;
        const collection = await getCollection();
        const result = await collection.insertOne(document);
        const createdDocumentId = result.insertedId;
        let createdDocument = null;
        if (createdDocumentId) {
            createdDocument = { _id: createdDocumentId, ...document };
        }
        res.status(201).json(createdDocument);
    }
    catch (error) {
        console.error('Error creating document:', error);
        res.status(500).json({ error: 'An error occurred while creating the document' });
    }
});
// Obtener un documento por su ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await getCollection();
        const filter = { _id: new mongodb_1.ObjectId(id.toString()) };
        const document = await collection.findOne(filter);
        if (document) {
            res.json(document);
        }
        else {
            res.status(404).json({ error: 'Document not found' });
        }
    }
    catch (error) {
        console.error('Error getting document:', error);
        res.status(500).json({ error: 'An error occurred while getting the document' });
    }
});
// Actualizar un documento
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const collection = await getCollection();
        const filter = { _id: new mongodb_1.ObjectId(id) };
        const updateFilter = { $set: updates };
        const result = await collection.updateOne(filter, updateFilter);
        if (result.modifiedCount) {
            res.json({ success: true });
        }
        else {
            res.status(404).json({ error: 'Document not found' });
        }
    }
    catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ error: 'An error occurred while updating the document' });
    }
});
// Eliminar un documento
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await getCollection();
        const filter = { _id: new mongodb_1.ObjectId(id) };
        const result = await collection.deleteOne(filter);
        if (result.deletedCount) {
            res.json({ success: true });
        }
        else {
            res.status(404).json({ error: 'Document not found' });
        }
    }
    catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ error: 'An error occurred while deleting the document' });
    }
});
// Obtener todos los documentos
router.get('/', async (req, res) => {
    try {
        const collection = await getCollection();
        const documents = await collection.find({}).toArray();
        res.json(documents);
    }
    catch (error) {
        console.error('Error getting documents:', error);
        res.status(500).json({ error: 'An error occurred while getting the documents' });
    }
});
// Buscar documentos según criterios específicos
router.post('/search', async (req, res) => {
    try {
        const criteria = req.body;
        const collection = await getCollection();
        const documents = await collection.find(criteria).toArray();
        res.json(documents);
    }
    catch (error) {
        console.error('Error searching documents:', error);
        res.status(500).json({ error: 'An error occurred while searching the documents' });
    }
});
exports.default = router;
//# sourceMappingURL=Documents_Controller.js.map