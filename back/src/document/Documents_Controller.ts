import { ObjectId, OptionalId, Filter, UpdateFilter, Collection, FindOptions } from 'mongodb';
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

router.post('/', async (req: Request, res: Response) => {
  try {
    console.log('body',req.body);
    const document: Document = req.body;
    document.fecha_registro = new Date();
    console.log('Created Document:', document);
    const collection = await getCollection();
    const result = await collection.insertOne(document);
    const createdDocumentId = result.insertedId;

    let createdDocument: Document | null = null;
    if (createdDocumentId) {
      createdDocument = Object.assign({}, document, { _id: createdDocumentId });
    }

    console.log('Created Document:', createdDocument);

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
router.post('/search/:type', async (req: Request, res: Response) => {
  try {
    const searchType: string = req.params.type;
    const searchValue: string = req.body.value;

    const collection: Collection<Document> = await getCollection();
    const filter: Filter<Document> = {};

    switch (searchType) {
      case 'nombre':
        filter.titulo = searchValue;
        break;
      case 'categoria':
        filter.categoria = searchValue;
        break;
      case 'autor':
        filter.autor = searchValue;
        break;
      case 'anio':
        filter.anio = parseInt(searchValue);
        break;
      // Agrega más casos para otros tipos de búsqueda según tus necesidades

      default:
        res.status(400).json({ error: 'Invalid search type' });
        return;
    }

    const documents: Document[] = await collection.find(filter).toArray();
    res.json(documents);
  } catch (error) {
    console.error('Error searching documents:', error);
    res.status(500).json({ error: 'An error occurred while searching the documents' });
  }
});


// Obtener los últimos X libros ingresados
router.get('/ultimos/:count', async (req: Request, res: Response) => {
  try {
    const count: number = parseInt(req.params.count);
    const collection: Collection<Document> = await getCollection();
    const filter: Filter<Document> = { categoria: 'libros' };
    const options: FindOptions<Document> = {
      sort: { fecha_registro: -1 },
      limit: count,
      projection: {}
    };
    const documents: Document[] = await collection.find(filter, options).toArray();

    res.json(documents);
  } catch (error) {
    console.error('Error getting latest documents:', error);
    res.status(500).json({ error: 'An error occurred while getting the latest documents' });
  }
});
export default router;
