/*import React from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import Chatbot from './Chatbot';

const StyledImage = styled.img`
  .img-fluid {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
  }
`;

export const Home = () => (
  <div>
    <div className='row'>
      <Col sm={7}>
        <img
          className='img-fluid'
          src={require('./Assets/bookStack.png')}
          alt='ReactHunt'
        />
      </Col>
      <Col sm={5}>
        <h2>BookVault</h2>
        <Chatbot />
      </Col>
    </div>
  </div>
);
*/

import React, { useState } from 'react';
import { Col, Modal, Button } from 'react-bootstrap'; // Assuming you have Bootstrap for React installed
import styled from 'styled-components';
import Chatbot from './Chatbot';

const StyledImage = styled.img`
  .img-fluid {
    max-width: 100%;
    height: auto;
    margin-top: 20px;
  }
`;

export const Home = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const openChatbot = () => setShowChatbot(true);
  const closeChatbot = () => setShowChatbot(false);

  return (
    <div>
      <div className='row'>
        <Col sm={7}>
          <img
            className='img-fluid'
            src={require('./Assets/bookStack.png')}
            alt='ReactHunt'
          />
        </Col>
        <Col sm={5}>
          <h2>BookVault</h2>
          
        </Col>
      </div>
    </div>
  );
};

export default Home;
