/*import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  background-color: #f8f9fa;
  border: none;
  font-family: 'Arial, sans-serif';
  text-align: center;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AboutUs = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <StyledCard>
            <Card.Body>
              <Card.Title as="h2">About BookVault Library</Card.Title>
              <Card.Text>
                Welcome to BookVault Library! We are dedicated to providing easy access to a wide range of books and resources for all book lovers and researchers. Our online platform allows you to rent books from the comfort of your home and have them delivered right to your doorstep.
              </Card.Text>
              <Card.Text>
                <strong>Our Mission:</strong> Our mission is to foster a love for reading and lifelong learning by making books more accessible to everyone.
              </Card.Text>
              <Card.Text>
                <strong>Our Vision:</strong> We envision a world where everyone has the opportunity to access the knowledge and entertainment that books provide, regardless of their location or financial status.
              </Card.Text>
              <Card.Text>
                <strong>Contact Us:</strong> If you have any questions or need assistance, please don't hesitate to contact us at support@bookvault.com.
              </Card.Text>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
*/

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>About BookVault</h2>
          <p>
            BookVault is a comprehensive library management system designed to streamline library operations
            and enhance user experience. It integrates modern technologies such as React for the frontend,
            Node.js for the server, PostgreSQL for the database, and Rasa an Open Source Conversational AI.
          </p>
          <h3>Technologies Used</h3>
          <ul>
            <li>Frontend: React, React Bootstrap</li>
            <li>Backend: Node.js</li>
            <li>Database: PostgreSQL</li>
            <li>Conversational AI: Rasa</li>
          </ul>
          <h3>Features</h3>
          <ul>
            <li>Inventory management</li>
            <li>User authentication and account management</li>
            <li>Borrowing and returning books</li>
            <li>Integration of a chatbot for user support</li>
          </ul>
          <h3>Design and User Experience</h3>
          <p>
            BookVault prioritizes a responsive and intuitive user interface built with React and Bootstrap,
            ensuring a seamless experience for library staff and patrons.
          </p>
          <h3>Team</h3>
          <p>
            The BookVault project was developed by a dedicated team of developers, designers, and project managers,
            committed to delivering a robust library management solution.
          </p>
          <h3>Contact Us</h3>
          <p>
            For inquiries or support, please contact us at <a href="mailto:info@bookvault.com">info@bookvault.com</a>.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
