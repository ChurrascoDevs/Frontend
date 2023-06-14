import express from 'express';
import devolver from "./devolucion/devolver";
import { connectDatabase } from './database';

const app = express();
const port = 3000;
//La secret_key se usa para el tema de los token de autentificacion, puede ser cualquier adena de caracteres,
//pero hay que mantenerla segura
const SECRET_KEY = 'nBfvoJd4Qfs1bTVACHWomYcl1Vdw9ZV8';

app.use(express.json());
app.use("/devolucion", devolver);

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



