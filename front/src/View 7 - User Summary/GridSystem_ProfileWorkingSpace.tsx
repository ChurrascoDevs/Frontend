import React, { useRef, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { ArrowBarRight, ArrowBarLeft } from 'react-bootstrap-icons';
import './GridSystem_ProfileWorkingSpace.css';
import UserProfile from './common/UserProfile';
import Results from './common/Results';
import { Filters } from './common/Filters';


const GridSystem_ProfileWorkSpace = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  //Transpaso de información de filtros
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [stateFilter, setStateFilter] = useState("Todos");
  const [termFilter, setTermFilter] = useState("");


  //just for dynamic filter swap when sx
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  
  // user rol
  const [user, setUser] =  useState("Bibliotecario");
  const userID =  "6486ae65a3871d9b4faf83e0";


  const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleFilterChange = (categoryFilter: string, stateFilter: string, termFilter: string) => {
    setCategoryFilter(categoryFilter);
    setStateFilter(stateFilter);
    setTermFilter(termFilter);
  };

  const leftColumnSize = isCollapsed || windowSize.current[0]<576 ? 1 : 3;

  const filterContent = isCollapsed ? 
    <div className='left-column-collapsed' onClick={handleCollapseClick}>
      <ArrowBarRight width={"100%"} height={"60%"}/>
      <h5 className='left-column-collapsed-text'>Filtros</h5>
    </div> : 
    <div className="left-column">
      {windowSize.current[0]>576 ?
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button onClick={handleCollapseClick} variant="secondary" size="sm">
            Cerrar filtros
          <ArrowBarLeft size={20} style={{marginLeft:"10px"}}/>
        </Button>
        </Col>
      </Row>
      :<br></br>}
      <Filters onFilterChange={handleFilterChange}/>
    </div>;

  return (
    <Container>
      <Row className="animated-row">
        <Col>
          <div className="full-width-box">
            <Card.Link onClick={()=>
              user==="Bibliotecario"? setUser("Administrativo"): 
              user==="Administrativo"? setUser("Cliente biblioteca"): setUser("Bibliotecario")}>
                [ DEV - click para cambiar usuario: ADMINISTRATIVO | CLIENTE | BIBLIOTECARIO ] 
            </Card.Link>
            <UserProfile rol = {user} userID={userID}></UserProfile>
          </div>
        </Col>
      </Row>
      <Row className="animated-row work-space-container">
        <Col className='left-column' md={leftColumnSize}>
          {filterContent}
        </Col>
        <Col className="right-column">
          <div className="right-column">
            <div className="blank-div">
              <Results rol = {user} userID={userID} filters={{stateFilter , categoryFilter, termFilter}}></Results>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GridSystem_ProfileWorkSpace;
