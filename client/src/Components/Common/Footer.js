import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
const Styles = styled.div`
  .footerlayout {
    background: #5AB2FF;
    color: #797979;
    margin: 40px 0 0 0;
    text-align: center;
    padding: 10px;
    background: linear-gradient(-225deg, #007bff 0%, #B8DCFF 48%, #6BBBFF 100%); /* Blue gradient matching #007bff */
  }
  .footerlayout p {
    margin: 0;
  }
`;

export const Footer = () => (
  <Styles>
    <div className='footerlayout'>
      <Container>
        <p>© 2024 BookVault. All rights reserved </p>
      </Container>
    </div>
  </Styles>
);
