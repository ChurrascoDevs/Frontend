import { ObjectId } from 'mongodb';
interface Document {
    _id?: ObjectId;
    tipo: string;
    titulo: string;
    autor: string;
    editorial: string;
    anio: string;
    edicion: string;
    categoria: string;
    ubicacion: string; 
    imagen: string;
    fecha_registro: Date;
}

export default Document;
  