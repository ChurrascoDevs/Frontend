import {useState, ChangeEvent} from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

import "./login.css"

const Login = ({ onLoginSuccess }: { onLoginSuccess: (isAdminUser: boolean) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  //handleLogin maneja la conexion con el backend
  const handleLogin = async () => {
    await axios.post('http://localhost:3001/login', { 
      username:username, password:password 
    })  
    .then(function (response) {
      const isAdminUser = response.data.isAdmin; 
      console.log(`Admin State: ${isAdminUser}`);
      localStorage.setItem('isAdmin', isAdminUser) //Se guarda el valor booleano que indica si es admin en el almacenamiento local
      onLoginSuccess(isAdminUser); // Llama a la función onLoginSuccess en el componente padre para actualizar el valor "isAdmin"
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
      setError('Usuario o contraseña incorrectos');

    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="encabezadoh2 text-center mb-4">Iniciar sesión</h2>
          <Form className='login-form'>
            <Form.Group controlId="formUsername">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu nombre de usuario" onChange={handleUsernameChange}/>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingresa tu contraseña" onChange={handlePasswordChange}/>
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="button" className="login-button mt-3" onClick={handleLogin}>Ingresar</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

