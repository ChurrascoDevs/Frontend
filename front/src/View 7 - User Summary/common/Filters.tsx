import React, { useState } from "react";
import { Container, Row, Form, FormControl, Button, FormGroup } from "react-bootstrap";
import './Filters.css'

const Filters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");

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
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
      >
          <option value="">Pendientes</option>
          <option value="Aceptados">Aceptados</option>
          <option value="Rechazados">Rechazados</option>
          <option value="Todos">Todos</option>
        </Form.Select>
      </Row>
      <br></br>
      <Row>
        <Form.Label>Tipo documento</Form.Label>
        <Form.Select
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
      >
        <option value="">Libro</option>
        <option value="Video">Video</option>
        <option value="Material">Material</option>
        <option value="Otro">Otro</option>
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
        <Button variant="success" className="positive-action"href="#docList">Buscar</Button>
    </Row>
    </FormGroup>
    <hr className="rounded"></hr>
    </Container>
  );
};

export default Filters;