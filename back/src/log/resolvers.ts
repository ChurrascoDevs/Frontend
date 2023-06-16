import { ObjectId } from "mongodb";
import { getDatabase } from "../database";
import Log from './Log';


export const resolvers = {
    Query: {
        crearLog: async (root: any, args: any) => {
            const { tipo_metodo, tipo_log, descripcion, fecha_registro } = args;
            let db = getDatabase();
            const collection = db.collection("Logs");
      
            const log: Log = {
              _id: new ObjectId(),
              tipo_metodo: tipo_metodo || null,
              tipo_log: tipo_log || null,
              descripcion: descripcion || null,
              fecha_registro: fecha_registro || null
            };
      
            const result = await collection.insertOne(log);
            const createdLogId = result.insertedId;
          
              let createdLog: Log | null = null;
              if (createdLogId) {
                createdLog = { _id: createdLogId, ...log };
              }        
              if (result.acknowledged){
                return true;
            }
            return false;   
        }
        
    }
};