import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Cart } from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom'; // Importar Link y useLocation de react-router-dom
import './Header.css';

function Header() {
  const location = useLocation(); // Obtener la ubicación actual de la ruta

  // Obtener la ruta relativa de la ubicación actual
  const currentPath = location.pathname.replace(process.env.PUBLIC_URL, '');

  return (
    <Navbar bg="light" expand="lg" className="navbar-custom mx-0">
      <Container>
        <Navbar.Brand as={Link} to="/">Biblioteca</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/perfil" className={`nav-link ${currentPath === '/perfil' ? 'active' : ''}`}>Perfil</Nav.Link>
            <Nav.Link as={Link} to="/catalogo" className={`nav-link ${currentPath === '/catalogo' ? 'active' : ''}`}>Catalogo</Nav.Link>
            <Nav.Link as={Link} to="/solicitudes" className={`nav-link ${currentPath === '/solicitudes' ? 'active' : ''}`}>Solicitudes</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/carrito" className="nav-link"><Cart size={25} /></Nav.Link>
            <Nav.Link as={Link} to="/cerrar-sesion" className="nav-link">Cerrar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

