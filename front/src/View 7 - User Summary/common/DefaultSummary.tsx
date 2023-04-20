import React, { useState } from "react";
import { Container, Row, Col, Card, Form, InputGroup, FormControl, Button } from "react-bootstrap";

const LibraryCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");

  // Datos de ejemplo para los libros
  const books = [
    { id: 1, title: "Libro 1", author: "Autor 1", year: "2000", cover: "https://via.placeholder.com/150" },
    { id: 2, title: "Libro 2", author: "Autor 2", year: "2005", cover: "https://via.placeholder.com/150" },
    { id: 3, title: "Libro 3", author: "Autor 3", year: "2010", cover: "https://via.placeholder.com/150" },
    { id: 4, title: "Libro 4", author: "Autor 4", year: "2015", cover: "https://via.placeholder.com/150" },
  ];

  // Filtrar libros basados en término de búsqueda y filtro seleccionado
  const filteredBooks = books.filter((book) => {
    if (filterBy === "title") {
      return book.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterBy === "author") {
      return book.author.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterBy === "year") {
      return book.year === searchTerm;
    } else {
      return true;
    }
  });

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1>Encabezado</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <InputGroup className="mt-3">
            <FormControl
              type="text"
              placeholder="Buscar libros"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Form.Control
              as="select"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="">Filtrar por</option>
              <option value="title">Título</option>
              <option value="author">Autor</option>
              <option value="year">Año</option>
            </Form.Control>
            <InputGroup.Text>
              <Button variant="primary">Buscar</Button>
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      <Row>
  {filteredBooks.map((book) => (
    <Col xs={12} sm={6} md={4} key={book.id}>
      <Card>
        <Row noGutters={true}>
          <Col xs={4}>
            <Card.Img variant="top" src={book.cover} />
          </Col>
          <Col xs={8}>
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>
                <strong>Autor:</strong> {book.author}
                <br />
                <strong>Año:</strong> {book.year}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  ))}
</Row>
    </Container>
  );
};

export default LibraryCatalog;