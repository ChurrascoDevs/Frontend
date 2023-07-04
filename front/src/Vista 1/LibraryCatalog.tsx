import React, { useEffect, useState,useContext } from "react";
import { Container, Row, Col, Card, Form, InputGroup, FormControl, Button, Modal } from "react-bootstrap";
import './LibraryCatalog.css';
import axios from 'axios';
import { FilterLeft } from "react-bootstrap-icons";
import { SolicitudContext } from './SolicitudContext';


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
}


const LibraryCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [solicitudes, setSolicitudes] = useState<Book[]>([]);
  //const contextValue = useContext(SolicitudContext);
  //const { solicitudes, dispatch } = contextValue || {};

//if (!solicitudes || !dispatch) {
  //throw new Error('useSolicitud debe usarse dentro de un SolicitudProvider');
//}
  /*interface Book {
    id: number;
    title: string;
    author: string;
    year: string; 
    category: string; 
    type: string; 
    edition: string;
    cover: string;
  }*/  
  

// Función para abrir el modal con el libro seleccionado
const handleOpenModal = (book: Book) => { // Especifica el tipo de 'book' como 'Book'
  setShowModal(true);
  setSelectedBook(book);
  console.log("LIBRO:" , setSelectedBook)
};
// Función para cerrar el modal
const handleCloseModal = () => {
  setSelectedBook(null);
  setShowModal(false);
};

const handleAddToSolicitud = (book: Book) => {
  //dispatch({ type: 'add', payload: book });
  setSolicitudes([...solicitudes, book]);
  console.log("add");
  console.log(solicitudes);
  handleCloseModal(); // Cerrar el modal después de agregar el libro
};

  // Datos de ejemplo para los libros
  const books = [
    { id: 1, title: "1984", author: "George Orwell", year: "1949", category: "Ficción distópica", type:"Novela", edition: "Primera edición",cover: "https://via.placeholder.com/150" },
    { id: 2, title: "La Guerra y la Paz", author: "Lev Tolstói", year: "1869", category: "Ficción histórica", type:"Novela", edition: "Edición en español",cover: "https://via.placeholder.com/150" },
    { id: 3, title: "El Perfume", author: "Patrick Süskind", year: "1985", category: "Ficción", type:"Novela", edition: "Edición de bolsillo",cover: "https://via.placeholder.com/150" },
    { id: 4, title: "Cien años de soledad", author: "Gabriel García Márquez", year: "1967", category: "Ficción", type:"Novela", edition: "Edición crítica",cover: "https://via.placeholder.com/150" },
    { id: 5, title: "El Principito", author: "Antoine de Saint-Exupéry", year: "1943", category: "Ficción", type:"Cuento", edition: "Edición ilustrada",cover: "https://via.placeholder.com/150" },
    { id: 6, title: "La sombra del viento", author: "Carlos Ruiz Zafón", year: "2001", category: "Ficción", type:"Novela", edition: "Edición de tapa dura",cover: "https://via.placeholder.com/150" },
    { id: 7, title: "Breve historia del tiempo", author: "Stephen Hawking", year: "1988", category: "No ficción", type:"Divulgación científica", edition: "Edición de bolsillo",cover: "https://via.placeholder.com/150" },
    { id: 8, title: "El arte de amar", author: "Erich Fromm", year: "1956", category: "No ficción", type:"Ensayo", edition: "Edición actualizada",cover: "https://via.placeholder.com/150" },
    { id: 9, title: "El nombre de la rosa", author: "Umberto Eco", year: "1980", category: "Ficción histórica", type:"Novela", edition: "Edición especial con prólogo del autor",cover: "https://via.placeholder.com/150" },
    { id: 10, title: "Las venas abiertas de América Latina", author: "Eduardo Galeano", year: "1971", category: "No ficción", type:"Ensayo político", edition: "Edición con anotaciones del autor",cover: "https://via.placeholder.com/150" },
    { id: 11, title: "El Aleph", author: "Jorge Luis Borges ", year: "1949", category: "Ficción", type:"Cuento", edition: "Edición en español",cover: "https://via.placeholder.com/150" },
    { id: 12, title: "Matar a un ruiseñor", author: "Harper Lee", year: "1960", category: "Ficción", type:"Novela", edition: "Edición de bolsillo",cover: "https://via.placeholder.com/150" },
    { id: 13, title: "La naranja mecánica", author: " Anthony Burgess", year: "1962", category: " Ficción distópica", type:"Novela", edition: "Edición crítica",cover: "https://via.placeholder.com/150" },
    { id: 14, title: "Mujercitas", author: "Louisa May Alcott", year: "1868", category: "Ficción", type:"Novela", edition: "Edición de tapa dura",cover: "https://via.placeholder.com/150" },
    { id: 15, title: "La insoportable levedad del ser", author: "Milan Kundera", year: "1984", category: "Ficción", type:"Novela", edition: "Edición especial con prólogo del autor",cover: "https://via.placeholder.com/150" },
    { id: 16, title: "Crónica de una muerte anunciada", author: "Gabriel García Márquez", year: "1981", category: "Ficción", type:"Novela", edition: "Edición de bolsillo",cover: "https://via.placeholder.com/150" },
    { id: 17, title: "El Hobbit", author: "J.R.R. Tolkien", year: "1937", category: "Ficción fantástica", type:"Novela", edition: "Edición de tapa blanda",cover: "https://via.placeholder.com/150" },
    { id: 18, title: "El retrato de Dorian Gray", author: "Oscar Wilde", year: "1890", category: "Ficción", type:"Novela", edition: "Edición de bolsillo",cover: "https://via.placeholder.com/150" },
    { id: 19, title: "El psicoanalista", author: "John Katzenbach", year: "2002", category: "Ficción", type:"Novela de suspense", edition: "Edición actualizada",cover: "https://via.placeholder.com/150" },
    { id: 20, title: "La tregua", author: "Mario Benedetti", year: "1960", category: "Ficción", type:"Novela", edition: "Edición de tapa dura",cover: "https://via.placeholder.com/150" },
    { id: 21, title: "1984", author: "George Orwell ", year: "1949", category: "Ficción distópica", type:"Novela", edition: "Primera edición",cover: "https://via.placeholder.com/150" },
  ];

  //let booksArray: Book[] = [];
  const [booksArray, setBooksArray] = useState<Book[]>([]);

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await axios.get('http://localhost:3001/documents/');
        const documents: Book[] = response.data;
        setBooksArray(documents);
      }catch(error){
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(()=>{
    console.log("add2");
    console.log(solicitudes);
    localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
  }, [solicitudes]);


  useEffect(()=>{
    //filtro autores
    authors = booksArray.map((book) => book.autor);
    let uniqueAuthorsToAssign = authors.filter((author, index) => authors.indexOf(author) === index);
    setUniqueAuthors(uniqueAuthorsToAssign);
    setTotalPages(Math.ceil(uniqueAuthors.length / authorsPerPage));
    startIndex = (currentPage - 1) * authorsPerPage;
    endIndex = (currentPage - 1) * authorsPerPage + authorsPerPage;

    currentAuthors = uniqueAuthors.slice(startIndex, endIndex); //Solo el primero con unique
    
    const firstColumn = uniqueAuthors.slice(0, 5);
    const secondColumn = uniqueAuthors.slice(5, 10);
    setFirstColumnAuthors(firstColumn);
    setSecondColumnAuthors(secondColumn);
    //fin filtro autores
    //filtro categorias
    categories = booksArray.map((book) => book.categoria);
    let uniqueCategoriesToAssign = categories.filter((category, index) => categories.indexOf(category) === index);
    setUniqueCategories(uniqueCategoriesToAssign);
    setTotalPagesCategories(Math.ceil(uniqueCategories.length / categoriesPerPage));
    startIndexCategory = (currentPageCategory - 1) * categoriesPerPage;
    endIndexCategory = startIndexCategory + categoriesPerPage;

    currentCategories = uniqueCategories.slice(startIndexCategory, endIndexCategory);
    
    const firstColumnCategories = uniqueCategories.slice(0, 5);
    const secondColumnCategories = uniqueCategories.slice(5, 10);
    setFirstColumnCategories(firstColumnCategories);
    setSecondColumnCategories(secondColumnCategories);
    

    //fin filtro categorias
    //filtro tipos
    types = booksArray.map((book) => book.tipo);
    let uniqueTypesToAssign = types.filter((type, index) => types.indexOf(type) === index);
    setUniqueTypes(uniqueTypesToAssign);
    setTotalPagesTypes(Math.ceil(uniqueTypes.length / typesPerPage));
    startIndexType = (currentPageType - 1) * typesPerPage;
    endIndexType = startIndexType + typesPerPage;

    currentTypes = uniqueTypes.slice(startIndexType, endIndexType);
    
    const firstColumnTypes = uniqueTypes.slice(0, 5);
    const secondColumnTypes = uniqueTypes.slice(5, 10);
    setFirstColumnTypes(firstColumnTypes);
    setSecondColumnTypes(secondColumnTypes);   
    //fin filtro tipos
    //filtro edicion
    editions = booksArray.map((book) => book.edicion);
    let uniqueEditionsToAssign = editions.filter((edition, index) => editions.indexOf(edition) === index);
    setUniqueEditions(uniqueEditionsToAssign);
    setTotalPagesEditions(Math.ceil(uniqueEditions.length / editionsPerPage));
    startIndexEdition = (currentPageEdition - 1) * editionsPerPage;
    endIndexEdition = startIndexEdition + editionsPerPage;

    currentEditions = uniqueEditions.slice(startIndexEdition, endIndexEdition);
    
    const firstColumnEditions = uniqueEditions.slice(0, 5);
    const secondColumnEditions = uniqueEditions.slice(5, 10);
    setFirstColumnEditions(firstColumnEditions);
    setSecondColumnEditions(secondColumnEditions);   
    //fin filtro edicion
    //filtro anios
    years = booksArray.map((book) => book.anio);
    let uniqueYearsToAssign = years.filter((year, index) => years.indexOf(year) === index);
    uniqueYearsToAssign.sort((b: string, a: string) => parseInt(b) - parseInt(a));
    setUniqueYears(uniqueYearsToAssign);
    minyear = uniqueYears[0];
    maxyear = uniqueYears[uniqueYears.length - 1];
    //fin filtro anios
  },[booksArray])
  

//FILTRO AUTOR
  let authors: string[];
  const [uniqueAuthors, setUniqueAuthors] = useState<string[]>([]);
  const [authorsPerPage,setAuthorsPerPage] = useState<number>(10);
  const [totalPages,setTotalPages] = useState<number>();
  let startIndex: number;
  let endIndex: number;
  let currentAuthors: string[];
  const [firstColumnAuthors, setFirstColumnAuthors] = useState<string[]>([]);
  const [secondColumnAuthors, setSecondColumnAuthors] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const handleNextPage = () => {  
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  useEffect(()=>{
    startIndex = (currentPage - 1) * authorsPerPage;
    endIndex = (currentPage - 1) * authorsPerPage + authorsPerPage;

    currentAuthors = uniqueAuthors.slice(startIndex, endIndex);
    
    const firstColumn = currentAuthors.slice(0, 5);
    const secondColumn = currentAuthors.slice(5, 10);
    setFirstColumnAuthors(firstColumn);
    setSecondColumnAuthors(secondColumn);
    startIndex = (currentPage - 1) * authorsPerPage;
    endIndex = startIndex + authorsPerPage;
  }, [currentPage]);

  

const handleAuthorCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const authorName = e.target.name;
  setSelectedAuthors((prevSelectedAuthors) => {
    if (prevSelectedAuthors.includes(authorName)) {
      // Si el autor ya estaba seleccionado, lo quitamos del arreglo
      return prevSelectedAuthors.filter((author) => author !== authorName);
    } else {
      // Si el autor no estaba seleccionado, lo agregamos al arreglo
      return [...prevSelectedAuthors, authorName];
    }
  });
};

const handleClearFilter = () => {
  setSelectedAuthors([]);
};
//FIN FILTRO AUTOr

//FILTRO CATEGORIA
  let categories: string[];
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [categoriesPerPage,setCategoriesPerPage] = useState<number>(10);
  const [totalPagesCategories,setTotalPagesCategories] = useState<number>();
  let startIndexCategory: number;
  let endIndexCategory: number;
  let currentCategories: string[];
  const [firstColumnCategories, setFirstColumnCategories] = useState<string[]>([]);
  const [secondColumnCategories, setSecondColumnCategories] = useState<string[]>([]);
  const [currentPageCategory, setCurrentPageCategory] = useState(1);
  useEffect(()=>{
    startIndexCategory = (currentPageCategory - 1) * categoriesPerPage;
    endIndexCategory = (currentPageCategory - 1) * categoriesPerPage + categoriesPerPage;

    currentCategories = uniqueCategories.slice(startIndexCategory, endIndexCategory);
    
    const firstColumnCategories = currentCategories.slice(0, 5);
    const secondColumnCategories = currentCategories.slice(5, 10);
    setFirstColumnCategories(firstColumnCategories);
    setSecondColumnCategories(secondColumnCategories);
    startIndexCategory = (currentPageCategory - 1) * categoriesPerPage;
    endIndexCategory = startIndexCategory + categoriesPerPage;
  }, [currentPageCategory]);
  const handleNextPageCategory = () => {
    setCurrentPageCategory((prevPage) => prevPage + 1);
  };
  
  const handlePrevPageCategory = () => {
    setCurrentPageCategory((prevPage) => prevPage - 1);
  };
const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

const handleCategoryCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const categoryName = e.target.name;
setSelectedCategories((prevSelectedCategories) => {
  if (prevSelectedCategories.includes(categoryName)) {
    // Si el autor ya estaba seleccionado, lo quitamos del arreglo
    return prevSelectedCategories.filter((category) => category !== categoryName);
  } else {
    // Si el autor no estaba seleccionado, lo agregamos al arreglo
    return [...prevSelectedCategories, categoryName];
  }
});
};

const handleClearFilterCategory = () => {
setSelectedCategories([]);
};
//FIN FILTRO categoria

//FILTRO tipo
  let types: string[];
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);
  const [typesPerPage,setTypesPerPage] = useState<number>(10);
  const [totalPagesTypes,setTotalPagesTypes] = useState<number>();
  let startIndexType: number;
  let endIndexType: number;
  let currentTypes: string[];
  const [firstColumnTypes, setFirstColumnTypes] = useState<string[]>([]);
  const [secondColumnTypes, setSecondColumnTypes] = useState<string[]>([]);
  const [currentPageType, setCurrentPageType] = useState(1);
  useEffect(()=>{
    startIndexType = (currentPageType - 1) * typesPerPage;
    endIndexType = (currentPageType - 1) * typesPerPage + typesPerPage;

    currentTypes = uniqueTypes.slice(startIndexType, endIndexType);
    
    const firstColumnTypes = currentTypes.slice(0, 5);
    const secondColumnTypes = currentTypes.slice(5, 10);
    setFirstColumnTypes(firstColumnTypes);
    setSecondColumnTypes(secondColumnTypes);
    startIndexType = (currentPageType - 1) * typesPerPage;
    endIndexType = startIndexType + typesPerPage;
  }, [currentPageType]);
  const handleNextPageType = () => {
    setCurrentPageType((prevPage) => prevPage + 1);
  };
  
  const handlePrevPageType = () => {
    setCurrentPageType((prevPage) => prevPage - 1);
  };
const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

const handleTypeCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const typeName = e.target.name;
setSelectedTypes((prevSelectedTypes) => {
  if (prevSelectedTypes.includes(typeName)) {
    // Si el autor ya estaba seleccionado, lo quitamos del arreglo
    return prevSelectedTypes.filter((type) => type !== typeName);
  } else {
    // Si el autor no estaba seleccionado, lo agregamos al arreglo
    return [...prevSelectedTypes, typeName];
  }
});
};

const handleClearFilterType = () => {
setSelectedTypes([]);
};
//FIN FILTRO tipo
//FILTRO edicion
let editions: string[];
  const [uniqueEditions, setUniqueEditions] = useState<string[]>([]);
  const [editionsPerPage,setEditionsPerPage] = useState<number>(10);
  const [totalPagesEditions,setTotalPagesEditions] = useState<number>();
  let startIndexEdition: number;
  let endIndexEdition: number;
  let currentEditions: string[];
  const [firstColumnEditions, setFirstColumnEditions] = useState<string[]>([]);
  const [secondColumnEditions, setSecondColumnEditions] = useState<string[]>([]);
  const [currentPageEdition, setCurrentPageEdition] = useState(1);
  useEffect(()=>{
    startIndexEdition = (currentPageEdition - 1) * editionsPerPage;
    endIndexEdition = (currentPageEdition - 1) * editionsPerPage + editionsPerPage;

    currentEditions = uniqueEditions.slice(startIndexEdition, endIndexEdition);
    
    const firstColumnEditions = currentEditions.slice(0, 5);
    const secondColumnEditions = currentEditions.slice(5, 10);
    setFirstColumnEditions(firstColumnEditions);
    setSecondColumnEditions(secondColumnEditions);
    startIndexEdition = (currentPageEdition - 1) * editionsPerPage;
    endIndexEdition = startIndexEdition + editionsPerPage;
  }, [currentPageEdition]);
  const handleNextPageEdition = () => {
    setCurrentPageEdition((prevPage) => prevPage + 1);
  };
  
  const handlePrevPageEdition = () => {
    setCurrentPageEdition((prevPage) => prevPage - 1);
  };
const [selectedEditions, setSelectedEditions] = useState<string[]>([]);

const handleEditionCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const editionName = e.target.name;
setSelectedEditions((prevSelectedEditions) => {
  if (prevSelectedEditions.includes(editionName)) {
    // Si el autor ya estaba seleccionado, lo quitamos del arreglo
    return prevSelectedEditions.filter((edition) => edition !== editionName);
  } else {
    // Si el autor no estaba seleccionado, lo agregamos al arreglo
    return [...prevSelectedEditions, editionName];
  }
});
};

const handleClearFilterEdition = () => {
setSelectedEditions([]);
};
//FIN FILTRO edicion
//FILTRO AÑOS
let years: string[];
//let uniqueYears: string[];
let minyear: string='1000';
let maxyear: string='2024';

const [uniqueYears, setUniqueYears] = useState<string[]>([]);

const [minYear, setMinYear] = useState(minyear);
const [maxYear, setMaxYear] = useState(maxyear);

const handleClearFilters = () => {
  setMinYear(minyear);
  setMaxYear(maxyear);
};
//FIN FILTRO AÑOS





  function filterBooks() {
    const filteredBooks = booksArray.filter((book) => {
      if (filterBy === "title") {
        return book.titulo.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (filterBy === "author") {
        if (selectedAuthors.length === 0) {
          return true;
        }
        return selectedAuthors.includes(book.autor);
      } else if (filterBy === "year") {
        if (minYear === "") {
          setMinYear(minyear); // ¡No estoy seguro de qué debería hacer aquí!
        }
        if (maxYear === "") {
          setMaxYear(maxyear); // ¡No estoy seguro de qué debería hacer aquí!
        }
        return (
          parseInt(book.anio) >= parseInt(minYear) &&
          parseInt(book.anio) <= parseInt(maxYear)
        );
      } else if (filterBy === "category") {
        if (selectedCategories.length === 0) {
          return true;
        }
        return selectedCategories.includes(book.categoria);
      } else if (filterBy === "type") {
        if (selectedTypes.length === 0) {
          return true;
        }
        return selectedTypes.includes(book.tipo);
      } else if (filterBy === "edition") {
        if (selectedEditions.length === 0) {
          return true;
        }
        return selectedEditions.includes(book.edicion);
      } else {
        return true;
      }
    });
  
    return filteredBooks;
  }

  return (
    <div className="book-container">
    <Container>
      <Row>
        <Col xs={12}>
          <InputGroup className="mt-3">
          <Form.Select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}
          style={{ backgroundColor: '#F5F5F5', color: '#012840' }}
          >
  <option value="">Filtrar por...</option>
  <option value="title">Título</option>
  <option value="author" >Autor</option>
  <option value="year">Año</option>
  <option value="category">Categoría</option>
  <option value="type">Tipo</option>
  <option value="edition">Edición</option>
</Form.Select>
          </InputGroup>
        </Col>
      </Row>



      <Row>
          <InputGroup className="mt-3">

  {filterBy === "title" && (
  <InputGroup className="mt-3">
    <Col xs={8}>
    <FormControl
              type="text"
              className="my-form-control"
              placeholder="Buscar libros"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
    </Col>
    <Col xs={4} className="my-col-button">
    <Button variant="primary" className="my-custom-button" onClick={() => setSearchTerm("")}>Limpiar filtro</Button>

            </Col>
            </InputGroup>
)}
{filterBy === "author" &&(
  <InputGroup className="mt-3">
    
    <Col xs={8} className="my-col">
      {/* Agregar las dos columnas de autores */}
      
      <Row>
        <Col>
          {firstColumnAuthors.map((author) => (
            <Form.Check
              type="checkbox"
              label={author}
              key={author}
              style={{color: '#012840'}}
              name={author} // Agrega el nombre del autor al checkbox
              checked={selectedAuthors.includes(author)} // Checa si el autor está seleccionado
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAuthorCheckboxChange(e)}
            />
          ))}
        </Col>
        <Col>
          {secondColumnAuthors.map((author) => (
            <Form.Check
              type="checkbox"
              label={author}
              key={author}
              style={{color: '#012840'}}
              name={author} // Agrega el nombre del autor al checkbox
              checked={selectedAuthors.includes(author)} // Checa si el autor está seleccionado
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAuthorCheckboxChange(e)}
            />
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="outline-primary"
            className="my-custom-button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>{" "}
          <Button
            variant="outline-primary"
            className="my-custom-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
        </Col>
      </Row>
    </Col>
    
    <Col xs={4} className="my-col-button">
    <Button variant="primary" className="my-custom-button" onClick={handleClearFilter}>Limpiar filtro</Button>
    </Col>
    
  </InputGroup>
)}
{filterBy === "category" && (
  <InputGroup className="mt-3">
    <Col xs={8} className="my-col">
      {/* Agregar las dos columnas de autores */}
      <Row>
        <Col>
          {firstColumnCategories.map((category) => (
            <Form.Check
              type="checkbox"
              label={category}
              key={category}
              style={{color: '#012840'}}
              name={category} // Agrega el nombre del autor al checkbox
              checked={selectedCategories.includes(category)} // Checa si el autor está seleccionado
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCategoryCheckboxChange(e)}
            />
          ))}
        </Col>
        <Col>
          {secondColumnCategories.map((category) => (
            <Form.Check
              type="checkbox"
              label={category}
              key={category}
              style={{color: '#012840'}}
              name={category} // Agrega el nombre del autor al checkbox
              checked={selectedCategories.includes(category)} // Checa si el autor está seleccionado
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCategoryCheckboxChange(e)}
            />
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="outline-primary"
            className="my-custom-button"
            onClick={handlePrevPageCategory}
            disabled={currentPageCategory === 1}
          >
            Anterior
          </Button>{" "}
          <Button
            variant="outline-primary"
            className="my-custom-button"
            onClick={handleNextPageCategory}
            disabled={currentPageCategory === totalPagesCategories}
          >
            Siguiente
          </Button>
        </Col>
      </Row>
    </Col>
    <Col xs={4} className="my-col-button">
    <Button variant="primary" className="my-custom-button" onClick={handleClearFilterCategory}>Limpiar filtro</Button>
    </Col>
  </InputGroup>
)}
{filterBy === "type" && (
  <InputGroup className="mt-3">
    <Col xs={8} className="my-col">
      {/* Agregar las dos columnas de autores */}
      <Row>
        <Col>
          {firstColumnTypes.map((type) => (
            <Form.Check
              type="checkbox"
              label={type}
              key={type}
              style={{color: '#012840'}}
              name={type} // Agrega el nombre del autor al checkbox
              checked={selectedTypes.includes(type)} // Checa si el autor está seleccionado
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTypeCheckboxChange(e)}
            />
          ))}
        </Col>
        <Col>
          {secondColumnTypes.map((type) => (
            <Form.Check
              type="checkbox"
              label={type}
              key={type}
              style={{color: '#012840'}}
              name={type} // Agrega el nombre del autor al checkbox
              checked={selectedTypes.includes(type)} // Checa si el autor está seleccionado
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTypeCheckboxChange(e)}
            />
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="outline-primary"
            className="my-custom-button"
            onClick={handlePrevPageType}
            disabled={currentPageType === 1}
          >
            Anterior
          </Button>{" "}
          <Button
            variant="outline-primary"
            className="my-custom-button"
            onClick={handleNextPageType}
            disabled={currentPageType === totalPagesTypes}
          >
            Siguiente
          </Button>
        </Col>
      </Row>
    </Col>
    <Col xs={4} className="my-col-button">
    <Button variant="primary" className="my-custom-button" onClick={handleClearFilterType}>Limpiar filtro</Button>
    </Col>
  </InputGroup>
)}
{filterBy === "edition" && (
  <InputGroup className="mt-3">
    <Col xs={8} className="my-col">
      {/* Agregar las dos columnas de autores */}
      <Row>
        <Col>
          {firstColumnEditions.map((edition) => (
            <Form.Check
              type="checkbox"
              label={edition}
              key={edition}
              style={{color: '#012840'}}
              name={edition} // Agrega el nombre del autor al checkbox
              checked={selectedEditions.includes(edition)} // Checa si el autor está seleccionado
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditionCheckboxChange(e)}
            />
          ))}
        </Col>
        <Col>
          {secondColumnEditions.map((edition) => (
            <Form.Check
              type="checkbox"
              label={edition}
              key={edition}
              style={{color: '#012840'}}
              name={edition} // Agrega el nombre del autor al checkbox
              checked={selectedEditions.includes(edition)} // Checa si el autor está seleccionado
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditionCheckboxChange(e)}
            />
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="outline-primary"
            className="my-custom-button"
            onClick={handlePrevPageEdition}
            disabled={currentPageEdition === 1}
          >
            Anterior
          </Button>{" "}
          <Button
            variant="outline-primary"
            className="my-custom-button"
            onClick={handleNextPageEdition}
            disabled={currentPageEdition === totalPagesEditions}
          >
            Siguiente
          </Button>
        </Col>
      </Row>
    </Col>
    <Col xs={4} className="my-col-button">
    <Button variant="primary" className="my-custom-button" onClick={handleClearFilterEdition}>Limpiar filtro</Button>
    </Col>
  </InputGroup>
)}
        {filterBy === "year" && (
  <InputGroup className="mt-3">
    <Col xs={4}>
    <Form.Select className="me-2" value={minYear} onChange={(e) => setMinYear(e.target.value)}
    style={{ backgroundColor: '#FEF4E3', color: '#012840' }}>
    <option value="">Desde</option>
    {uniqueYears.map((year) => (
      <option value={year} key={year}>{year}</option>
    ))}
  </Form.Select>
    </Col>
    <Col xs={4}>
    <Form.Select className="ms-2" value={maxYear} onChange={(e) => setMaxYear(e.target.value)}
    style={{ backgroundColor: '#FEF4E3', color: '#012840' }}>
    <option value="">Hasta</option>
    {uniqueYears.map((year) => (
      <option value={year} key={year}>{year}</option>
    ))}
  </Form.Select>
    </Col>
    <Col xs={4} className="my-col-button">
                  <Button variant="primary" className="my-custom-button" onClick={handleClearFilters}>
                Limpiar filtro
                  </Button>
            </Col>
            </InputGroup>
)}

          </InputGroup>        
      </Row>


      <Row>
      {booksArray.length > 0 ? (
        filterBooks().map((book) => (
            <Col xs={12} sm={6} md={4} key={book._id}>
              <br />
              <Card 
                className="modal-content"
                style={{ cursor: "pointer" }} // Agrega un estilo para que la card sea clickeable
                onClick={() => handleOpenModal(book)}
                /*<Card.Img variant="top" src={book[0].cover} /> */
              >
                <Row noGutters={true}>
                  <Col xs={4}>
                  <Card.Img variant="top" src={book.imagen} />
                  </Col>
                  <Col xs={8}>
                    <Card.Body>
                      <Card.Title>{book.titulo}</Card.Title>
                      <Card.Text>
                        <strong>Autor:</strong> {book.autor}
                        <br />
                        <strong>Año:</strong> {book.anio}
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
              <br />
            </Col>
          ))
      ) : (
        <p>No se encontraron libros.</p>
      )
        }
        </Row>
    </Container>

    <Modal show={showModal} onHide={handleCloseModal} centered>
  {/* Contenido del modal con los detalles del libro */}
  {selectedBook && (
    <>
      <Modal.Header closeButton className="modal-content">
        <Modal.Title>{selectedBook.titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={4}>
              <img src={selectedBook.imagen} alt={selectedBook.titulo} className="img-fluid" />
            </Col>
            <Col xs={8}>
              <strong>Autor:</strong> {selectedBook.autor}
              <br />
              <strong>Año:</strong> {selectedBook.anio}
              <br />
              <strong>Categoría:</strong> {selectedBook.categoria}
              <br />
              <strong>Tipo:</strong> {selectedBook.tipo}
              <br />
              <strong>Edición:</strong> {selectedBook.edicion}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" className= "my-custom-button" onClick={() => handleAddToSolicitud(selectedBook)}>Agregar</Button>
        <Button variant="secondary" onClick={handleCloseModal}>Volver</Button>
      </Modal.Footer>
    </>
  )}
</Modal>
    </div>
  );
};

export default LibraryCatalog;

