import { buildSchema } from "graphql";
import { Request, Response} from 'express';
import {
    createLog,
    getLog,
    getAllLogs
} from './Log_Controller';

export const schema = buildSchema(`
    type Log {
        _id: ID
        tipo_metodo: String! 
        tipo_log: String! 
        descripcion: String!
        fecha_registro: String!
    }

    type Query {
        getlog(id: String!): Log
        logs: [Log]
    }

    type Mutation {
        createLog(tipo_metodo: String!,
            tipo_log: String!, 
            descripcion: String!,
            fecha_registro: String): Log
    }
    `);

export const root = {
    getlog: async ({ id }: { id: string }) => {
        const log = await getLog(id);
        return log;
    },

    logs: async () => {
        const logs = await getAllLogs();
        return logs
    },
    createLog: async (
        { tipo_metodo, tipo_log, descripcion, fecha_registro }: any,
        request: Request,
        response: Response
      ) => {
        const log = await createLog({
          tipo_metodo, //post, put, delete
          tipo_log, //documento, usuario, prestamo
          descripcion,
          fecha_registro: new Date()
        });
        return log;
      }
};