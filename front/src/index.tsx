import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// importa tus componentes aquí
import Header from './common/Header';
import LibraryCatalog from './Vista 1/LibraryCatalog';
import Login from './vista3/login';
import Register from './vista 4/registro';
import Solicitudes from './Vista 5/Solicitudes';
//import FakeNighMode from './common/FakeNightMode'; //solo si es necesario en dev
import GridSystem_ProfileWorkspace from './View 7 - User Summary/GridSystem_ProfileWorkingSpace';
import Devolucion from './vista9/Devolucion';
import AdministracionColeccion from './vista10/AdministracionColeccion';



export default function App() {
  const [isAdmin, setIsAdmin] = useState(false); 

  const handleLoginSuccess = (isAdminUser: boolean) => {
    setIsAdmin(isAdminUser);
    if (!isAdminUser) {
      window.location.href = '/catalogo';
    }
  };

  // Redirecciona a la página de perfil si el usuario es un administrador.
  useEffect(() => {
    if (isAdmin) {
      window.location.href = '/perfil';
    }
  }, [isAdmin]);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />

            <Route path="/catalogo" element={<LibraryCatalog />} />
            <Route path="/agregar" element={<AdministracionColeccion/>}> </Route>
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route path="/perfil" element={<GridSystem_ProfileWorkspace></GridSystem_ProfileWorkspace>}> </Route>
            <Route path="/devolucion" element={<Devolucion/>}> </Route>
            
      </Routes>
    </Router>
  );
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div className='root-container'>
  <React.StrictMode>

    <Router>
      {/*<FakeNighMode></FakeNighMode>*/}
    <Header></Header>
    </Router>
    
    <div className='rendered-component'>
      <App></App>
    </div>
  </React.StrictMode>
  </div>
);

// Si quieres empezar a medir el rendimiento en tu aplicación, pasa una función
// para registrar los resultados (por ejemplo, reportWebVitals(console.log))
// o envía a un punto final de análisis. Aprende más: https://bit.ly/CRA-vitals
reportWebVitals();
