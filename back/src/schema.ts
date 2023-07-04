import { buildSchema } from 'graphql';
import { 
  loginController, 
  registerController, 
  deleteUserController, 
  userController, 
  usersController 
} from './users/userController_gql';
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
  getAllLoansController, newLoanController, updateLoanController,
  getLoanByIDController, getLoansByStateController, getLoansByUserIDController,
  getLoansByDocumentIDController, deleteLoanController} from './loans/Loan_controller_gql';
import {
  createLog,
  getLog,
  getAllLogs
} from './log/Log_Controller';
import { request, response } from 'express';
import { ObjectId } from 'mongodb';
import { getDatabase } from './database';

// Definir el esquema GraphQL
export const schema = buildSchema(`#graphql

type User {
    _id: ID!
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
    anio: String!
    edicion: Int!
    categoria: String!
    Ubicacion: String!
    imagen: String!
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

  type Loan {
    _id: ID!
    idUsuario: String!
    idEjemplar: String!

    tipoPrestamo: String! #domicilio - sala
    estado: String! #Rechazados - Prestados - Devueltos - Solicitados

    fechaSolicitud: String
    fechaPrestamo: String
    fechaDevolucion: String
    fechaDevolucionReal: String
  }

  type Query {

    #Users
    user(_id: ID!): User
    users: [User]

    #Documents y Ejemplares
    getdocument(id: String!): Document
    documents: [Document]
    searchDocuments(type: String!, value: String!): [Document]
    latestDocuments(count: Int!): [Document]
    getEjemplarById(id: ID!): Ejemplar
    getEjemplaresByDocumento(idDocumento: ID!): [Ejemplar]
    getEjemplares: [Ejemplar]
    devolver(idEjemplar: String!): Boolean

    # Loans
    getAllLoans:[Loan]!
    getLoanByID(_id: String!):Loan
    getLoansByState(estado: String!):[Loan]!
    getLoansByUserID(idUsuario: String!):[Loan]!
    getLoansByDocumentID(idEjemplar: String!):[Loan]!

    # Logs
    getlog(id: String!): Log
    logs: [Log]

  }

  type Mutation {

    # Users
    registerUser(username: String!, password: String!, rut: String!, rol: String!,
       nombre: String!, apellido: String!, direccion: String!, email: String!, telefono: String!, activo: Boolean, fecha_registro: String!): User
    #loginUser(username: String!, password: String!): User
    #deleteUser(id: ID!): User
    loginUser(username: String!, password: String!): String
    deleteUser(_id: ID!): String

    # Documents y Ejemplares
    createDocument(tipo: String!, titulo: String!, autor: String!, editorial: String!,
      anio: Int!, edicion: Int!, categoria: String!, ubicacion: String!,imagen: String!): Document
    updateDocument(id: ID!, tipo: String!, titulo: String!, autor: String!, editorial: String!,
      anio: Int!, edicion: Int!, categoria: String!, ubicacion: String!,imagen: String!): Document
    deleteDocument(id: ID!): String
    createEjemplar(idDocumento: ID!, estado: String!, ubicacion: String!): Ejemplar
    updateEjemplar(id: ID!, estado: String, ubicacion: String): Ejemplar
    deleteEjemplar(id: ID!): String

    # Loans
    newLoan(idUsuario: String!, idEjemplar: String!, tipoPrestamo: String!): String!
    updateLoan(idPrestamo:String!, tipoActualizacion: String!, fechaDevolucion: String): String!
    deleteLoan(_id: ID!): String!
    
    # Logs
    createLog(tipo_metodo: String!,
      tipo_log: String!, 
      descripcion: String,
      fecha_registro: String): Log
  }`
);

// Resolvers de GraphQL
export const root = {
  //Query :

    // --- QUERY USERS ---
    user: async ({_id}: {_id:string}) => {
      const result = await userController(_id);
      return result;
    },
    users: async(req: any, res: any) =>{
      const result = await usersController(request, response);
      return result;
    },

    // --- QUERY LOANS ---
    getAllLoans: async (req: any, res: any) => {
      const result = await getAllLoansController(request, response);
      return result;
    },
    getLoanByID: async ({ _id }: { _id: string }) => {
      const response = await getLoanByIDController(_id);
      return response;
    },
    getLoansByState: async ({ estado }: { estado: string }) => {
      const result = await getLoansByStateController(estado);
      return result;
    },
    getLoansByUserID: async ({ idUsuario }: { idUsuario: string }) => {
      const result = await getLoansByUserIDController(idUsuario);
      return result;
    },
    getLoansByDocumentID: async ({ idEjemplar }: { idEjemplar: string }) => {
      const result = await getLoansByDocumentIDController(idEjemplar);
      return result;
    },

    // --- QUERY DOCUMENTS ---
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

    // --- QUERY EJEMPLARES ---
    getEjemplares: async () => {
      const ejemplares = await getEjemplaresQL();
      return ejemplares;
    },
    getEjemplaresByDocumento: async ({ idDocumento }: { idDocumento: string }) => {
      const ejemplares = await getEjemplaresByDocumentoQL(idDocumento);
      return ejemplares;
    },
    getEjemplarById: async ({ id }: { id: string }) => {
      const ejemplar = await getEjemplarByIdQL(id);
      console.log("fecha:",ejemplar);
      return ejemplar;
    },

    // --- QUERY LOGS ---
    getlog: async ({ id }: { id: string }) => {
      const log = await getLog(id);
      return log;
    },
    logs: async () => {
        const logs = await getAllLogs();
        return logs
    },


  //Mutations :

    // --- MUTATIONS USERS ---
    // registerUser: async (args: any) => { // delete in merge?
    registerUser: async ({ username, password, rol, rut, nombre, apellido, direccion, email, telefono }: 
      { username: string, password: string, rut: string, rol: string, nombre: string, apellido: string,
         direccion: string, email: string, telefono: string}) => {
      // Implementa la lógica correspondiente en userController.ts
      // Llama a la función adecuada y devuelve el resultado
      const user = await registerController(username, password, rol, rut, nombre, apellido, direccion, email, telefono); //cambiar por campos de entrada
      return user;
    },
    /*loginUser: async (args: any) => { //delete in merge ?
      const user = await loginController(request, response);*/
    loginUser: async ({ email, password }: { email: string, password: string }) => {
      const user = await loginController(email, password);
      return user;
    },
    deleteUser: async ({ _id }: { _id: string }) => {
      const user = await deleteUserController(_id);
      return user;
    },

    // --- MUTATIONS DOCUMENTS ---
    createDocument: async (
      { tipo, titulo, autor, editorial, anio, edicion, categoria, ubicacion,imagen }: any,
      request: Request,
      response: Response
    ) => {
      const document = await createDocumentController({
        tipo,
        titulo,
        autor,
        editorial,
        anio,
        edicion,
        categoria,
        ubicacion,
        fecha_registro: new Date(),
        imagen
      });
      return document;
    },
    updateDocument: async (
      { id, tipo, titulo, autor, editorial, anio, edicion, categoria, ubicacion,imagen }: any
    ) => {
      try {
        const document = await updateDocumentController(id, {
          tipo,
          titulo,
          autor,
          editorial,
          anio,
          edicion,
          categoria,
          ubicacion,
          imagen
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

    // --- MUTATION EJEMPLARES ---
    createEjemplar: async ({ idDocumento, estado, ubicacion }: any) => {
      const ejemplar = await createEjemplarQL({
        idDocumento,
        estado,
        ubicacion,
        fecha_registro: new Date(),
      });
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
    devolver: async (args: any) => {
      const idEjemplar = args.idEjemplar;
      let db = getDatabase();
      const collection = db.collection("Loans");
      let result = await collection.updateOne({_id: new ObjectId(idEjemplar) }, { $set: {fechaDevolucion: new Date()} });
      if( result.modifiedCount >= 1 ){
        return true;
      }
      return false;
    },

    // --- MUTAION LOANS ---
    newLoan: async ({  idUsuario, idEjemplar, tipoPrestamo }: {  idUsuario: string, idEjemplar: string, tipoPrestamo: string }) => {
      const result = await newLoanController(idUsuario, idEjemplar, tipoPrestamo);
      return result;
    },
    updateLoan: async ({ idPrestamo, tipoActualizacion, fechaDevolucion }: { idPrestamo:string, tipoActualizacion: string, fechaDevolucion: string }) => {
      //tipoActualizacion: rechazar, aceptar, cerrar
      //fechaDevolucion opcional, solo cuando aceptar
      const result = await updateLoanController(idPrestamo, tipoActualizacion, fechaDevolucion);
      return result;
    },
    deleteLoan: async ({ _id }: { _id:string }) => {
      const result = await deleteLoanController(_id);
      return result;
    },

    // --- MUTATION LOGS ---
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
