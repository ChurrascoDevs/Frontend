import { SetStateAction, useState } from "react";
import { Container, Row, Col, Table, Card, ListGroup, Pagination, Button, Stack, Toast, ToastContainer, Badge } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import "./Results.css";

type userInfo = {
  rol: string;
};

function Results({rol}: userInfo) {
  //Global - test data
  const items = [
    { id: 13451, name: "Documento 1", category: "Otro", imageUrl: "https://via.placeholder.com/150x200", date1: "12/12/12 13:55", edition: 1, autor: "Autor1", client: "0.000.000-0" },
    { id: 93714, name: "Nombre fantasía", category: "Libro", imageUrl: "https://via.placeholder.com/150x200", date1: "13/12/12 08:30", edition: 2, autor: "Autor54", client: "0.000.000-k" },
    { id: 92535, name: "Libro común", category:"Libro", imageUrl: "https://via.placeholder.com/150x200", date1: "14/12/12 11:58", edition: 7, autor: "Autor2", client: "12.345.678-0" },
    { id: 49573, name: "Libro común 2", category: "Libro", imageUrl: "https://via.placeholder.com/150x200", date1: "15/12/12 15:45", edition: 1, autor: "Autor6", client: "9.876.543-2" },
    { id: 13492, name: "Documental...", category: "Video", imageUrl: "https://via.placeholder.com/150x200", date1: "16/12/12 18:50", edition: 6, autor: "Autor27", client: "19.876.543-2" },
    //temporal pages otherwise infinite list
    { id: 6, name: "Libro digital", category: "Libro", imageUrl: "https://via.placeholder.com/150x200", date1: "17/12/12 12:07", edition: 2, autor: "Autor54", client: "1.111.111-1" },
    //{ id: 7, name: "Item 7", imageUrl: "https://via.placeholder.com/150x200", property1: "18/12/12", property2: "Prop 7" },
  ];

  function randomIntFromInterval(min :any, max :any) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  const rndInt = randomIntFromInterval(0, 2)

  const [selectedItem, setSelectedItem] = useState(items[0]);

  //toast
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");


  const handleItemClick = (item: SetStateAction<{ id: number; name: string; category: string; imageUrl: string; date1: string; edition: number; autor: string; client: string; }>) => {
    setSelectedItem(item);
  };

  const handlePositiveAction = () => {
    setToastMsg("prestado");
    setShowToast(true);
  };

  const handleNegativeAction = () => {
    setToastMsg("mantenido");
    setShowToast(true);
  };

  const handleReEntryAction = () => {
    setToastMsg("reingresado");
    setShowToast(true);
  };

  return (
    <Container fluid className="results-container" id="docList">
      <Row className="header-results">
        <h4>
        {rol==="Bibliotecario"? "Solicitudes prestamos": 
        rol==="Administrativo"? "Prestamos vencidos en sala": "Prestamos concedidos"}
      </h4>
      </Row>
      <hr></hr>
      <Row>

        <ToastContainer position="bottom-center">
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide bg="warning">
            <Toast.Header>
              <strong className="me-auto">Actualización de documento {selectedItem.id}</strong>
              <small>Ahora</small>
            </Toast.Header>
            <Toast.Body>El documento ha sido: <b>{toastMsg}</b> correctamente.</Toast.Body>
          </Toast>
        </ToastContainer>

      <Col>
          <div className="item-list">
            <div>
              <Row className="header-doc-list">
                <Col><p className="list-item-name">Documento</p></Col>
                <Col><p className="text-muted" >Fecha solicitud</p></Col>
              </Row>
            </div>
            <ListGroup defaultActiveKey="#link1">
            {items.map((item) => (
              <ListGroup.Item action active={false} onClick={() => handleItemClick(item)}
              className={`list-item ${selectedItem.id === item.id ? "selected" : ""}`}
              href="#detailsDoc"
              >
                <Row>
                  <Col><div className="list-item-image" style={{ backgroundImage: `url(${item.imageUrl})` }}></div></Col>
                  <Col><p className="list-item-name">{item.name}</p></Col>
                  <Col><p>{item.date1}</p></Col>
                </Row>
              </ListGroup.Item>
            ))}
            </ListGroup>
          
            <Pagination>
              <Pagination.Prev />
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next />
            </Pagination>

          </div>
        </Col>

        <Col>
          <Card >
          <div id="detailsDoc" className="item-container">
            <Row>
              <Card.Title>
                Documento: {selectedItem.name}
                {rol==="Cliente biblioteca"? 
                  <Badge className="state-doc-badge" bg={rndInt===0? "success" : rndInt===1?"danger" :"info"}>
                    {rndInt===0? "Finalizado" : rndInt===1? "En curso" :"Solicitado"}
                  </Badge>
                  :null
                }
              </Card.Title>
            </Row>
            <hr className="rounded"></hr>
            <Image className="item-image" src={selectedItem.imageUrl} rounded />
            <div className="item-details">
              {selectedItem ? (
                <>
                  <Table>
                    <tbody>
                      <tr>
                        <td>Categoría: {selectedItem.category}</td>
                        <td>Ejemplar: QRF{selectedItem.id}</td>
                      </tr>
                      <tr>
                        <td>Edición: {selectedItem.edition}</td>
                        <td>Autor: {selectedItem.autor}</td>
                      </tr>
                      <tr className="details-user-data-divider">
                        <td>F. solicitado: {selectedItem.date1}</td>
                        <td>Rut usuario: {rol==="Cliente biblioteca" ? "12.345.678-9" :selectedItem.client}</td>
                      </tr>
                      {rol==="Cliente biblioteca"? 
                        <tr>
                          <td>F. prestamo: {selectedItem.date1}</td>
                          <td>F. devolución: {selectedItem.date1}</td>
                        </tr>:null}
                    </tbody>
                  </Table>
                  { rol==="Bibliotecario"?
                    <Stack className="item-actions" direction="horizontal" gap={3}>
                      <Button variant="success" className="positive-action" onClick={handlePositiveAction}>Aceptar solicitud</Button>{' '}
                      <div className="vr" />
                      <Button variant="danger" className="negative-action" onClick={handleNegativeAction}>Rechazar solicitud</Button>{' '}
                    </Stack>
                    : rol==="Administrativo"?
                    <Stack className="item-actions" direction="horizontal" gap={3}>
                      <Button variant="success" className="positive-action" onClick={handleReEntryAction}>Reingresar documento</Button>{' '}
                    </Stack>
                    : null
                  }
                </>
              ) : (
                <p className="no-item-selected">No item selected</p>
              )}
            </div>
          </div>
        </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default Results;

