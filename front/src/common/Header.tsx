import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Header.css'; // Aquí puedes importar tu archivo CSS para el Header si lo tienes

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/">Biblioteca</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/catalogo">Catalogo</Nav.Link>
            <Nav.Link href="/solicitudes">Solicitudes</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/perfil">Perfil</Nav.Link>
            <Nav.Link href="/cerrar-sesion">Cerrar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;