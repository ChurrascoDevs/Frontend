import {
  updateDocumentMiddleware,
  getLatestDocumentsControllerMid,
  createDocumentControllerMid,
  getDocumentControllerMid,
  deleteDocumentControllerMid,
  searchDocumentsControllerMid,
  getAllDocumentsControllerMid

} from './document/Documents_Controller';
import {
  getEjemplares,
  getEjemplaresByDocumento,
  createEjemplar,
  getEjemplarById,
  updateEjemplar,
  deleteEjemplar
} from './Ejemplar/Ejemplar_Controller';
import { 
  loginController, 
  registerController, 
  deleteUserController,
  getUserController 
} from './users/userController';

import express from 'express';
import { connectDatabase} from './database';
import loansRouter from './loans/Loan_controller';
import documentRouter from './document/Documents_Controller';
import { graphqlHTTP } from 'express-graphql';
import {schema, root} from './schema'

const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
}));


// Rutas para los documentos
app.use('/documents', documentRouter);
// Rutas para los documentos vía normal (no graphql)
app.use('/Loans', loansRouter);

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

    //Data User GET
    app.get('/get/user/:id', getUserController);

    // Crear Documento
    app.post('/documents', createDocumentControllerMid);

    // Obtener un Documento por su ID
    app.get('/documents/:id', getDocumentControllerMid);

    // Actualizar un Documento
    app.put('/documents/:id', updateDocumentMiddleware);

    // Eliminar un Documento
    app.delete('/documents/:id', deleteDocumentControllerMid);

    // Obtener todos los Documentos
    app.get('/documents', getAllDocumentsControllerMid);

  



    // Buscar Documentos según criterios específicos
    app.post('/documents/search/:type', searchDocumentsControllerMid);

    // Obtener los últimos X libros ingresados
    app.get('/documents/latest/:count', getLatestDocumentsControllerMid);


    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });

  // Obtener todos los Ejemplares
    app.get('/ejemplares', getEjemplares);

  // Obtener todos los Ejemplares de un Documento
    app.get('/ejemplares/:idDocumento', getEjemplaresByDocumento);

  // Crear un nuevo Ejemplar
    app.post('/ejemplares/:idDocumento', createEjemplar);

  // Obtener un Ejemplar por su ID
    app.get('/ejemplares/buscar_ejemplar/:id', getEjemplarById);

  // Actualizar un Ejemplar
    app.put('/ejemplares/:id', updateEjemplar);

// Eliminar un Ejemplar
    app.delete('/ejemplares/:id', deleteEjemplar);
    
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  });