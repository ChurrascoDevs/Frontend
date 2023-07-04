import { ObjectId, OptionalId, Filter, UpdateFilter, Collection, FindOptions } from 'mongodb';
import { Request, Response, Router } from 'express';
import { getDatabase } from '../database';
import Document from './Document';

const router = Router();
let collection: Collection<Document>;

// Obtener la colección de Documentos
const getCollection = async (): Promise<Collection<Document>> => {
  if (!collection) {
    const db = await getDatabase();
    collection = db.collection<Document>('Documents');
  }
  return collection;
};

// Crear un Documento
const createDocumentController = async (document: Document) => {
  try {
    document.fecha_registro = new Date();
    const collection = await getCollection();
    const result = await collection.insertOne(document);
    const createdDocumentId = result.insertedId;

    let createdDocument: Document | null = null;
    if (createdDocumentId) {
      createdDocument = Object.assign({}, document, { _id: createdDocumentId });
    }

    return createdDocument;
  } catch (error) {
    console.error('Error creating Document:', error);
    throw new Error('An error occurred while creating the Document');
  }
};

const createDocumentControllerMid = async (req: Request, res: Response) => {
  try {
    const document: Document = req.body;
    document.fecha_registro = new Date();
    //console.log('Created Document:', document);
    const collection = await getCollection();
    const result = await collection.insertOne(document);
    const createdDocumentId = result.insertedId;

    let createdDocument: Document | null = null;
    if (createdDocumentId) {
      createdDocument = Object.assign({}, document, { _id: createdDocumentId });
    }

    res.status(201).json(createdDocument);
  } catch (error) {
    console.error('Error creating Document:', error);
    res.status(500).json({ error: 'An error occurred while creating the Document' });
  }
};


// Obtener un Documento por su ID
const getDocumentController = async (id: string) => {
  try {
    const collection = await getCollection();
    const filter: Filter<Document> = { _id: new ObjectId(id) };
    const document = await collection.findOne(filter);
    if (document) {
      return document;
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    console.error('Error getting Document:', error);
    throw new Error('An error occurred while getting the Document');
  }
};

// Obtener un Documento por su ID
const getDocumentControllerMid = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const collection = await getCollection();
    const filter: Filter<Document> = { _id: new ObjectId(id) };
    const document = await collection.findOne(filter);
    if (document) {
      res.json(document);
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    console.error('Error getting Document:', error);
    res.status(500).json({ error: 'An error occurred while getting the Document' });
  }
};



// Actualizar un Documento
const updateDocumentController = async (id: string, updates: Partial<Document>) => {
  try {
    const collection = await getCollection();
    const filter: Filter<Document> = { _id: new ObjectId(id) };
    const updateFilter: UpdateFilter<Document> = { $set: updates };

    // Actualizar el documento
    const result = await collection.findOneAndUpdate(filter, updateFilter);

    // Verificar si se realizó la actualización correctamente
    if (result.ok && result.value) {
      // Realizar una búsqueda para obtener el documento actualizado
      const updatedDocument = await collection.findOne(filter);
      if (updatedDocument) {
        return updatedDocument;
      } else {
        throw new Error('Failed to retrieve updated document');
      }
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    console.error('Error updating Document:', error);
    throw new Error('An error occurred while updating the Document');
  }
};




const updateDocumentMiddleware = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates: Partial<Document> = req.body;
  try {
    const result = await updateDocumentController(id, updates);
    res.json(result);
  } catch (error) {
    console.error('Error updating Document:', error);
    res.status(500).json({ error: 'An error occurred while updating the Document' });
  }
};




// Eliminar un Documento
const deleteDocumentController = async (id: string) => {
  try {
    const collection = await getCollection();
    const filter: Filter<Document> = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(filter);
    if (result.deletedCount) {
      const message="Document deleted successfully"
      return message;
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    console.error('Error deleting Document:', error);
    throw new Error('An error occurred while deleting the Document');
  }
};

const deleteDocumentControllerMid = async (req: Request, res: Response) => {
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
    console.error('Error deleting Document:', error);
    res.status(500).json({ error: 'An error occurred while deleting the Document' });
  }
};


// Obtener todos los Documentos
const getAllDocumentsController = async () => {
  try {
    const collection = await getCollection();
    const documents = await collection.find().toArray();
    return documents;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw new Error('An error occurred while getting the documents');
  }
};

const getAllDocumentsControllerMid = async (req: Request, res: Response) => {
  try {
    const collection = await getCollection();
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (error) {
    console.error('Error getting Documents:', error);
    res.status(500).json({ error: 'An error occurred while getting the Documents' });
  }
};

// Buscar Documentos según criterios específicos
const searchDocumentsController = async (req: Request) => {
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
        filter.anio = searchValue;
        break;
    }

    const documents: Document[] = await collection.find(filter).toArray();
    return documents;
  } catch (error) {
    console.error('Error searching Documents:', error);
    throw new Error('An error occurred while searching the Documents');
  }
};

const searchDocumentsControllerMid = async (req: Request, res: Response) => {
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
        filter.anio = searchValue;
        break;
      // Agrega más casos para otros tipos de búsqueda según tus necesidades

      default:
        res.status(400).json({ error: 'Invalid search type' });
        return;
    }

    const documents: Document[] = await collection.find(filter).toArray();
    res.json(documents);
  } catch (error) {
    console.error('Error searching Documents:', error);
    res.status(500).json({ error: 'An error occurred while searching the Documents' });
  }
};



const getLatestDocumentsController = async (count:number) => {
  try {
    const collection: Collection<Document> = await getCollection();
    const filter: Filter<Document> = { categoria: 'libros' };
    //console.log("count",count);
    const options: FindOptions<Document> = {
      sort: { fecha_registro: -1 },
      limit: count,
      projection: {}
    };
    const documents: Document[] = await collection.find(filter, options).toArray();
    //console.log(documents)
    return documents;
  } catch (error) {
    console.error('Error getting latest Documents:', error);
    throw new Error('An error occurred while getting the latest Documents');
  }
};

const getLatestDocumentsControllerMid = async (req: Request, res: Response) => {
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
    console.error('Error getting latest Documents:', error);
    res.status(500).json({ error: 'An error occurred while getting the latest Documents' });
  }
};


export {
  createDocumentController,
  getDocumentController,
  updateDocumentController,
  deleteDocumentController,
  getAllDocumentsController,
  searchDocumentsController,
  getLatestDocumentsController,
  updateDocumentMiddleware,
  getLatestDocumentsControllerMid,
  createDocumentControllerMid,
  getDocumentControllerMid,
  deleteDocumentControllerMid,
  searchDocumentsControllerMid,
  getAllDocumentsControllerMid
};

export default router;