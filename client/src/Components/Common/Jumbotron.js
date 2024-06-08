
import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import boatImage from '../../Assets/boatImage.png';

const Styles = styled.div`
  .jumbo {
    background: url(${boatImage}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
  }
  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

export const Jumbotron = () => (
  <Styles>
    {/* <Jumbo fluid className='jumbo'> */}
    <div fluid class="jumbo">
      <div className='overlay' />
      <Container>
        <h1>Welcome To BookVault</h1>
        <p>A Library Management System</p>
      </Container>
    {/* </Jumbo> */}
    </div>
  </Styles>
);
