import express from 'express';
import { connectDatabase } from './database';
import { graphqlHTTP } from "express-graphql" 
import { schema, root } from './log/schema';

const app = express();
const port = 3000;
//La secret_key se usa para el tema de los token de autentificacion, puede ser cualquier adena de caracteres,
//pero hay que mantenerla segura
const SECRET_KEY = 'nBfvoJd4Qfs1bTVACHWomYcl1Vdw9ZV8';

app.use(express.json());

// Conexión a la base de datos
connectDatabase()
  .then(() => {
    // Configuración de rutas y lógica adicional
    app.get('/', (req, res) => {
      res.send('¡Hola, mundo!');
    });

    app.use('/graphql', graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    }));
    
    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });

    

  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  });