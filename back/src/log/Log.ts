import { ObjectId } from 'mongodb';
interface Log {
    _id?: ObjectId;
    tipo_metodo: string; //post, put, delete
    tipo_log: string; //documento, usuario, prestamo
    descripcion: string | null;
    fecha_registro: Date
  }
  
  export default Log;