import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Accordion, Badge } from 'react-bootstrap';
import { Book, Boxes, PersonCheck } from 'react-bootstrap-icons';
import { getBackUser, User, SkeletonUser } from './UtilsAxios';
import './UserProfile.css';

type userInfo = {
  rol: string;
  userID: string;
};

const UserProfile = ({rol, userID}: userInfo) => {
  const [user, setUser] = useState<User>(SkeletonUser); //mostrados en página actual (10)

  //Consulta a back inicial y al recargar resultados - TODO revisar doble carga
  useEffect(() => {
    const fetchData = async () => {
      const response = await getBackUser(userID);
      setUser(response);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header className='acordion-header'>
          <Col><h5> Perfil de usuario </h5></Col>
          <Col><h5> <Badge bg={rol==="Cliente biblioteca"? "success" :"primary"}>{user.rol}</Badge></h5></Col>
        </Accordion.Header>
        <Accordion.Body>
          <Row>
          <Col xs={2}>
            <div className="text-right rol-image-container">
              <Image src={user.userImage} roundedCircle fluid /> 
              <div className="overlay">
                {user.rol==="Bibliotecario"? <Book size={60}/>: 
                user.rol==="Administrativo"? <Boxes size={60}/> : <PersonCheck size={60}/>}
              </div>
            </div>
          </Col>
          <Col xs={10}>
            <Row>
              <Col>
                <h2>{user.names} {user.lastNames}</h2>
              </Col>
            </Row>
            <hr className="rounded"></hr>
            <Row>
              <Col>
                <p><b>Tipo de usuario:</b> {user.rol}</p>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Teléfono:</b> {user.telefono}</p>
              </Col>
              <Col>
                <p><b>Rut:</b> {user.rut}</p>
                <p><b>Dirección:</b> {user.direccion}</p>
                <p><b>Activo:</b> {user.activo? "SI":"NO"}</p>
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
