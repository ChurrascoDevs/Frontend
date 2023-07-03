import React from 'react';
import { Container, Row, Col, Image, Accordion, Badge } from 'react-bootstrap';
import { Book, Boxes, PersonCheck } from 'react-bootstrap-icons';
import './UserProfile.css';

type userInfo = {
  rol: string;
  userID: string;
};

const UserProfile = ({rol, userID}: userInfo) => {
  const userData = { 
    id: userID, rol: rol,
    names: "Nombre Nombre2", lastNames:"Apellido1 Apellido2", rut: "12.3456.789-0",
    userImage: `https://placehold.co/150?text=${"Nombre"}`,// "https://via.placeholder.com/150", 
    phone: "+569 1234 5678", email: "Nombre1@example.com", 
    active:"SI", address:"Mi hogar 123" }


  return (
    <Container>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header className='acordion-header'>
          <Col><h5> Perfil de usuario </h5></Col>
          <Col><h5> <Badge bg={userData.rol==="Cliente biblioteca"? "success" :"primary"}>{userData.rol}</Badge></h5></Col>
        </Accordion.Header>
        <Accordion.Body>
          <Row>
          <Col xs={2}>
            <div className="text-right rol-image-container">
              <Image src={userData.userImage} roundedCircle fluid /> 
              <div className="overlay">
                {userData.rol==="Bibliotecario"? <Book size={60}/>: 
                userData.rol==="Administrativo"? <Boxes size={60}/> : <PersonCheck size={60}/>}
              </div>
            </div>
          </Col>
          <Col xs={10}>
            <Row>
              <Col>
                <h2>{userData.names} {userData.lastNames}</h2>
              </Col>
            </Row>
            <hr className="rounded"></hr>
            <Row>
              <Col>
                <p><b>Tipo de usuario:</b> {userData.rol}</p>
                <p><b>Email:</b> {userData.email}</p>
                <p><b>Teléfono:</b> {userData.phone}</p>
              </Col>
              <Col>
                <p><b>Rut:</b> {userData.rut}</p>
                <p><b>Dirección:</b> {userData.address}</p>
                <p><b>Activo:</b> {userData.active}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default UserProfile;
