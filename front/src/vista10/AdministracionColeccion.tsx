import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';

const form_control = {
  backgroundColor: '#e9ecef' 
};

const tipos = ['Científico', 'Histórico', 'Novela', 'Ensayo', 'Ficción'];
const categorias = ['Literatura Española', 'Literatura Chilena', 'Ciencia', 'Historia', 'Arte', 'Geografía', 'Filosofía'];
function AdministracionColeccion() {
  const [documento, setDocumento] = useState({
    tipo: tipos[0],
    titulo: '',
    autor: '',
    editorial: '',
    edicion: '',
    anio: '',
    categoria: categorias[0],
    ubicacion: '',
    imagen: ''
  });
  const [existencias, setExistencias] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumento({ ...documento, [e.target.name]: e.target.value });
  };
  const handleExistenciasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setExistencias(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(documento);
  
    fetch('http://localhost:3001/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(documento),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setShowContent(true);
        setShowModal(true);
  
        // Después de que se haya creado el documento, crear ejemplares
        const ejemplar = {
          idDocumento: data._id, 
          estado: "disponible",
          ubicacion: documento.ubicacion
        };
  
        for (let i = 0; i < existencias; i++) {
          fetch(`http://localhost:3001/ejemplares/${data._id}`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ejemplar)
          })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => console.error('Error:', error));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleCloseModal = () => {
    setShowContent(false);
    setShowModal(false);
    setDocumento({
      tipo: tipos[0],
      titulo: '',
      autor: '',
      editorial: '',
      edicion: '',
      anio: '',
      categoria: categorias[0],
      ubicacion: '',
      imagen: ''
    });
  };
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Si el usuario no es un administrador, muestra un mensaje.
  if (!isAdmin) {
    return (
      <Container className="devo-container gap-3" style={{ paddingTop: '40px' }}>
        <Card className='p-4'>
          <h3 className='centerForm'>No eres administrador y no puedes ingresar documentos.</h3>
        </Card>
      </Container>
    );
  }
  return (
    <Container className="devo-container gap-3" style={{ paddingTop: '40px' }}>
      <Card className='p-4'>
        <h3 className='centerForm'>Ingresar documento</h3>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
              <Form.Group as={Col} xs={3}>
                <Form.Label>Tipo</Form.Label>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control as="select" style={form_control} name="tipo" value={documento.tipo} onChange={handleChange}>
                  {tipos.map((tipo, index) => (
                    <option key={index} value={tipo}>{tipo}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Group>

            <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
              <Form.Group as={Col} xs={3}>
                <Form.Label>Título</Form.Label>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control style={form_control} name="titulo" placeholder="Título" value={documento.titulo} onChange={handleChange} />
              </Form.Group>
            </Form.Group>

            <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
              <Form.Group as={Col} xs={3}>
                <Form.Label>Autor</Form.Label>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control style={form_control} name="autor" placeholder="Autor" value={documento.autor} onChange={handleChange} />
              </Form.Group>
            </Form.Group>

            <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
              <Form.Group as={Col} xs={3}>
                <Form.Label>Editorial</Form.Label>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control style={form_control} name="editorial" placeholder="Editorial" value={documento.editorial} onChange={handleChange} />
              </Form.Group>
            </Form.Group>

            <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
              <Form.Group as={Col} xs={3}>
                <Form.Label>Edición</Form.Label>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control style={form_control} name="edicion" placeholder="Edición" value={documento.edicion} onChange={handleChange} />
              </Form.Group>
            </Form.Group>

            <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
              <Form.Group as={Col} xs={3}>
                <Form.Label>Año Edición</Form.Label>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control style={form_control} name="anio" placeholder="Año Edición" value={documento.anio} onChange={handleChange} />
              </Form.Group>
            </Form.Group>

            <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
              <Form.Group as={Col} xs={3}>
                <Form.Label>Categoría</Form.Label>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control as="select" style={form_control} name="categoria" value={documento.categoria} onChange={handleChange}>
                  {categorias.map((categoria, index) => (
                    <option key={index} value={categoria}>{categoria}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Group>

            <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
              <Form.Group as={Col} xs={3}>
                <Form.Label>Ubicación en la Estantería</Form.Label>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control style={form_control} name="ubicacion" placeholder="Ubicación" value={documento.ubicacion} onChange={handleChange} />
              </Form.Group>
            </Form.Group>

            <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
              <Form.Group as={Col} xs={3}>
                <Form.Label>Imagen del Libro</Form.Label>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control style={form_control} name="imagen" placeholder="URL de la imagen" value={documento.imagen} onChange={handleChange} />
              </Form.Group>
            </Form.Group>

            <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
            <Form.Group as={Col} xs={3}>
              <Form.Label>Existencias</Form.Label>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control 
                style={form_control} 
                name="existencias" 
                type="number" 
                placeholder="Existencias" 
                value={existencias} 
                onChange={handleExistenciasChange} // Usa el nuevo manejador de cambios
              />
            </Form.Group>
          </Form.Group>

            <div className="d-flex flex-row-reverse">
              <Button className="my-custom-button" type="submit">Ingresar</Button>
            </div>
          </Form>
        </Col>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        {showContent && (
          <>
            <Modal.Header closeButton className="modal-content">
              <Modal.Title>{documento.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col xs={4}>
                    <img src={documento.imagen} alt={documento.titulo} className="img-fluid" />
                  </Col>
                  <Col xs={8}>
                    <strong>Autor:</strong> {documento.autor}
                    <br />
                    <strong>Año:</strong> {documento.anio}
                    <br />
                    <strong>Categoría:</strong> {documento.categoria}
                    <br />
                    <strong>Tipo:</strong> {documento.tipo}
                    <br />
                    <strong>Edición:</strong> {documento.edicion}
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Volver</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
}

export default AdministracionColeccion;
