import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';
import carouselImage1 from "../Assets/carouselImage1.png";
import carouselImage2 from "../Assets/carouselImage2.png";
import carouselImage3 from "../Assets/carouselImage3.png";

// Styled components for the page layout
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  max-width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  margin-top: -50px; /* Adjust this value as needed */
`;

const Content = styled.div`
  text-align: center;
  color: white;
`;

const Heading = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
`;

const Home = () => {
  return (
    <Container>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carouselImage1}
            alt="First slide"
          />
          <Carousel.Caption>
            <Content>
              <Heading>Welcome to BookVault Library</Heading>
              <Subtitle>
                Rent books online.
              </Subtitle>
            </Content>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carouselImage2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <Content>
              <Heading></Heading>
            </Content>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carouselImage3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <Content>
              <Heading></Heading>
            </Content>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default Home;
