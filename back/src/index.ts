import express from 'express';
import { connectDatabase, getDatabase } from './database';
import { loginController, registerController, deleteUserController } from './users/userController';

const app = express();
const port = 3000;

app.use(express.json());

// Conexión a la base de datos
connectDatabase()
  .then(() => {
    // Configuración de rutas y lógica adicional

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
