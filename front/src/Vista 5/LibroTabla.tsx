import React, { useState } from "react";
import { Table, Button, Modal, Container, Row, Col } from "react-bootstrap";
import './App.css'

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
    <Container>
      <Row>
        {/* Asignar 2 columnas vacías en el inicio */}
        <Col sm={1} md={2}></Col>
        {/* Asignar 10 columnas a la tabla */}
        <Col sm={10} md={10}>
          <table>
          <div>
      <Table className="tabla-con-fondo" striped bordered hover>
        <thead>
          <tr>
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
            <tr key={libro.autor}>
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
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleEnviarSolicitud}
          className="ml-2"
        >
          Enviar Solicitud
        </Button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
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
          </table>
        </Col>
        {/* Asignar 1 columna vacía al final */}
        <Col sm={1} md={2}></Col>
      </Row>
    </Container>
    
  );
}

export default LibroTabla;
