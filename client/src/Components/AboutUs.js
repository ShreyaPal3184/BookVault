import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  background-color: #f8f9fa; /* Light background */
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
