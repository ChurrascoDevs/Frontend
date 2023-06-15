import express, { request, response } from 'express';
import { connectDatabase, getDatabase } from './database';
import { loginController, registerController, deleteUserController } from './users/userController';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

const app = express();
const port = 3000;

app.use(express.json());

// Definir el esquema GraphQL
const schema = buildSchema(`
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
const root = {
  registerUser: async ({ name, email, password }: { name: string, email: string, password: string }) => {
    // Implementa la lógica correspondiente en userController.ts
    // Llama a la función adecuada y devuelve el resultado
    const user = await registerController(request, response);
    return user;
  },
  loginUser: async ({ email, password }: { email: string, password: string }) => {
    const user = await loginController(request, response);
    return user;
  },
  deleteUser: async ({ id }: { id: string }) => {
    const user = await deleteUserController(request, response);
    return user;
  },
};


// Conexión a la base de datos
connectDatabase()
  .then(() => {
    // Configuración de rutas y lógica adicional

    // Ruta para GraphQL
    app.use('/graphql', graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    }));

    // Register User POST
    app.post('/register', registerController);

    //Login User POST
    app.post('/login', loginController);

    //Delete User DELETE
    app.delete('/delete/user/:id', deleteUserController);

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  });
