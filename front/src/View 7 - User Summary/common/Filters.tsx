import { useEffect, useState } from "react";
import { Container, Row, Form, FormControl, Button, FormGroup } from "react-bootstrap";
import './Filters.css'

type FilterProps = {
  onFilterChange: (categoryFilter: string, stateFilter: string, termFilter: string) => void;
};

export function Filters ({onFilterChange}:FilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByState, setFilterByState] = useState("Todos");
  const [filterByCategory, setFilterByCategory] = useState("Todos");

  const HandleSearch = () => {
    onFilterChange(filterByCategory, filterByState, searchTerm);
  };

  return (
    <Container className="filter-container">
      <hr className="rounded"></hr>
      <Row>
        <h5>Filtros</h5>
      </Row>
      <FormGroup>
      <Row>
        <Form.Label>Estado</Form.Label>
        <Form.Select
        value={filterByState}
        onChange={(e) => setFilterByState(e.target.value)}
      >
          <option value="Todos">Todos</option>
          <option value="Solicitado">Petición pendiente</option>
          <option value="Prestado">Devolución pendiente</option>
          <option value="Devuelto">Finalizados</option>
          <option value="Rechazado">Rechazados</option>
        </Form.Select>
      </Row>
      <br></br>
      <Row>
        <Form.Label>Tipo prestamo</Form.Label>
        <Form.Select
        value={filterByCategory}
        onChange={(e) => setFilterByCategory(e.target.value)}
      >
        <option value="Todos">Todos</option>
        <option value="domicilio">Domicilio</option>
        <option value="sala">Sala</option>
      </Form.Select>
    </Row>
    <br></br>
    <Row>
      <Form.Label>Título</Form.Label>
      <FormControl
        type="text"
        placeholder="nombre documento"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Row>
    <br></br>
    <Row>
        <Button variant="success" className="positive-action"href="#docList" onClick={() => HandleSearch()}>Buscar</Button>
    </Row>
    </FormGroup>
    <hr className="rounded"></hr>
    </Container>
  );
};