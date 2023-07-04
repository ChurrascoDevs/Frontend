import { SetStateAction, useEffect, useState } from "react";
import { Container, Row, Col, Table, Card, ListGroup, Button, Stack, Toast, ToastContainer, Badge } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import { CustomPagination } from "./CustomPagination"
import { getBackUser, getBackDocumento,
   getBackEjemplar, postBackEjemplar,
   getBackLoans, Loan, postBackLoans} from './UtilsAxios';
import "./Results.css";

type ResultsProps = {
  rol: string;
  userID: string;
  filters: {stateFilter:string , categoryFilter:string, termFilter:string};
};

async function getSelectedLoans(rol:string, idUsuario:string, filters: {stateFilter:string , categoryFilter:string, termFilter:string}) {
  let loanSubQuery = "getAll";
  if (rol === "Cliente biblioteca") {
    loanSubQuery = `getAllUser/${idUsuario}`;
  } else if (rol === "Bibliotecario") {
    loanSubQuery = "getAll";
  } else if (rol === "Administrativo") {
    loanSubQuery = "getAllState/Prestados";
  }

  let result = await getBackLoans(loanSubQuery);

  // filter array of loans by state (each result attr "estado" = statefilter)
  if (filters.stateFilter !== "Todos") {
    result = result.filter((loan) => loan.estado === filters.stateFilter);
  }

  // filter array of loans by category (each result attr "tipoPrestamo" = categoryFilter)
  if (filters.categoryFilter !== "Todos") {
    result = result.filter((loan) => loan.tipoPrestamo === filters.categoryFilter);    
  }

  // filter array of loans by term (each result attr "nombre" = termFilter)
  result = result.filter((loan) => loan.nombre.includes(filters.termFilter));

  return result;
}

export function Results({rol, userID, filters}: ResultsProps){
  //Setting Loans
  const [allItems, setAllItems] = useState<Loan[]>([]);
  const [items, setItems] = useState<Loan[]>([]); //mostrados en página actual (10)
  const [refreshResults, setRefreshResults] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Loan | undefined>(undefined);

  //Settings Pages
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  //Setting toast  
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  //Consulta a back inicial y al recargar resultados - TODO revisar doble carga
  useEffect(() => {
    const fetchData = async () => {
      //Get data & save
      const result = await getSelectedLoans(rol, userID, filters);
      setAllItems(result);
      setItems(result.slice(0,itemsPerPage)); //página inicial de resultados

      // Update data if need it (patch response)
      let successUpdate = false; 
      for (let i = 0; i < result.length; i++) {
        if (result[i]._id === selectedItem?._id) {
          handleItemClick(result[i])
          successUpdate = true;
        }
      }
      if (!successUpdate) {setSelectedItem(undefined)}; // likely user update but don't have permission (rol "Administrativo")
    };

    fetchData();
    setRefreshResults(false);
  }, [filters, refreshResults]);

  // default selected Loan
  const SelectedItemColor = ((estado) => {
    switch (estado) {
      case "Solicitado":
        return "success";
      case "Prestado":
        return "danger";
      default:
        return "info";
    }
  })(selectedItem?.estado);

  //Setting user interactions
  const handleItemClick = async (item: Loan) => {
    //query item details
    const userData = await getBackUser(item.idUsuario);
    const ejemplarData = await getBackEjemplar(item.idEjemplar);
    const documentoData = await getBackDocumento(ejemplarData.idDocumento);

    item.edicion = documentoData.edicion;
    item.categoria = documentoData.categoria;
    item.autor = documentoData.autor;
    item.ubicacion = ejemplarData.ubicación;
    item.estadoDoc = ejemplarData.estado;


    item.rutUsuario = userData.rut;
    item.nombreUsuario = userData.nombre + " " + userData.apellido;

    item.idToDisplay = item.idEjemplar.slice(0,6);  //consultar si aquí o desde back y formula
    setSelectedItem(item);
  };

  const handlePositiveAction = async (item: Loan) => {
    const ejemplarData = await getBackEjemplar(item.idUsuario);
    //revisión estado ejemplar
    if (ejemplarData.estado === "Tomado") {
      setToastMsg("Error, ejemplar no disponible.");
      setShowToast(true);
    }else{
      //cambio de estad a ejemplar
      const success0 = await postBackEjemplar(item.idEjemplar, "Tomado");
      if (success0) {
        const success = await postBackLoans(item._id, "aceptar"); //temporalmente no se inluye opción selección fecha manual
        if (success) {
          setToastMsg("El prestamo a sido ACEPTADO correctamente,");
          setShowToast(true);
          setRefreshResults(true);
        } else{
          //temporal - Rollback just once...
          const success0 = await postBackEjemplar(item.idEjemplar, "Disponible");
          setToastMsg("Error inesperado al actualizar el prestamo, intente nuevamente.");
          setShowToast(true);
        } 
      }else{
        setToastMsg("Error inesperado al actualizar el ejemplar, intente nuevamente.");
        setShowToast(true);
      }
    }
  };

  const handleNegativeAction = async (item: Loan) => {
    const success = await postBackLoans(item._id, "rechazar");
    if (success) {
      setToastMsg("El prestamo ha sido RECHAZADO correctamente.");
      setShowToast(true);
      setRefreshResults(true);
    } else{
      setToastMsg("Error al actualizar el prestamo, intente nuevamente.");
      setShowToast(true);
    }
  };

  const handleReEntryAction = async (item: Loan) => {
    const success = await postBackLoans(item._id, "cerrar");
    if (success) {
      setToastMsg("El documento ha sido REINGRESADO correctamente.");
      setShowToast(true);
      setRefreshResults(true);
    } else{
      setToastMsg("Error al actualizar el prestamo, intente nuevamente.");
      setShowToast(true);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const startItem = (pageNumber - 1) * itemsPerPage;
    const endItem = startItem + itemsPerPage;
    setItems(allItems.slice(startItem, endItem));
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
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide bg={toastMsg.includes("Error")? "error":"info"}>
            <Toast.Header>
              <strong className="me-auto">Actualización de documento {selectedItem?.idToDisplay}</strong>
              <small>Ahora</small>
            </Toast.Header>
            <Toast.Body>{toastMsg}</Toast.Body>
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
            {items.length === 0 ?
                <p className="no-item-selected">No se encontraron resultados para los filtros seleccionados.</p>
              : 
              <ListGroup defaultActiveKey="#link1">
              {items.map((item) => (
                <ListGroup.Item key={item._id} action active={false} onClick={() => handleItemClick(item)}
                className={`list-item ${selectedItem?._id === item._id ? "selected" : ""}`}
                href="#detailsDoc"
                >
                  <Row>
                    <Col className="list-item-image" >
                      <Image className="list-item-image" src={item.imagen} rounded />
                    </Col>
                    <Col><p className="list-item-name">{item.nombre}</p></Col>
                    <Col><p>{item.fechaSolicitud.toLocaleString()}</p></Col>
                  </Row>
                </ListGroup.Item>
              ))}
              </ListGroup>
            }

            <CustomPagination itemsLenght={allItems.length} itemsPerPage={itemsPerPage} onPageChange={handlePageChange}/>

          </div>
        </Col>

        <Col>
          <Card >
          <div id="detailsDoc" className="item-container">
            <Row>
              <Card.Title>
                Documento: {selectedItem?.nombre}
                <Badge className="state-doc-badge" 
                  bg={SelectedItemColor}>
                  {selectedItem?.estado}
                </Badge>
              </Card.Title>
            </Row>
            <hr className="rounded"></hr>
            <Image className="item-image" src={selectedItem?.imagen} rounded />
            <div className="item-details">
            <hr className="rounded"></hr>
              {selectedItem ? (
                <>
                  <Table>
                    <tbody>
                      <tr className="custom_tr">
                        <td><b>Ejemplar:</b> {selectedItem.idEjemplar} ({selectedItem.estadoDoc})</td>
                      </tr>
                      <tr className="custom_tr">
                        <td><b>Categoría:</b> {selectedItem.categoria}</td>
                        <td><b>Ubicacion:</b> {selectedItem.ubicacion}</td>
                      </tr>
                      <tr className="custom_tr">
                      <td><b>Autor:</b> {selectedItem.autor}</td>
                        <td><b>Edición:</b> {selectedItem.edicion}</td>
                      </tr>
                      <tr className="details-data-divider custom_tr">
                        <td><b>Rut usuario:</b> {selectedItem.rutUsuario}</td>
                        <td><b>Nombre:</b> {selectedItem.nombreUsuario}</td>
                      </tr>
                      <tr className="details-data-divider">
                        <td><b>Tipo prestamo:</b> {selectedItem.tipoPrestamo}</td>
                      </tr>
                      <tr>
                        <td><b>Fecha solicitado:</b> {selectedItem.fechaSolicitud?.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td><b>Fecha prestamo:</b> {selectedItem.fechaPrestamo?.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td><b>Fecha límite:</b> {selectedItem.fechaDevolucion?.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td><b>Fecha devuelto:</b> {selectedItem.fechaDevolucionReal?.toLocaleString()}</td>
                      </tr>
                      <tr className="details-data-divider">
                        <td>Prestamo ID: {selectedItem._id}</td>
                      </tr>
                    </tbody>
                  </Table>
                  { rol==="Bibliotecario" && selectedItem.estado === "Solicitado"?
                    <Stack className="item-actions" direction="horizontal" gap={3}>
                      <Button variant="success" className="positive-action" onClick={()=>handlePositiveAction(selectedItem)}>Aceptar solicitud</Button>{' '}
                      <div className="vr" />
                      <Button variant="danger" className="negative-action" onClick={()=>handleNegativeAction(selectedItem)}>Rechazar solicitud</Button>{' '}
                    </Stack>
                    : (rol==="Administrativo" || rol==="Bibliotecario") && selectedItem.estado === "Prestado" ?
                    <Stack className="item-actions" direction="horizontal" gap={3}>
                      <Button variant="success" className="positive-action" onClick={()=>handleReEntryAction(selectedItem)}>Reingresar documento</Button>{' '}
                    </Stack>
                    : null
                  }
                </>
              ) : (
                <p className="no-item-selected">Seleccione una solicitud para ver sus detalles.</p>
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

