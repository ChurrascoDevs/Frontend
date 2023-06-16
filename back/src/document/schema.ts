import { buildSchema } from 'graphql';
import { Request, Response } from 'express';
import {
  createDocumentController,
  getDocumentController,
  updateDocumentController,
  deleteDocumentController,
  getAllDocumentsController,
  searchDocumentsController,
  getLatestDocumentsController
} from './Documents_Controller';

// Definir el esquema GraphQL
export const schema = buildSchema(`
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

  type Query {
    getdocument(id: String!): Document
    documents: [Document]
    searchDocuments(type: String!, value: String!): [Document]
    latestDocuments(count: Int!): [Document]
  }

  type Mutation {
    createDocument(tipo: String!, titulo: String!, autor: String!, editorial: String!,
      anio: Int!, edicion: Int!, categoria: String!, tipoMedio: String!): Document
    updateDocument(id: ID!, tipo: String!, titulo: String!, autor: String!, editorial: String!,
      anio: Int!, edicion: Int!, categoria: String!, tipoMedio: String!): Document
    deleteDocument(id: ID!): String
  }
`);

// Resolvers de GraphQL
export const root = {
    getdocument: async ({ id }: { id: string }) => {
        const documento = await getDocumentController(id);
        return documento;
      },
      

      documents: async () => {
        const documents = await getAllDocumentsController();
        return documents;
      },

      searchDocuments: async ({ type, value }: { type: string, value: string }, request: Request, response: Response) => {
        const documents = await searchDocumentsController({ params: { type }, body: { value } } as any, response);
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
  }
  
};
