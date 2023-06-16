import { ObjectId, OptionalId, Filter, UpdateFilter, Collection } from 'mongodb';
import { Router, Request, Response } from 'express';
import { getDatabase } from '../database';
import Document from './Document';

const router = Router();
let collection: Collection<Document>;

// Obtener la colección de documentos
const getCollection = async (): Promise<Collection<Document>> => {
  if (!collection) {
    const db = await getDatabase();
    collection = db.collection<Document>('documents');
  }
  return collection;
};

// Crear un nuevo documento
router.post('/create', async (req: Request, res: Response) => {
    try {
      const document: OptionalId<Document> = req.body;
      const collection = await getCollection();
      const result = await collection.insertOne(document);
      const createdDocumentId = result.insertedId;
  
      let createdDocument: Document | null = null;
      if (createdDocumentId) {
        createdDocument = { _id: createdDocumentId, ...document };
      }
  
      res.status(201).json(createdDocument);
    } catch (error) {
      console.error('Error creating document:', error);
      res.status(500).json({ error: 'An error occurred while creating the document' });
    }
  });
  
  
  
  

// Obtener un documento por su ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const collection = await getCollection();
    const filter: Filter<Document> = { _id: new ObjectId(id.toString()) };
    const document = await collection.findOne(filter);
    if (document) {
      res.json(document);
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    console.error('Error getting document:', error);
    res.status(500).json({ error: 'An error occurred while getting the document' });
  }
});

// Actualizar un documento
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates: Partial<Document> = req.body;
    const collection = await getCollection();
    const filter: Filter<Document> = { _id: new ObjectId(id) };
    const updateFilter: UpdateFilter<Document> = { $set: updates };
    const result = await collection.updateOne(filter, updateFilter);
    if (result.modifiedCount) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ error: 'An error occurred while updating the document' });
  }
});

// Eliminar un documento
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const collection = await getCollection();
    const filter: Filter<Document> = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(filter);
    if (result.deletedCount) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'An error occurred while deleting the document' });
  }
});

// Obtener todos los documentos
router.get('/', async (req: Request, res: Response) => {
  try {
    const collection = await getCollection();
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (error) {
    console.error('Error getting documents:', error);
    res.status(500).json({ error: 'An error occurred while getting the documents' });
  }
});

// Buscar documentos según criterios específicos
router.post('/search', async (req: Request, res: Response) => {
  try {
    const criteria: Partial<Document> = req.body;
    const collection = await getCollection();
    const documents = await collection.find(criteria).toArray();
    res.json(documents);
  } catch (error) {
    console.error('Error searching documents:', error);
    res.status(500).json({ error: 'An error occurred while searching the documents' });
  }
});

export default router;
