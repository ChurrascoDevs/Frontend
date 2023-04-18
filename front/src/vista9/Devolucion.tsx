import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
//import './Devolucion.css';
import bookImage from './libro.jpg';

function Devolucion() {
  const [codigo, setCodigo] = useState('');
  const [libro, setLibro] = useState({
    titulo: 'El Gran Gatsby',
    autor: 'F. Scott Fitzgerald',
    fechaPrestamo: '01/04/2023',
    fechaLimite: '08/04/2023',
    fechaActual: '18/04/2023',
    estado: '2 días de retraso'
  });
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // Aquí iría la lógica para buscar el libro en la base de datos
    // utilizando el código ingresado y guardar la información en el estado "libro"
    

    setLibro({
      titulo: 'El Gran Gatsby',
      autor: 'F. Scott Fitzgerald',
      fechaPrestamo: '01/04/2023',
      fechaLimite: '08/04/2023',
      fechaActual: '18/04/2023',
      estado: '2 días de retraso'
    });
  };

  const handleDevolucion = (libro: { titulo: any; } ) => {
    // Aquí iría la lógica para procesar la devolución del libro
    // utilizando la información guardada en el estado "libro"
    console.log('Libro devuelto:', libro.titulo);
    setCodigo('');
    //setLibro({});
  };

  return (
    <Container className="devo-container">
        
      <Row>
        <Col>
        <Card className='p-4' >
            <div className='container d-flex justify-content-center'>
                <Form >
                    <Form.Group as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Codigo documento</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Control placeholder="Codigo" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formButton">
                            <Button>Ingresar</Button>
                        </Form.Group>
                    </Form.Group>
                </Form>
            </div>
          </Card>
        </Col>
      </Row>
      {libro && (
        <Card className='p-4'>
            <Row>
                <Col>
                    <h3 className='centerForm'> Información del libro</h3>
                </Col>
            </Row>
        <Row className="mt-4">
            
            <Col>
                <img src={bookImage} width={250} height={250} alt="Libro" className="libro-imagen" />
            </Col>
            <Col>
            <div className="libro-info">
                <div className="libro-detalle">
                    <p><strong>Título:</strong> {'El Gran Gatsby' }</p>
                    <p><strong>Autor:</strong> {'F. Scott Fitzgerald'}</p>
                    <p><strong>Fecha de préstamo:</strong> {'01/04/2023' }</p>
                    <p><strong>Fecha límite:</strong> {'08/04/2023' }</p>
                    <p><strong>Fecha actual:</strong> {'18/04/2023' }</p>
                    <p><strong>Estado:</strong> {'2 días de retraso'}</p>
                </div>
                </div>
            </Col>
        </Row>
        <Button variant="danger" className="mt-4" onClick={ () => handleDevolucion }>Devolver</Button>
        </Card>
      )}
    </Container>
  );
}

export default Devolucion;