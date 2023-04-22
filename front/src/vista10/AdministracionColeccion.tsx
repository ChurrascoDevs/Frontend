import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
//import './Devolucion.css';

function AdministracionColeccion() {
    return (
        <Container className="devo-container  gap-3" style={{ paddingTop: '40px' }}>
            <Card className='p-4'  >
            <h3 className='centerForm'> Ingresar documento </h3>
                <div className='container d-flex justify-content-center'>
                
                <Form>
                    <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col}>
                            <Form.Label>Tipo</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control style={{ width: '300px' }} placeholder="Tipo" />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col}>
                            <Form.Label>Titulo</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control style={{ width: '300px' }} placeholder="Titulo" />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col}>
                            <Form.Label>Autor</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control style={{ width: '300px' }} placeholder="Autor" />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col}>
                            <Form.Label>Editorial</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control style={{ width: '300px' }} placeholder="Editorial" />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col}>
                            <Form.Label>Edicion</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control style={{ width: '300px' }} placeholder="Edicion" />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col}>
                            <Form.Label>Año Edicion</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control style={{ width: '300px' }} placeholder="Año Edicion" />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col}>
                            <Form.Label>Estanteria</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control style={{ width: '300px' }} placeholder="Estanteria" />
                        </Form.Group>
                    </Form.Group>

                    <div className="d-flex flex-row-reverse">
                            <Button>Ingresar</Button>
                    </div>
                </Form>
                </div>
            </Card>
        </Container>
        );
}

export default AdministracionColeccion;