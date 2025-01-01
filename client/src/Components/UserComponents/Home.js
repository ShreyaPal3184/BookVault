import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Carousel from "./Carousel";
import Cards from "./Cards";
import HowItWorks from './HowItWorks';
import aboutUsImage from '../../Assets/aboutUsImage.png'; 

// Styled component for the section heading
const SectionHeading = styled.h1`
  text-align: center;
  margin-top: 60px; /* Adjust this value to add space above the heading */
  margin-bottom: 30px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 400px; /* Adjust this value to set the maximum width of the image */
  float: right; /* Shift the image to the right */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Adjust this value to add space above the button */
`;

const Home = () => {
  return (
    <div>
      <Carousel />
      <Container>
        <SectionHeading>About Us</SectionHeading>
        <Row className="align-items-center">
          <Col md={6}>
            <h5 style={{ textAlign: 'center' }}>
              Welcome to BookVault Library! We are dedicated to providing easy access to a wide range of books and resources for all book lovers and researchers. Our online platform allows you to rent books from the comfort of your home and have them delivered right to your doorstep.
            </h5>
            <ButtonContainer>
              <Button as={Link} to="/about" variant="primary">
                Read More
              </Button>
            </ButtonContainer>
          </Col>
          <Col md={6}>
            <StyledImage src={aboutUsImage} alt="About Us" />
          </Col>
        </Row>
      </Container>
      <SectionHeading>Our Services</SectionHeading>
      <Cards />
      <SectionHeading>How It Works</SectionHeading>
      <HowItWorks />
    </div>
  );
};

export default Home;
