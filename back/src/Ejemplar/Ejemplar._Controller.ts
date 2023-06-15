import { ObjectId, Filter, UpdateFilter, Collection, FindOptions, InsertOneResult, UpdateResult, DeleteResult } from 'mongodb';
import { Router, Request, Response } from 'express';
import { getDatabase } from '../database';
import Ejemplar from './Ejemplar'

const router = Router();
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
router.get('/', async (req: Request, res: Response) => {
  try {
    const collection = await getCollection();
    const ejemplares = await collection.find({}).toArray();
    res.json(ejemplares);
  } catch (error) {
    console.error('Error getting ejemplares:', error);
    res.status(500).json({ error: 'An error occurred while getting the ejemplares' });
  }
});

// Obtener todos los Ejemplares de un Documento
router.get('/:idDocumento', async (req: Request, res: Response) => {
  try {
    const idDocumento: ObjectId = new ObjectId(req.params.idDocumento);
    const collection = await getCollection();
    const filter = { idDocumento: idDocumento }; // Filtrar por el ID del documento
    const ejemplares = await collection.find(filter).toArray();
    res.json(ejemplares);
  } catch (error) {
    console.error('Error getting Ejemplares:', error);
    res.status(500).json({ error: 'An error occurred while getting the Ejemplares' });
  }
});


// Crear un nuevo Ejemplar
router.post('/:idDocumento', async (req: Request, res: Response) => {
  try {
    const idDocumento: ObjectId = new ObjectId(req.params.idDocumento);
    const ejemplar: Ejemplar = req.body;
    ejemplar.idDocumento = idDocumento; // Establecer la referencia al documento
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
});


// Obtener un Ejemplar por su ID
router.get('/:_id', async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const collection = await getCollection();
    const filter: Filter<Ejemplar> = { _id: new ObjectId(_id.toString()) };
    const ejemplar = await collection.findOne(filter);
    if (ejemplar) {
      res.json(ejemplar);
    } else {
      res.status(404).json({ error: 'Ejemplar not found' });
    }
  } catch (error) {
    console.error('Error getting ejemplar:', error);
    res.status(500).json({ error: 'An error occurred while getting the ejemplar' });
  }
});



// Actualizar un ejemplar
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { estado, ubicacion } = req.body;
    const fecha_registro = new Date();

    const collection = await getCollection();
    const filter: Filter<Ejemplar> = { _id: new ObjectId(id) };
    const updateFilter: UpdateFilter<Ejemplar> = {
      $set: {
        estado,
        ubicacion,
        fecha_registro,
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
});

// Eliminar un ejemplar
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const collection = await getCollection();
    const filter: Filter<Ejemplar> = { _id: new ObjectId(id) };
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
});

export default router;
