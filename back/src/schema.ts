import { buildSchema } from 'graphql';
import { loginController, registerController, deleteUserController } from './users/userController';
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

  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    registerUser(username: String!, password: String!, rut: String!, rol: String!,
       nombre: String!, apellido: String!, direccion: String!, email: String!, telefono: String!, activo: Boolean, fecha_registro: String!): User
    loginUser(username: String!, password: String!): User
    deleteUser(id: ID!): User
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
  };