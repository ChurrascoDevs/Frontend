import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./registro.css"

const Registro = () => {
  return (
    <Container fluid>
      <Row className="justify-content-start">
        <Col md={4} className="admin-info">
          <h2 className="text-center mb-4">Información del administrador</h2>
          <img
            src="https://via.placeholder.com/150"
            alt="Foto del administrador"
            className="admin-photo d-block mx-auto mb-4"
          />
          <Form className="admin-info-box">
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" defaultValue="Juan" disabled />
            </Form.Group>
            <Form.Group controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" defaultValue="Pérez" disabled />
            </Form.Group>
            <Form.Group controlId="formRut">
              <Form.Label>Rut</Form.Label>
              <Form.Control type="text" defaultValue="********-*" disabled />
            </Form.Group>
            <Form.Group controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" defaultValue="*********" disabled />
            </Form.Group>
            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" defaultValue="AV. Libertador" disabled />
            </Form.Group>
          </Form>
        </Col>
        <Col md={8} className="user-registro">
          <h2 className="text-center mb-4">Registro de usuario</h2>
          <Form className="form-registro mb-4" >
            <Form.Group controlId="formNombres">
              <Form.Label>Nombres</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tus nombres" />
            </Form.Group>
            <Form.Group controlId="formApellidos">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tus apellidos" />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingresa tu contraseña" />
            </Form.Group>
            <Form.Group controlId="formRut">
              <Form.Label>Rut</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu Rut" />
            </Form.Group>
            <Form.Group controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu teléfono" />
            </Form.Group>
            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu dirección" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu email" />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center">
            <Button className="register-button">Registrar</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Registro;
