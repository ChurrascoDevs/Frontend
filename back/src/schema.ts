import { buildSchema } from 'graphql';
import { 
  getAllLoansController, newLoanController, updateLoanController,
  getLoanByIDController, getLoansByStateController, getLoansByUserIDController,
  getLoansByDocumentIDController, deleteLoanController} from './loans/Loan_controller_gql';
import { loginController, registerController, deleteUserController, userController, usersController } from './users/userController_GQL';
import { request, response } from 'express';

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

    # Loans
    getAllLoans:[Loan]!
    getLoanByID(_id: String!):Loan
    getLoansByState(estado: String!):[Loan]!
    getLoansByUserID(idUsuario: String!):[Loan]!
    getLoansByDocumentID(idEjemplar: String!):[Loan]!
  }

  type Mutation {

    # Users
    registerUser(username: String!, password: String!, rut: String!, rol: String!,
       nombre: String!, apellido: String!, direccion: String!, email: String!, telefono: String!, activo: Boolean, fecha_registro: String!): User
    loginUser(username: String!, password: String!): String
    deleteUser(id: ID!): String

    # Loans
    newLoan(idUsuario: String!, idEjemplar: String!, tipoPrestamo: String!): String!
    updateLoan(idPrestamo:String!, tipoActualizacion: String!, fechaDevolucion: String): String!
    deleteLoan(_id: ID!): String!
  }`
);

// Resolvers de GraphQL
export const root = {
  //Query :

    // ---USERS ---
    user: async ({_id}: {_id:string}) => {
      const result = await userController(_id);
      return result;
    },
    users: async (req: any, res: any) => {
      const result = await usersController(request, response);
      return result;
    },

    // --- Loans ---
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


  //Mutations :

    // --- USERS ---
    registerUser: async ({ username, password, rol, rut, nombre, apellido, direccion, email, telefono }: 
      { username: string, password: string, rut: string, rol: string, nombre: string, apellido: string,
         direccion: string, email: string, telefono: string}) => {
      // Implementa la lógica correspondiente en userController.ts
      // Llama a la función adecuada y devuelve el resultado
      const user = await registerController(username, password, rol, rut, nombre, apellido, direccion, email, telefono); //cambiar por campos de entrada
      return user;
    },
    loginUser: async ({ email, password }: { email: string, password: string }) => {
      const user = await loginController(email, password);
      return user;
    },
    deleteUser: async ({ _id }: { _id: string }) => {
      const user = await deleteUserController(_id);
      return user;
    },

    // --- Loans ---
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
    }
};