import { buildSchema } from 'graphql';
import { loginController, registerController, deleteUserController } from './users/userController';
import {
  createDocumentController,
  getDocumentController,
  updateDocumentController,
  deleteDocumentController,
  getAllDocumentsController,
  searchDocumentsController,
  getLatestDocumentsController
} from './document/Documents_Controller';
import {
  getEjemplaresQL,
  getEjemplaresByDocumentoQL,
  createEjemplarQL,
  getEjemplarByIdQL,
  updateEjemplarQL,
  deleteEjemplarQL
} from './Ejemplar/Ejemplar_Controller';
import {
  createLog,
  getLog,
  getAllLogs
} from './log/Log_Controller';
import { request, response } from 'express';

// Definir el esquema GraphQL
export const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    password: String!
    rut: String!
    rol: String!
    nombre: String!
    apellido: String!
    direccion: String!
    email: String!
    telefono: String!
    activo: Boolean
    fecha_registro: String!
  }
  type Document {
    _id: ID!
    tipo: String!
    titulo: String!
    autor: String!
    editorial: String!
    anio: Int!
    edicion: Int!
    categoria: String!
    tipoMedio: String!
    fecha_registro: String!
  }
  type Ejemplar {
    _id: ID!
    idDocumento: ID!
    estado: String!
    ubicacion: String!
    fecha_registro: String!
  }
  type Log {
    _id: ID
    tipo_metodo: String! 
    tipo_log: String! 
    descripcion: String
    fecha_registro: String!
  }

  type Query {
    user(id: ID!): User
    users: [User]
    getdocument(id: String!): Document
    documents: [Document]
    searchDocuments(type: String!, value: String!): [Document]
    latestDocuments(count: Int!): [Document]
    getEjemplarById(id: ID!): Ejemplar
    getEjemplaresByDocumento(idDocumento: ID!): [Ejemplar]
    getEjemplares: [Ejemplar]
    getlog(id: String!): Log
    logs: [Log]
  }

  type Mutation {
    registerUser(username: String!, password: String!, rut: String!, rol: String!,
       nombre: String!, apellido: String!, direccion: String!, email: String!, telefono: String!, activo: Boolean, fecha_registro: String!): User
    loginUser(username: String!, password: String!): User
    deleteUser(id: ID!): User
    createDocument(tipo: String!, titulo: String!, autor: String!, editorial: String!,
      anio: Int!, edicion: Int!, categoria: String!, tipoMedio: String!): Document
    updateDocument(id: ID!, tipo: String!, titulo: String!, autor: String!, editorial: String!,
      anio: Int!, edicion: Int!, categoria: String!, tipoMedio: String!): Document
    deleteDocument(id: ID!): String
    createEjemplar(idDocumento: ID!, estado: String!, ubicacion: String!): Ejemplar
    updateEjemplar(id: ID!, estado: String, ubicacion: String): Ejemplar
    deleteEjemplar(id: ID!): String
    createLog(tipo_metodo: String!,
      tipo_log: String!, 
      descripcion: String,
      fecha_registro: String): Log
  }`
);

// Resolvers de GraphQL
export const root = {
    registerUser: async (args: any) => {
      // Implementa la lógica correspondiente en userController.ts
      // Llama a la función adecuada y devuelve el resultado
      const user = await registerController(request, response);
      return user;
    },
    loginUser: async (args: any) => {
      const user = await loginController(request, response);
      return user;
    },
    deleteUser: async ({ id }: { id: string }) => {
      const user = await deleteUserController(request, response);
      return user;
    },
    getdocument: async ({ id }: { id: string }) => {
      const documento = await getDocumentController(id);
      return documento;
    },
    

    documents: async () => {
      const documents = await getAllDocumentsController();
      return documents;
    },

    searchDocuments: async ({ type, value }: { type: string, value: string }, request: Request, response: Response) => {
      const documents = await searchDocumentsController({ params: { type }, body: { value } } as any);
      return documents;
    },
  

    latestDocuments: async ({ count }: { count: number }, request: Request, response: Response) => {
      const documents = await getLatestDocumentsController( count);
      return documents;
    },


    createDocument: async (
      { tipo, titulo, autor, editorial, anio, edicion, categoria, tipoMedio }: any,
      request: Request,
      response: Response
    ) => {
      const document = await createDocumentController({
        tipo,
        titulo,
        autor,
        editorial,
        anio: Number(anio),
        edicion: Number(edicion),
        categoria,
        tipoMedio,
        fecha_registro: new Date()
      });
      return document;
    },



    updateDocument: async (
      { id, tipo, titulo, autor, editorial, anio, edicion, categoria, tipoMedio }: any
    ) => {
      try {
        const document = await updateDocumentController(id, {
          tipo,
          titulo,
          autor,
          editorial,
          anio: Number(anio),
          edicion: Number(edicion),
          categoria,
          tipoMedio
        });
        return document;
      } catch (error) {
        console.error('Error updating Document:', error);
        throw new Error('An error occurred while updating the Document');
      }
    },
    

    deleteDocument: async ({ id }: { id: string }) => {
      try {
        const document = await deleteDocumentController(id);
        return document; // Indica que la eliminación fue exitosa
      } catch (error) {
        console.error('Error deleting Document:', error);
        return false; // Indica que ocurrió un error durante la eliminación
      }
    },
    getEjemplares: async () => {
      const ejemplares = await getEjemplaresQL();
      return ejemplares;
    },
  
    getEjemplaresByDocumento: async ({ idDocumento }: { idDocumento: string }) => {
      const ejemplares = await getEjemplaresByDocumentoQL(idDocumento);
      return ejemplares;
    },
  
    createEjemplar: async ({ idDocumento, estado, ubicacion }: any) => {
      const ejemplar = await createEjemplarQL({
        idDocumento,
        estado,
        ubicacion,
        fecha_registro: new Date(),
      });
      return ejemplar;
    },
  
    getEjemplarById: async ({ id }: { id: string }) => {
      const ejemplar = await getEjemplarByIdQL(id);
      console.log("fecha:",ejemplar);
      return ejemplar;
    },
  
    updateEjemplar : async ({ id, estado, ubicacion }: any) => {
        try {
          const ejemplar = await updateEjemplarQL(id, {
            estado,
            ubicacion,
            fecha_registro: new Date(),
          });
          return ejemplar;
        } catch (error) {
          console.error('Error updating Ejemplar:', error);
          throw new Error('An error occurred while updating the Ejemplar');
        }
      },
  
    deleteEjemplar: async ({ id }: { id: string }) => {
      try {
        const result = await deleteEjemplarQL(id);
        return result; // Indica que la eliminación fue exitosa
      } catch (error) {
        console.error('Error deleting Ejemplar:', error);
        return false; // Indica que ocurrió un error durante la eliminación
      }
    },
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