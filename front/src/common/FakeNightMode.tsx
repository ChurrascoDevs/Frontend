import React, { useState } from 'react';
import {Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './FakeNightMode.css';

function FakeNighMode() {
  const [NightModeState, setNightModeState] = useState(true);

  const handleModeChange=()=>{
    setNightModeState(!NightModeState)
  };

    return (
      <Container fluid>
        <Form>
          <Form.Check // prettier-ignore
            type="switch"
            id="DayNightModeButton"
            label="DEV FAKE NIGH MODE"
            defaultChecked={NightModeState}
            onChange={handleModeChange}
          />
        </Form>
        <Container fluid className='FakeNightMode' style={{opacity: NightModeState? 1:0}}></Container>
      </Container>
    );
  }

export default FakeNighMode;