import { MongoClient, Db } from 'mongodb';

const dbUrl = 'mongodb+srv://churrascodev:tl3KOlTJknX9famR@biblioteca.gwpwikv.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'BibliotecaDB'; //nombre de la base de datos

let db: Db;

export const connectDatabase = async (): Promise<void> => {
  try {
    const client = await MongoClient.connect(dbUrl); //se conecta con el mongodb atlas (servidor que aloja la DB)
    db = client.db(dbName);
    console.log('Conexión exitosa a MongoDB Atlas');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    throw error;
  }
};

export const getDatabase = (): Db => {
  if (!db) {
    throw new Error('La conexión a la base de datos no ha sido establecida');
  }
  return db;
};
