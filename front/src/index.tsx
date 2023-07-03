import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// Componentes
import Header from './common/Header';
import LibraryCatalog from './Vista 1/LibraryCatalog';
import Login from './vista3/login';
import Register from './vista 4/registro';
import Solicitudes from './Vista 5/Solicitudes';
//import FakeNighMode from './common/FakeNightMode'; //only if needed dev
import GridSystem_ProfileWorkspace from './View 7 - User Summary/GridSystem_ProfileWorkingSpace';
import Devolucion from './vista9/Devolucion';
import AdministracionColeccion from './vista10/AdministracionColeccion';


export default function App() {
  const [isAdmin, setIsAdmin] = useState(false); //Se inicializa el estado de isAdmin como falso


  //Esta funcion se pasa al componente de "Login" para setear la variable "isAdmin"
  const handleLoginSuccess = (isAdminUser: boolean) => {
    setIsAdmin(isAdminUser);
    if (!isAdminUser) {
      // Si no es administrador (es decir, si es un usuario normal), redirecciona al catálogo
      window.location.href = '/catalogo';
    }
  };
  
  return (
      <Router>
      <Routes>
        <Route path="/register" element={<Register></Register>}> </Route>
        <Route path="/" element={
          isAdmin ? ( //esto es el condicional de inicio de sesion para admin
            
            <Navigate to="perfil" replace />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        }
      />
        {isAdmin ? (//mismo condicional, pero este indica las rutas a las cuales pueden acceder los usuarios
          <>
            <Route path="/" element={<Navigate to="perfil" replace />}></Route>
            <Route path="catalogo" element={<LibraryCatalog />} />
            <Route path="agregar" element={<AdministracionColeccion/>}> </Route>
            <Route path="solicitudes" element={<Solicitudes />} />
            <Route path="perfil" element={<GridSystem_ProfileWorkspace></GridSystem_ProfileWorkspace>}> </Route>
          </>
        ) : (
          <>
            <Route path="catalogo" element={<LibraryCatalog />} />
            <Route path="devolucion" element={<Devolucion/>}> </Route>
            <Route path="perfil" element={<GridSystem_ProfileWorkspace></GridSystem_ProfileWorkspace>}> </Route>
            <Route
              path="/*"
              element={<Navigate to="catalogo" replace />}
            />
          </>
        )}
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();