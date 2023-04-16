import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Cart } from 'react-bootstrap-icons';
import './Header.css'; // Aquí puedes importar tu archivo CSS para el Header si lo tienes

function Header() {
    return (
      <Navbar bg="light" expand="lg" className="navbar-custom mx-0">
        <Container>
          <Navbar.Brand href="/">Biblioteca</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/perfil" className="nav-link">Perfil</Nav.Link>
              <Nav.Link href="/catalogo" className="nav-link">Catalogo</Nav.Link>
              <Nav.Link href="/solicitudes" className="nav-link">Solicitudes</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link href="/carrito" className="nav-link"><Cart size={25}/></Nav.Link>
              <Nav.Link href="/cerrar-sesion" className="nav-link">Cerrar Sesión</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

export default Header;