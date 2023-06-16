import { buildSchema } from 'graphql';
import { 
  getAllLoansController, newLoanController, updateLoanController,
  getLoanByIDController, getLoansByStateController, getLoansByUserIDController,
  getLoansByDocumentIDController, deleteLoanController} from './loans/Loan_controller_gql';
import { request, response } from 'express';

// Definir el esquema GraphQL
export const schema = buildSchema(`#graphql

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

    # Loans
    getAllLoans:[Loan]!
    getLoanByID(_id: String!):Loan
    getLoansByState(estado: String!):[Loan]!
    getLoansByUserID(idUsuario: String!):[Loan]!
    getLoansByDocumentID(idEjemplar: String!):[Loan]!
  }

  type Mutation {

    # Loans
    newLoan(idUsuario: String!, idEjemplar: String!, tipoPrestamo: String!): String!
    updateLoan(idPrestamo:String!, tipoActualizacion: String!, fechaDevolucion: String): String!
    deleteLoan(_id: ID!): String!
  }`
);

// Resolvers de GraphQL
export const root = {
  //Query :

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