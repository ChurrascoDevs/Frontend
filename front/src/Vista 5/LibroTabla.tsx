import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "./Vista_5.css";
import axios from "axios";

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
  existencias?: number;
  ejemplar?: any;
}

type LibroTablaProps = {
  libros: Book[];
};

function LibroTabla({ libros }: LibroTablaProps) {
  const [selectedLibros, setSelectedLibros] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleCheck = (book: Book) => {
    if (selectedLibros.includes(book)) {
      setSelectedLibros(selectedLibros.filter((b) => b !== book));
    } else {
      setSelectedLibros([...selectedLibros, book]);
    }
  };

  const getEjemplar = async (book: Book) => {
    try {
      const response = await axios.get(`http://localhost:3001/ejemplares/${book._id}`);
      return response.data.find((ejemplar: any) => ejemplar.estado !== "tomado"); // Devuelve el primer ejemplar que no está "tomado"
    } catch (error) {
      console.error("Error al obtener el ejemplar:", error);
      return null;
    }
  };
  

  const getExistencias = async (book: Book) => {
    try {
      const response = await axios.get(`http://localhost:3001/ejemplares/${book._id}`);
      return response.data.filter((ejemplar: any) => ejemplar.estado !== "tomado").length; // Cuenta solo los ejemplares que no están "tomados"
    } catch (error) {
      console.error("Error al obtener las existencias:", error);
      return 0;
    }
  };
  

  useEffect(() => {
    libros.forEach(async (book) => {
      const ejemplar = await getEjemplar(book);
      const existencias = await getExistencias(book);
      book.ejemplar = ejemplar; // Guarda el ejemplar en el libro
      book.existencias = existencias; // Guarda las existencias en el libro
    });
  }, []);

  const enviarSolicitudes = async () => {
    const IdUsuario = localStorage.getItem('id');
    const solicitudes = selectedLibros.map(book => ({
      idUsuario: IdUsuario,
      idEjemplar: book.ejemplar._id, // Asume que cada ejemplar tiene un _id único
      tipoPrestamo: "Domicilio"
    }));
  
    for (const solicitud of solicitudes) {
      try {
        await axios.post('http://localhost:3001/Loans/new', solicitud);
        //await axios.put(`http://localhost:3001/ejemplares/${solicitud.IdEjemplar}`, { estado: "tomado" }); // Cambia el estado del ejemplar a "tomado"
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
      }
    }
  
    // Muestra el modal después de enviar todas las solicitudes
    setShowModal(true);
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <br></br>
      <Row className="justify-content-center">
        <Col sm={6} md={12}>
          <div>
          <Table className="mx-auto w-100 tabla-con-fondo" striped bordered hover>

              <thead>
                <tr style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <th>Portada</th>
                  <th>Autor</th>
                  <th>Edición</th>
                  <th>Año</th>
                  <th>Tipo</th>
                  <th>Categoría</th>
                  <th>Existencias</th>
                  <th>Seleccionar</th>
                </tr>
              </thead>
              <tbody>
                {libros?.map((book) => (
                  <tr style={{ textAlign: "center", verticalAlign: "middle" }} key={book._id}>
                    <td><img src={book.imagen} alt={book.titulo} height="50px" width="50px" /></td>
                    <td>{book.autor}</td>
                    <td>{book.edicion}</td>
                    <td>{book.anio}</td>
                    <td>{book.tipo}</td>
                    <td>{book.categoria}</td>
                    <td>{book.existencias}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedLibros.includes(book)}
                        onChange={() => handleCheck(book)}
                        className="mi-checkbox"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="botones-container">
              <div className="d-flex justify-content-end">
                <NavLink to="/catalogo" >
                  <Button variant="secondary">Cancelar</Button>
                </NavLink>
        
                <Button className="button_Solicitar" onClick={enviarSolicitudes}>
                  Enviar Solicitud
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Solicitud enviada con éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tu solicitud ha sido enviada exitosamente. Seleccionaste {selectedLibros.length} libro(s).
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default LibroTabla;
