import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

// Styled components
const Header = styled.header`
  text-align: center;
  background-color: #007bff;
  padding: 30px;
  color: white;
  border-bottom: 3px solid #0056b3;
`;

const Section = styled.section`
  padding: 30px;
  margin-bottom: 30px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #007bff;
  border-bottom: 3px solid #007bff;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 24px;
`;

const StyledCard = styled(Card)`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const CardTitle = styled(Card.Title)`
  color: #007bff;
  font-size: 20px;
`;

const ListGroupItem = styled(ListGroup.Item)`
  border: none;
  padding: 10px 15px;
`;

const AboutUs = () => {
  return (
    <Container>
      <Header>
        <h1>About Us</h1>
      </Header>
      <Row>
        <Col md={12}>
          <Section>
            <SectionTitle>Welcome to BookVault</SectionTitle>
            <p>
              At BookVault, we are redefining the library experience with our innovative library management system. Our platform is designed to streamline and enhance the way you manage and utilize library resources. We believe in combining modern technology with a user-centric approach to make managing book rentals and returns easier than ever before.
            </p>
          </Section>
        </Col>
        <Col md={12}>
          <Section>
            <SectionTitle>What We Do</SectionTitle>
            <p>
              <strong>BookVault</strong> is a cutting-edge library management system that simplifies and enhances the library experience. With features like user registration, book rentals, and returns, our platform provides a seamless and efficient way for users and administrators to interact with library resources. Our goal is to reduce the time, space, and costs associated with traditional library operations while offering a modern, intuitive web interface.
            </p>
          </Section>
        </Col>
        <Col md={12}>
          <Section>
            <SectionTitle>Our Technology Stack</SectionTitle>
            <Row>
              <Col md={12}>
                <StyledCard>
                  <Card.Body>
                    <CardTitle>Client Side</CardTitle>
                    <ListGroup variant="flush">
                      <ListGroupItem><strong>React:</strong> A JavaScript library for building user interfaces.</ListGroupItem>
                      <ListGroupItem><strong>React Bootstrap:</strong> A front-end framework with pre-styled components.</ListGroupItem>
                      <ListGroupItem><strong>Styled Components:</strong> For writing scoped CSS in JavaScript.</ListGroupItem>
                      <ListGroupItem><strong>React Router Dom:</strong> For handling routing in React applications.</ListGroupItem>
                      <ListGroupItem><strong>Axios:</strong> For sending asynchronous HTTP requests.</ListGroupItem>
                      <ListGroupItem><strong>React Toastify:</strong> For displaying toast notifications.</ListGroupItem>
                    </ListGroup>
                  </Card.Body>
                </StyledCard>
              </Col>
              <Col md={12}>
                <StyledCard>
                  <Card.Body>
                    <CardTitle>Rasa Chatbot</CardTitle>
                    <ListGroup variant="flush">
                      <ListGroupItem><strong>Rasa:</strong> An open-source framework for building conversational AI.</ListGroupItem>
                      <ListGroupItem>Includes YAML files for training data, responses, and dialogue management.</ListGroupItem>
                      <ListGroupItem>Customizable and complex chatbot functionalities.</ListGroupItem>
                    </ListGroup>
                  </Card.Body>
                </StyledCard>
              </Col>
              <Col md={12}>
                <StyledCard>
                  <Card.Body>
                    <CardTitle>Server Side</CardTitle>
                    <ListGroup variant="flush">
                      <ListGroupItem><strong>Node.js:</strong> A JavaScript runtime for server-side scripting.</ListGroupItem>
                      <ListGroupItem><strong>ExpressJS:</strong> A minimal and flexible Node.js web application framework.</ListGroupItem>
                      <ListGroupItem><strong>Middleware:</strong> For handling request-response cycles.</ListGroupItem>
                      <ListGroupItem><strong>Authentication:</strong> Advanced hashing with bcrypt for secure password storage.</ListGroupItem>
                    </ListGroup>
                  </Card.Body>
                </StyledCard>
              </Col>
              <Col md={12}>
                <StyledCard>
                  <Card.Body>
                    <CardTitle>Database</CardTitle>
                    <ListGroup variant="flush">
                      <ListGroupItem><strong>PostgreSQL:</strong> An open-source object-relational database for reliable and scalable data management.</ListGroupItem>
                      <ListGroupItem>Supports advanced SQL features and extensibility for complex data tasks.</ListGroupItem>
                      <ListGroupItem>Uses Multi-Version Concurrency Control (MVCC) to enable concurrent access and maintain transaction integrity.</ListGroupItem>
                    </ListGroup>
                  </Card.Body>
                </StyledCard>
              </Col>
            </Row>
          </Section>
        </Col>
        <Col md={12}>
          <Section>
            <SectionTitle>Our Mission</SectionTitle>
            <p>
              Our mission is to revolutionize the library management system by providing a comprehensive, user-friendly approach. We aim to make library management more accessible and efficient for everyone.
            </p>
          </Section>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
