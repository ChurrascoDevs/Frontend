import React, { useState } from "react";
import LibroTabla from "./LibroTabla"; // Importa el componente LibroTabla

// Componente de la aplicación principal
function Solicitudes() {
  // Datos de ejemplo de libros
  const [libros, setLibros] = useState([
    {
      id: 1,
      portada: "Libro1",
      autor: "Autor1",
      edicion: "1ra Edición",
      anio: 2020,
      tipo: "Ficción",
      categoria: "Novela",
      existencias: 5
    },
    {
      id: 2,
      portada: "Libro2",
      autor: "Autor2",
      edicion: "2da Edición",
      anio: 2018,
      tipo: "No Ficción",
      categoria: "Historia",
      existencias: 3
    }
  ]);

  // Función para manejar la solicitud de envío
  const handleEnviarSolicitud = () => {
    // Lógica para enviar la solicitud
    alert("Solicitud enviada con éxito");
  };

  return (
    <div>
      {/* Renderiza el componente LibroTabla y pasa los datos de libros como prop */}
      <LibroTabla libros={libros} />
    </div>
  );
}

export default Solicitudes;
