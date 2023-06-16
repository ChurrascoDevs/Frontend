import { ObjectId } from 'mongodb';
;

interface Ejemplar {
  _id?: ObjectId;
  idDocumento: ObjectId;
  estado: string;
  ubicacion: string;
  fecha_registro: Date;
}


export default Ejemplar;