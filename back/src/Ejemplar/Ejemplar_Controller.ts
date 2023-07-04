import { ObjectId, Filter, UpdateFilter, Collection, FindOptions, InsertOneResult, UpdateResult, DeleteResult } from 'mongodb';
import { Request, Response } from 'express';
import { getDatabase } from '../database';
import Ejemplar from './Ejemplar';

let collection: Collection<Ejemplar>;

// Obtener la colección de Ejemplares
const getCollection = async (): Promise<Collection<Ejemplar>> => {
  if (!collection) {
    const db = await getDatabase();
    collection = db.collection<Ejemplar>('Ejemplares');
  }
  return collection;
};

// Obtener todos los Ejemplares
const getEjemplares = async (req: Request, res: Response) => {
  try {
    const collection = await getCollection();
    const ejemplares = await collection.find({}).toArray();
    res.json(ejemplares);
  } catch (error) {
    console.error('Error getting ejemplares:', error);
    res.status(500).json({ error: 'An error occurred while getting the ejemplares' });
  }
};
const getEjemplaresQL = async () => {
  try {
    const collection = await getCollection();
    const ejemplares = await collection.find({}).toArray();
    return ejemplares;
  } catch (error) {
    console.error('Error getting ejemplares:', error);
    throw new Error('An error occurred while getting the ejemplares');
  }
};


// Obtener todos los Ejemplares de un Documento
const getEjemplaresByDocumento = async (req: Request, res: Response) => {
  try {
    const idDocumento: ObjectId = new ObjectId(req.params.idDocumento);
    const collection = await getCollection();
    const filter = { idDocumento: idDocumento }; // Filtrar por el ID del Documento
    const ejemplares = await collection.find(filter).toArray();
    res.json(ejemplares);
  } catch (error) {
    console.error('Error getting Ejemplares:', error);
    res.status(500).json({ error: 'An error occurred while getting the Ejemplares' });
  }
};

const getEjemplaresByDocumentoQL = async (idDocumento: string) => {
  try {
    const objectIdDocumento: ObjectId = new ObjectId(idDocumento);
    const collection = await getCollection();
    const filter = { idDocumento: objectIdDocumento };
    const ejemplares = await collection.find(filter).toArray();
    return ejemplares;
  } catch (error) {
    console.error('Error getting Ejemplares:', error);
    throw new Error('An error occurred while getting the Ejemplares');
  }
};

// Crear un nuevo Ejemplar
const createEjemplar = async (req: Request, res: Response) => {
  try {
    const idDocumento: ObjectId = new ObjectId(req.params.idDocumento);
    const ejemplar: Ejemplar = req.body;
    ejemplar.idDocumento = idDocumento; // Establecer la referencia al Documento
    ejemplar.fecha_registro = new Date();

    const collection = await getCollection();
    const result = await collection.insertOne(ejemplar);
    const createdEjemplarId: ObjectId = result.insertedId;
    const createdEjemplar = Object.assign({}, ejemplar, { _id: createdEjemplarId });
    res.status(201).json(createdEjemplar);
  } catch (error) {
    console.error('Error creating Ejemplar:', error);
    res.status(500).json({ error: 'An error occurred while creating the Ejemplar' });
  }
};

const createEjemplarQL = async (ejemplar: Ejemplar) => {
  try {
    ejemplar.fecha_registro=new Date();
    const collection = await getCollection();
    const result = await collection.insertOne(ejemplar);
    const createdEjemplarId = result.insertedId;
    let createdEjemplar: Document | null = null;
    if (createdEjemplarId) {
      createdEjemplar = Object.assign({}, document, { _id: createdEjemplarId });
    }

    return createdEjemplar;
  } catch (error) {
    console.error('Error creating Ejemplar:', error);
    throw new Error('An error occurred while creating the Ejemplar');
  }
};



// Obtener un Ejemplar por su ID
const getEjemplarById = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const collection = await getCollection();
    const filter: Filter<Ejemplar> = { _id: new ObjectId((id.toString())) };
    
    const ejemplar = await collection.findOne(filter);
    console.log("ejemplar",ejemplar);
    if (ejemplar) {
      res.json(ejemplar);
    } else {
      res.status(404).json({ error: 'Ejemplar not found' });
    }
  } catch (error) {
    console.error('Error getting ejemplar:', error);
    res.status(500).json({ error: 'An error occurred while getting the ejemplar' });
  }
};

const getEjemplarByIdQL = async (id: string) => {
  try {
    const collection = await getCollection();
    const id_aux=new ObjectId(id);
    const filter: Filter<Ejemplar> = { _id: id_aux };
    console.log('id',id_aux);
    const ejemplar = await collection.findOne(filter);
    console.log("ejemplar", ejemplar);
    if (ejemplar) {
      return ejemplar;
    } else {
      throw new Error('Ejemplar not found');
    }
  } catch (error) {
    console.error('Error getting ejemplar:', error);
    throw new Error('An error occurred while getting the ejemplar');
  }
};


// Actualizar un ejemplar
const updateEjemplar = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const { estado } = req.body;

    const collection = await getCollection();
    const filter: Filter<Ejemplar> = { _id: new ObjectId(_id) };
    const updateFilter: UpdateFilter<Ejemplar> = {
      $set: {
        estado,
      },
    };

    const result: UpdateResult = await collection.updateOne(filter, updateFilter);
    if (result.modifiedCount > 0) {
      res.json({ message: 'Ejemplar updated successfully' });
    } else {
      res.status(404).json({ error: 'Ejemplar not found' });
    }
  } catch (error) {
    console.error('Error updating ejemplar:', error);
    res.status(500).json({ error: 'An error occurred while updating the ejemplar' });
  }
};
const updateEjemplarQL = async (id: string, { estado, ubicacion, fecha_registro }: any) => {
  try {
    const collection = await getCollection();
    const filter: Filter<Ejemplar> = { _id: new ObjectId(id) };
    const updateFilter: UpdateFilter<Ejemplar> = {
      $set: {
        estado,
        ubicacion,
        fecha_registro: new Date(fecha_registro),
      },
    };

    const result: UpdateResult = await collection.updateOne(filter, updateFilter);
    if (result.modifiedCount > 0) {
      const updatedEjemplar = await collection.findOne(filter);
      return updatedEjemplar;
    } else {
      throw new Error('Ejemplar not found');
    }
  } catch (error) {
    console.error('Error updating Ejemplar:', error);
    throw new Error('An error occurred while updating the Ejemplar');
  }
};

// Eliminar un ejemplar
const deleteEjemplar = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const collection = await getCollection();
    const filter: Filter<Ejemplar> = { _id: new ObjectId(_id) };
    const result: DeleteResult = await collection.deleteOne(filter);
    if (result.deletedCount > 0) {
      res.json({ message: 'Ejemplar deleted successfully' });
    } else {
      res.status(404).json({ error: 'Ejemplar not found' });
    }
  } catch (error) {
    console.error('Error deleting ejemplar:', error);
    res.status(500).json({ error: 'An error occurred while deleting the ejemplar' });
  }
};
const deleteEjemplarQL = async (id: string) => {
  try {
    const collection = await getCollection();
    const filter: Filter<Ejemplar> = { _id: new ObjectId(id) };
    const result: DeleteResult = await collection.deleteOne(filter);
    if (result.deletedCount > 0) {
      const message= 'Ejemplar deleted successfully';
      return message;
    } else {
      throw new Error('Ejemplar not found');
    }
  } catch (error) {
    console.error('Error deleting ejemplar:', error);
    throw new Error('An error occurred while deleting the ejemplar');
  }
};

export {
  getEjemplares,
  getEjemplaresByDocumento,
  createEjemplar,
  getEjemplarById,
  updateEjemplar,
  deleteEjemplar,
  getEjemplaresQL,
  getEjemplaresByDocumentoQL,
  createEjemplarQL,
  getEjemplarByIdQL,
  updateEjemplarQL,
  deleteEjemplarQL

};
