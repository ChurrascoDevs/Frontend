import { Navbar, Nav, Container } from 'react-bootstrap';
import { Cart } from 'react-bootstrap-icons';
import './Header.css'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

type AdminStatus = null | string;

function Header() {
  const location = useLocation(); // Obtener la ubicación actual de la ruta
  const navigate = useNavigate();

  // Obtener la ruta relativa de la ubicación actual
  const currentPath = location.pathname;

  /* Obtener si usuario ingreso - temporal vía localstorage
  const [isAdmin, setIsAdmin] =  useState<AdminStatus>(localStorage.getItem('isAdmin'))
  useEffect(() => {
      setIsAdmin(localStorage.getItem('isAdmin'));
    }, [currentPath]);
  */

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('id');
    navigate('/');
  };

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
              <Nav.Link href="/agregar" className={`nav-link ${currentPath === '/agregar' ? 'active' : ''}`}>Agregar</Nav.Link>
            {/* isAdmin === 'true'?
            <>
              <Nav.Link href="/perfil#" className={`nav-link ${currentPath === '/perfil#' ? 'active' : ''}`}>Perfil</Nav.Link>
              <Nav.Link href="/perfil#docList" className={`nav-link ${currentPath === '/perfil#docList' ? 'active' : ''}`}>Historial</Nav.Link>
              <Nav.Link href="/catalogo" className={`nav-link ${currentPath === '/catalogo' ? 'active' : ''}`}>Catalogo</Nav.Link>
              <Nav.Link href="/devolucion" className={`nav-link ${currentPath === '/devolucion' ? 'active' : ''}`}>Devolucion</Nav.Link>
              <Nav.Link href="/agregar" className={`nav-link ${currentPath === '/agregar' ? 'active' : ''}`}>Agregar</Nav.Link>
            </>:
            /*isAdmin === 'false'?
            <>
              <Nav.Link href="/perfil#" className={`nav-link ${currentPath === '/perfil#' ? 'active' : ''}`}>Perfil</Nav.Link>
              <Nav.Link href="/perfil#docList" className={`nav-link ${currentPath === '/perfil#docList' ? 'active' : ''}`}>Historial</Nav.Link>
              <Nav.Link href="/catalogo" className={`nav-link ${currentPath === '/catalogo' ? 'active' : ''}`}>Catalogo</Nav.Link>
              <Nav.Link href="/solicitudes" className={`nav-link ${currentPath === '/solicitudes' ? 'active' : ''}`}>Solicitudes</Nav.Link>
            </>
            :
            <>
            <Nav.Link href="/catalogo" className={`nav-link ${currentPath === '/catalogo' ? 'active' : ''}`}>Catalogo</Nav.Link>
          </>*/}
          </Nav>
          <Nav>
            <Nav.Link href="/solicitudes" className="nav-link"><Cart size={25} /></Nav.Link>
            <Nav.Link href="/" className="nav-link" onClick={handleLogout}>Cerrar Sesión</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;