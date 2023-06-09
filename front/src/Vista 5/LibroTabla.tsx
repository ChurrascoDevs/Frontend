import React, { useState } from "react";
import { Table, Button, Modal, Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom"; 

import './Vista_5.css'

type Libro = {
  portada: string;
  autor: string;
  edicion: string;
  anio: number;
  tipo: string;
  categoria: string;
  existencias: number;
};

type LibroTablaProps = {
  libros: Libro[];
};

function LibroTabla({ libros }: LibroTablaProps) {
  const [selectedLibros, setSelectedLibros] = useState<Libro[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleCheck = (libro: Libro) => {
    if (selectedLibros.includes(libro)) {
      setSelectedLibros(selectedLibros.filter((l) => l !== libro));
    } else {
      setSelectedLibros([...selectedLibros, libro]);
    }
  };

  const handleEnviarSolicitud = () => {
    // Lógica para enviar la solicitud con los libros seleccionados
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container >
      <br></br>
      <Row>
        {/* Asignar 2 columnas vacías en el inicio */}

        {/* Asignar 10 columnas a la tabla */}
        <Col sm={6} md={12}>
          
          <div>
      <Table className="mx-auto tabla-con-fondo" striped bordered hover>
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
          {libros?.map((libro) => (
            <tr style={{ textAlign: "center", verticalAlign: "middle" }} key={libro.autor}>
              <td>{libro.portada}</td>
              <td>{libro.autor}</td>
              <td>{libro.edicion}</td>
              <td>{libro.anio}</td>
              <td>{libro.tipo}</td>
              <td>{libro.categoria}</td>
              <td>{libro.existencias}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedLibros.includes(libro)}
                  onChange={() => handleCheck(libro)}
                  className="mi-checkbox"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="botones-container">
      <div className=" d-flex justify-content-end">
      <NavLink to="/catalogo" >
      <Button variant="secondary" >Cancelar</Button>
    </NavLink>
        
        <Button
          className="button_Solicitar"
          onClick={handleEnviarSolicitud}
        >
          Enviar Solicitud
        </Button>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Solicitud enviada con éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tu solicitud ha sido enviada exitosamente. Seleccionaste{" "}
          {selectedLibros.length} libro(s).
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
         
        </Col>
        {/* Asignar 1 columna vacía al final */}
      </Row>
    </Container>
    
  );
}

export default LibroTabla;
