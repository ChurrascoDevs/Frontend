"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Documents_Controller_1 = __importDefault(require("./document/Documents_Controller"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("./database");
const devolucion_1 = __importDefault(require("./devolucion/devolucion"));
const app = (0, express_1.default)();
const port = 3000;
//La secret_key se usa para el tema de los token de autentificacion, puede ser cualquier adena de caracteres,
//pero hay que mantenerla segura
const SECRET_KEY = 'nBfvoJd4Qfs1bTVACHWomYcl1Vdw9ZV8';
app.use(express_1.default.json());
// Rutas para los documentos
app.use('/documents', Documents_Controller_1.default);
app.use('/devolucion', devolucion_1.default);
// Conexión a la base de datos
(0, database_1.connectDatabase)()
    .then(() => {
    // Configuración de rutas y lógica adicional
    app.get('/', (req, res) => {
        res.send('¡Hola, mundo!');
    });
    //Register User POST
    app.post('/register', (req, res) => {
        const db = (0, database_1.getDatabase)();
        const { username, password } = req.body;
        async function run() {
            try {
                //Lista de usuarios (Documentos) de la base de datos (DB)
                const Users = db.collection("Users");
                // Verificar si el usuario ya existe en la base de datos
                const existingUser = await Users.findOne({ username });
                if (existingUser) {
                    return res.status(409).json({ message: 'El usuario ya existe' });
                }
                // Encriptar la contraseña
                const hashedPassword = await bcrypt_1.default.hash(password, 10);
                //Crea el nuevo usuario con la contraseña hasheada
                const result = await Users.insertOne({
                    username: username,
                    password: hashedPassword,
                });
                console.log(`A document was inserted with the _id: ${result.insertedId}`);
                return res.status(200).json({ status: 'success' });
            }
            catch (e) {
                console.log(e);
                return res.status(409).json({ status: 'error', message: String(e) });
            }
        }
        //Corre la funcion Asincrona
        run().catch(console.dir);
    });
    //Login User POST
    app.post('/login', (req, res) => {
        const db = (0, database_1.getDatabase)();
        const { username, password } = req.body;
        async function run() {
            try {
                const Users = db.collection("Users");
                const user = await Users.findOne({ username });
                console.log(user);
                //Por si no se enuentra el usuario o este es nullo
                if (!user) {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }
                // Verificar la contraseña
                if (!bcrypt_1.default.compareSync(password, user.password)) {
                    return res.status(401).json({ message: 'Contraseña incorrecta' });
                }
                // Generar un token de acceso
                const token = jsonwebtoken_1.default.sign({ id: user._id }, SECRET_KEY);
                //Se envia una respuesta de que salio todo bien, junto con el token
                return res.status(200).json({ status: 'success', token: token });
            }
            catch (e) {
                console.log(e);
                return res.status(409).json({ status: 'error', message: String(e) });
            }
        }
        //Corre la funcion Asincrona
        run().catch(console.dir);
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
//# sourceMappingURL=index.js.map