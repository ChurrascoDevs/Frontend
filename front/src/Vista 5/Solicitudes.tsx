import React, { useContext } from "react";
import { SolicitudContext} from "../Vista 1/SolicitudContext"; // importa el contexto
import LibroTabla from "./LibroTabla"; // Importa el componente LibroTabla
interface Book {
  _id: number;
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

// Componente de la aplicación principal
function Solicitudes() {
  //const contextValue = useContext(SolicitudContext);
  
  //const { solicitudes, dispatch } = contextValue || {};

  //if (!solicitudes || !dispatch) {
  //  throw new Error('useSolicitud debe usarse dentro de un SolicitudProvider');
  //}
  const solicitudes_sinparse = localStorage.getItem('solicitudes');
  const solicitudes = solicitudes_sinparse ? JSON.parse(solicitudes_sinparse) : null;

  console.log("Show");
  console.log(solicitudes);

  // Función para manejar la solicitud de envío
  const handleEnviarSolicitud = () => {
    // Lógica para enviar la solicitud
    alert("Solicitud enviada con éxito");
  };

  return (
    <div>
      {/* Renderiza el componente LibroTabla y pasa los datos de solicitudes como prop */}
      <LibroTabla libros={solicitudes} />
    </div>
  );
}

export default Solicitudes;
