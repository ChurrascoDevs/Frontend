import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
//import './Devolucion.css';
import bookImage from './libro.jpg';
import './Devolucion.css';
import axios from 'axios';


function getDocumentoById(idDocumento : string){
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:3001/graphql', {
      query: `
      {
        getdocument(id : "${idDocumento}"){
          titulo,
          autor
        }
      }
      `
    })
      .then(response => {
        const documento = response.data.data.getdocument;
        const titulo = documento.titulo;
        const autor = documento.autor;

        const ejemplarDetails = {
          titulo,
          autor
        };

        resolve(ejemplarDetails);
      })
      .catch(error => {
        reject(error);
      });
  });
}


function getEjemplarById(idEjemplar : string){
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:3001/graphql', {
      query: `
      {
        getEjemplarById(id : "${idEjemplar}"){
          idDocumento
        }
      }
      `
    })
      .then(response => {
        console.log("funciono aca : ");
        const ejemplar_data = response.data.data.getEjemplarById;
        const idDocumento = ejemplar_data.idDocumento;

        const ejemplarDetails = {
          idDocumento
        };

        resolve(ejemplarDetails);
      })
      .catch(error => {
        reject(error);
      });
  });
}


function getLoan(id : string) {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:3001/graphql', {
      query: `
      {
        getLoanByID(_id: "${id}") {
          fechaPrestamo,
          fechaDevolucion,
          fechaDevolucionReal,
          idEjemplar,
          estado
        }
      }
      `
    })
      .then(response => {
        const loanData = response.data.data.getLoanByID;
        const fechaPrestamo = loanData.fechaPrestamo;
        const fechaLimite = loanData.fechaDevolucion;
        const fechaActual = loanData.fechaDevolucionReal; // Fecha actual
        const estado = loanData.estado;
        const idDocumento = loanData.idEjemplar;

        const loanDetails = {
          fechaPrestamo,
          fechaLimite,
          fechaActual,
          estado,
          idDocumento
        };

        resolve(loanDetails);
      })
      .catch(error => {
        reject(error);
      });
  });
}



  


function Devolucion() {
  
  const [ingreso, setIngreso] = useState<boolean>(false);
  const [codigo, setCodigo] = useState<string>('');
  const [libro, setLibro] = useState({
    titulo: '',
    autor: '',
    fechaPrestamo: '08/04/2023',
    fechaLimite: '08/04/2023',
    fechaActual: '18/04/2023',
    estado: '2 días de retraso'
  });

  const devolver = (idDevolucion : string) => {
    
    axios.post('http://localhost:3001/graphql', {
        query: `
        {
          devolver(idEjemplar:"${idDevolucion}")
        }
        `
      }).then(response => {
        onIngresarPrestamo(codigo);
      })
  }

  const onIngresarPrestamo = (idDevolucion : string) => {
    getLoan(idDevolucion).then( (loanDetails : any) =>  {
    getEjemplarById(loanDetails.idDocumento).then( (ejemplarDetails : any) =>{
    getDocumentoById(ejemplarDetails.idDocumento).then( ( documento : any) => {
        setLibro({
          titulo: documento.titulo,
          autor: documento.autor,
          fechaPrestamo: loanDetails.fechaPrestamo,
          fechaLimite: loanDetails.fechaLimite,
          fechaActual: loanDetails.fechaActual,
          estado: loanDetails.estado
        })
      } )
  });
  }).catch(error => {
    console.error(error);
    console.log("error al obtener");
  });
  }



  const libroInfo = () => {
    if(libro.titulo != ''){
    return( <div className='box'>
    <Col>
      <h4 className='centerForm'> 'El Gran Gatsby'</h4>
    </Col>
    <Row className="mt-4">
      <Col md="auto">
          <img src={bookImage} width={250} height={250} alt="Libro" className="libro-imagen" />
      </Col>
      
      <Col className="libroinfo">
              <p><strong>Autor:</strong> { libro.autor }</p>
              <p><strong>Fecha de préstamo:</strong> { new Date(  Number(libro.fechaPrestamo) ).toString()  }</p>
              <p><strong>Fecha límite:</strong> { new Date(  Number(libro.fechaLimite) ).toString() }</p>
              <p><strong>Fecha actual:</strong> {new Date(  Number(libro.fechaActual) ).toString() }</p>
              <p><strong>Estado:</strong> {libro.estado}</p>
      </Col>
    </Row>
      <Col>
        <div className="d-flex flex-row-reverse">
          <Button className="p-2" variant="danger"  onClick={ (codigo) => devolver(codigo.toString()) }>Devolver</Button>
        </div>
      </Col>
      </div>);
    }else if( ingreso ){
      return ( <div className='center'> Cargando libro... </div>);
    }
    else{
      <div></div>
    }
  }




  return (
    
    <Container className="devo-container  gap-3">
        
      <Row bsPrefix="my-3">
        <Col >
        <Card className='p-4' >
            <div className='container d-flex justify-content-center'>
                <Form >
                    <Form.Group as={Row} className="d-flex align-items-end">
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Código documento</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Control value={ codigo } onChange={ (e) => setCodigo(e.target.value) } placeholder="Código" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formButton" >
                            <Button onClick={() =>{ 
                              setIngreso(true);
                              onIngresarPrestamo(codigo.toString()); }} className='my-custom-button'>Ingresar</Button>
                        </Form.Group>
                    </Form.Group>
                </Form>
            </div>
          </Card>
        </Col>
      </Row>
      
        <Card className='p-4'>
          <Row>
            <Col>
              <h4 className='centerForm'> Devolucion</h4>
            </Col>
          </Row>
          { libroInfo() }
        </Card>
       
    </Container>
  );
}

export default Devolucion;