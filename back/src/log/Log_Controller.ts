import { ObjectId, OptionalId, Filter, UpdateFilter, Collection } from 'mongodb';
import { Router, Request, Response } from 'express';
import { getDatabase } from '../database';
import Log from './Log';

const router = Router();
let collection: Collection<Log>;

// Obtener la colección de logs
const getCollection = async (): Promise<Collection<Log>> => {
  if (!collection) {
    const db = await getDatabase();
    collection = db.collection<Log>('Logs');
  }
  return collection;
};

const createLog = async (log: Log) => {
    try {
      log.fecha_registro = new Date();
      const collection = await getCollection();
      const result = await collection.insertOne(log);
      const createdLogId = result.insertedId;
  
      let createdLog: Log | null = null;
      if (createdLogId) {
        createdLog = Object.assign({}, log, { _id: createdLogId });
      }
  
      return createdLog;
    } catch (error) {
      console.error('Error creating Log:', error);
      throw new Error('An error occurred while creating the Log');
    }
  };

const getLog = async (id: string) => {
    try {
      const collection = await getCollection();
      const filter: Filter<Log> = { _id: new ObjectId(id) };
      const log = await collection.findOne(filter);
      if (log) {
        return log;
      } else {
        throw new Error('log not found');
      }
    } catch (error) {
      console.error('Error getting log:', error);
      throw new Error('An error occurred while getting the log');
    }
  };
  const getAllLogs = async () => {
    try {
      const collection = await getCollection();
      const logs = await collection.find().toArray();
      return logs;
    } catch (error) {
      console.error('Error getting logs:', error);
      throw new Error('An error occurred while getting the logs');
    }
  };

export {createLog,
        getLog,
        getAllLogs};
