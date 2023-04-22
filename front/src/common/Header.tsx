import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Cart } from 'react-bootstrap-icons';
import './Header.css'; 
import { useLocation } from 'react-router-dom';


function Header() {
  const location = useLocation(); // Obtener la ubicación actual de la ruta

  // Obtener la ruta relativa de la ubicación actual
  const currentPath = location.pathname;
  return (
    <Navbar bg="light" expand="md" className="navbar-custom mx-0" sticky="top">
      <Container>
        <Navbar.Brand href="/">Biblioteca</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/perfil#" className={`nav-link ${currentPath === '/perfil#' ? 'active' : ''}`}>Perfil</Nav.Link>
            <Nav.Link href="/perfil#docList" className={`nav-link ${currentPath === '/perfil#docList' ? 'active' : ''}`}>Historial</Nav.Link>
            <Nav.Link href="/catalogo" className={`nav-link ${currentPath === '/catalogo' ? 'active' : ''}`}>Catalogo</Nav.Link>
            <Nav.Link href="/solicitudes" className={`nav-link ${currentPath === '/solicitudes' ? 'active' : ''}`}>Solicitudes</Nav.Link>
            <Nav.Link href="/devolucion" className={`nav-link ${currentPath === '/devolucion' ? 'active' : ''}`}>Devolucion</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/carrito" className="nav-link"><Cart size={25} /></Nav.Link>
            <Nav.Link href="/cerrar-sesion" className="nav-link">Cerrar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;