import { buildSchema } from 'graphql';
import { Request, Response } from 'express';
import {
    getEjemplaresQL,
    getEjemplaresByDocumentoQL,
    createEjemplarQL,
    getEjemplarByIdQL,
    updateEjemplarQL,
    deleteEjemplarQL
} from './Ejemplar_Controller';

// Definir el esquema GraphQL
export const schema = buildSchema(`
type Ejemplar {
    _id: ID!
    idDocumento: ID!
    estado: String!
    ubicacion: String!
    fecha_registro: String!
  }
  
  
  type Query {
    getEjemplarById(id: ID!): Ejemplar
    getEjemplaresByDocumento(idDocumento: ID!): [Ejemplar]
    getEjemplares: [Ejemplar]
  }
  
  type Mutation {
    createEjemplar(idDocumento: ID!, estado: String!, ubicacion: String!): Ejemplar
    updateEjemplar(id: ID!, estado: String, ubicacion: String): Ejemplar
    deleteEjemplar(id: ID!): String
  }
`);

// Resolvers de GraphQL
export const root = {
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
  };