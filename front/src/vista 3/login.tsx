import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./login.css"

const Login = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="encabezadoh2 text-center mb-4">Iniciar sesión</h2>
          <Form className='login-form'>
            <Form.Group controlId="formEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu correo electrónico" />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingresa tu contraseña" />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="login-button mt-3">Ingresar</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

