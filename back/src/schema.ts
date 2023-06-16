import { buildSchema } from 'graphql';
import { loginController, registerController, deleteUserController, userController, usersController } from './users/userController_GQL';
import { request, response } from 'express';

// Definir el esquema GraphQL
export const schema = buildSchema(`
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

  type Query {
    user(_id: ID!): User
    users: [User]
  }

  type Mutation {
    registerUser(username: String!, password: String!, rut: String!, rol: String!,
       nombre: String!, apellido: String!, direccion: String!, email: String!, telefono: String!, activo: Boolean, fecha_registro: String!): User
    loginUser(username: String!, password: String!): String
    deleteUser(id: ID!): String
  }`
);

// Resolvers de GraphQL
export const root = {

    //query
    user: async ({_id}: {_id:string}) => {
      const result = await userController(_id);
      return result;
    },
    users: async (req: any, res: any) => {
      const result = await usersController(request, response);
      return result;
    },

    // mutations
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
  };