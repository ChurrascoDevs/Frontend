import { ObjectId } from 'mongodb';
interface Document {
    _id?: ObjectId;
    tipo: string;
    titulo: string;
    autor: string;
    editorial: string;
    anio: number;
    edicion: number;
    categoria: string;
    tipoMedio: string;
    fecha_registro: Date;
  }
  
  export default Document;
  