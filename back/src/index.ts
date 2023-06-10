import express from 'express';
import { connectDatabase } from './database';

const app = express();
const port = 3000;

app.use(express.json());

// Conexión a la base de datos
connectDatabase()
  .then(() => {
    // Configuración de rutas y lógica adicional
    app.get('/', (req, res) => {
      res.send('¡Hola, mundo!');
    });

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  });
