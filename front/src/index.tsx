import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// importen aqui sus componentes
import Header from './common/Header';
//import FakeNighMode from './common/FakeNightMode'; //only if needed dev
import GridSystem_ProfileWorkspace from './View 7 - User Summary/GridSystem_ProfileWorkingSpace';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div className='root-container'>
  <React.StrictMode>
    {/*<FakeNighMode></FakeNighMode>*/}
    <Header></Header>
    {/*<GridSystem_ProfileWorkspace></GridSystem_ProfileWorkspace>*/}
  </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
