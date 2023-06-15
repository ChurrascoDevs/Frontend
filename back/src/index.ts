import express, { Request, Response } from 'express';
import documentRouter from './document/Documents_Controller';
import loansRouter from './Loans/Loan_controller';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDatabase, getDatabase } from './database';

const app = express();
const port = 3000;
//La secret_key se usa para el tema de los token de autentificacion, puede ser cualquier adena de caracteres,
//pero hay que mantenerla segura
const SECRET_KEY = 'nBfvoJd4Qfs1bTVACHWomYcl1Vdw9ZV8';

app.use(express.json());

// Rutas para los documentos
app.use('/documents', documentRouter);

// Rutas para los prestamos
app.use('/Loans', loansRouter);

// Conexión a la base de datos
connectDatabase()
  .then(() => {

    // Configuración de rutas y lógica adicional
    app.get('/', (req, res) => {
      res.send('¡Hola, mundo!');
    });

    //Register User POST
    app.post('/register', (req, res) => {
      const db = getDatabase();

      const { username, password } = req.body;
      
      interface User {
        username: string;
        password: string;
      }

      async function run() {
        try {
          //Lista de usuarios (Documentos) de la base de datos (DB)
          const Users = db.collection<User>("Users");

          // Verificar si el usuario ya existe en la base de datos
          const existingUser = await Users.findOne({ username });
          if (existingUser) {
            return res.status(409).json({ message: 'El usuario ya existe' });
          }
          // Encriptar la contraseña
          const hashedPassword = await bcrypt.hash(password, 10);

          //Crea el nuevo usuario con la contraseña hasheada
          const result = await Users.insertOne({
            username: username,
            password: hashedPassword,
          });
          console.log(`A document was inserted with the _id: ${result.insertedId}`);
          return res.status(200).json({ status: 'success'})
        } catch (e: any){
          console.log(e);
          return res.status(409).json({ status: 'error', message: String(e) })
        }
      }
      //Corre la funcion Asincrona
      run().catch(console.dir);
    });

    //Login User POST
    app.post('/login', (req, res) => {
      const db = getDatabase();

      const { username, password } = req.body;
  
      interface User {
        username: string;
        password: string;
      }

      async function run() {
        try {
          const Users = db.collection<User>("Users");
          const user = await Users.findOne({username});
          console.log(user);

          //Por si no se enuentra el usuario o este es nullo
          if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }

          // Verificar la contraseña
          if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
          }

          // Generar un token de acceso
          const token = jwt.sign({ id: user._id }, SECRET_KEY);

          //Se envia una respuesta de que salio todo bien, junto con el token
          return res.status(200).json({ status: 'success', token: token})

        } catch (e: any){
          console.log(e);
          return res.status(409).json({ status: 'error', message: String(e) })
        }
      }
      //Corre la funcion Asincrona
      run().catch(console.dir);
    })


    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  });
