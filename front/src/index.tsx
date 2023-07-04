import { SolicitudProvider } from './Vista 1/SolicitudContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
interface Book {
  _id: number;
  tipo: string;
  titulo: string;
  autor: string;
  editorial: string;
  anio: string;
  edicion: string;
  categoria: string;
  ubicacion: string;
  imagen: string;
  fecha_registro: Date;
  existencias?: number;
}


export default function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="catalogo" element={<LibraryCatalog />} />
        <Route path="solicitudes" element={<Solicitudes />} />
        <Route path="register" element={<Register></Register>}> </Route>
        <Route path="devolucion" element={<Devolucion/>}> </Route>
        <Route path="agregar" element={<AdministracionColeccion/>}> </Route>
        <Route path="perfil" element={<GridSystem_ProfileWorkspace></GridSystem_ProfileWorkspace>}> </Route>
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
    <SolicitudProvider>
     <Router>
      {/*<FakeNighMode></FakeNighMode>*/}
      <Header></Header>

     </Router>
    
    <div className='rendered-component'>
      <App></App>
    </div>
    </SolicitudProvider>
  </React.StrictMode>
  </div>
);

// Si quieres empezar a medir el rendimiento en tu aplicación, pasa una función
// para registrar los resultados (por ejemplo, reportWebVitals(console.log))
// o envía a un punto final de análisis. Aprende más: https://bit.ly/CRA-vitals
reportWebVitals();
