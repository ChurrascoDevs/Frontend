import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
//import './Devolucion.css';

const form_control = {
    //width: '300px'  , 
    backgroundColor: '#e9ecef' 
}


function AdministracionColeccion() {
    return (
        <Container className="devo-container  gap-3" style={{ paddingTop: '40px' }}>
            <Card className='p-4'  >
            <h3 className='centerForm'> Ingresar documento </h3>
                <Col>
                
                <Form>
                    <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col} xs={3}>
                            <Form.Label>Tipo</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control style={form_control} placeholder="Tipo" />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col} xs={3}>
                            <Form.Label>Titulo</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control style={form_control} placeholder="Titulo" />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col} xs={3}>
                            <Form.Label>Autor</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control style={form_control} placeholder="Autor" />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col} xs={3}>
                            <Form.Label>Editorial</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control style={form_control} placeholder="Editorial" />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col} xs={3}>
                            <Form.Label>Edición</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control style={form_control} placeholder="Edición" />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col} xs={3}>
                            <Form.Label>Año Edición</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control style={form_control} placeholder="Año Edición" />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group bsPrefix="mb-3" as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col} xs={3}>
                            <Form.Label>Estanteria</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control style={form_control} placeholder="Estanteria" />
                        </Form.Group>
                    </Form.Group>

                    <div className="d-flex flex-row-reverse">
                            <Button>Ingresar</Button>
                    </div>
                </Form>
                </Col>
            </Card>
        </Container>
        );
}

export default AdministracionColeccion;