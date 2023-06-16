import { ObjectId } from 'mongodb';
interface User {
    _id?: ObjectId;
    username: string;
    password: string;
    rut: string;
    rol: string;
    nombre: string;
    apellido: string;
    direccion: string;
    email: string;
    telefono: string;
    activo: boolean;
    fecha_registro: Date
  }
  
  export default User;