import React, {useState, ChangeEvent, FormEvent} from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./registro.css"

const Registro = () => {
  const [username, setUsername] = useState('');
  const [nombre, setNombres] = useState('');
  const [apellido, setApellidos] = useState('');
  const [password, setPassword] = useState('');
  const [rut, setRut] = useState('');
  const [rol, setRol] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleNombresChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNombres(event.target.value);
  };

  const handleApellidosChange = (event: ChangeEvent<HTMLInputElement>) => {
    setApellidos(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRutChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRut(event.target.value);
  };

  const handleRolChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRol(event.target.value);
  };

  const handleTelefonoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTelefono(event.target.value);
  };

  const handleDireccionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDireccion(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleRegistro = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario al servidor
    const formData = {
      username: username,
      password: password,
      rut: rut,
      rol: rol,
      nombre: nombre,
      apellido: apellido,
      direccion: direccion,
      email: email,
      telefono: telefono
    };

    await axios.post('http://localhost:3001/register',formData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log(formData);
  };

  return (
    <Container fluid>
      <Col md={8} className="user-registro">
        <h2 className="text-center mb-4">Registro de usuario</h2>
        <Form className="form-registro mb-4" onSubmit={handleRegistro}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Ingresa el username" value={username} onChange={handleUsernameChange} />
          </Form.Group>
          <Form.Group controlId="formNombres">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Ingresa nombre" value={nombre} onChange={handleNombresChange} />
          </Form.Group>
          <Form.Group controlId="formApellidos">
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" placeholder="Ingresa apellido" value={apellido} onChange={handleApellidosChange} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresa tu contraseña" value={password} onChange={handlePasswordChange} />
          </Form.Group>
          <Form.Group controlId="formRut">
            <Form.Label>Rut</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu Rut" value={rut} onChange={handleRutChange} />
          </Form.Group>
          <Form.Group controlId="formRol">
            <Form.Label>Rol</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu rol" value={rol} onChange={handleRolChange} />
          </Form.Group>
          <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu teléfono" value={telefono} onChange={handleTelefonoChange} />
          </Form.Group>
          <Form.Group controlId="formDireccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu dirección" value={direccion} onChange={handleDireccionChange} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu email" value={email} onChange={handleEmailChange} />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button className="register-button" type="submit">Registrar</Button>
          </div>
        </Form>
      </Col>
      {/* ... */}
    </Container>
  );
};

export default Registro;
