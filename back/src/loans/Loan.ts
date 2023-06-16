//import { IntegerType, ObjectId } from 'mongodb'; //unused
import mongoose, { Schema, Document } from 'mongoose';

// Def Schema, (proto para crear objeto y enviarlo)
const loanSchema: Schema = new Schema({
  idUsuario: { type: String, required: true },
  idEjemplar: { type: String, required: true },

  tipoPrestamo: { type: String, required: true },
  estado: {type: String, default: "Solicitado"}, // Rechazado o secuencial Solicitado -> Prestado -> Devuelto

  fechaSolicitud: { type: Date, default: Date.now()}, // revisar, fecha almacenada en diferente zona horaria
  fechaPrestamo: { type: Date },
  fechaDevolucion: { type: Date },
  fechaDevolucionReal: { type: Date },
});

// Base para tipo
export interface Loan extends Document {
    //_id: ObjectId; already in Document class
    idUsuario: string;
    idEjemplar: string;
  
    tipoPrestamo: string;
    estado: string;
  
    fechaSolicitud: Date;
    fechaPrestamo: Date;
    fechaDevolucion: Date;
    fechaDevolucionReal: Date;
}

const LoanModel = mongoose.model<Loan>('Loan', loanSchema);
export default LoanModel