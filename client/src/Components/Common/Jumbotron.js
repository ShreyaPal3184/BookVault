
import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import libraryImage from '../../Assets/libraryImage.png';

const Styles = styled.div`
  .jumbo {
    background: url(${libraryImage}) no-repeat center;
    background-size: cover;
    color: #efefef;
    height: 300px;
    position: relative;
    z-index: -2;
  }
  .overlay {
    background-color: #000; 
    opacity: 0;
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
        <p>Rent books</p>
      </Container>
    {/* </Jumbo> */}
    </div>
  </Styles>
);
