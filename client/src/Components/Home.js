import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Carousel from "./UserComponents/Carousel";
import ServiceCards from "./UserComponents/ServiceCards";
import HowItWorks from "./UserComponents/HowItWorks";
import aboutUsImage from "../Assets/aboutUsImage.png";
import heroImage from "../Assets/carouselImage1.png";
import TopRentedBooks from "./UserComponents/TopRentedBooks";

const HeroSection = styled.section`
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 80vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 768px) {
    height: 70vh;
    background-attachment: scroll;
    padding: 20px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Opacity layer */
    z-index: 1;
  }
`;

const HeroText = styled.div`
  position: relative;
  z-index: 2;
  color: #fff;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubTitle = styled.p`
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SectionHeading = styled.h1`
  text-align: center;
  margin: 20px 0 30px;
  font-size: 3rem;
  font-weight: bold;
`;

const AboutSection = styled.section`
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 15px;
  }
`;

const AboutText = styled.div`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #333;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const AboutColumn = styled(Col)`
  margin-bottom: 30px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const StyledButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  font-size: 1.4rem;
  color: #007bff;
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
    text-decoration: none;
  }
`;

const CTAContainer = styled.div`
  background: linear-gradient(to right, #6b8dfd, rgb(220, 113, 151));
  padding: 50px 20px;
  text-align: center;
  border-radius: 16px;
  color: white;
  margin: 80px auto 0;
  max-width: 70vw;

  @media (max-width: 768px) {
    padding: 50px 15px;
    border-radius: 12px;
  }
`;

const CTAHeading = styled.h2`
  font-size: 2.8rem;
  color: #ffffff;
  margin-bottom: 20px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  max-width: 800px;
  margin: 0 auto 30px auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled.button`
  background: white;
  color: #003366;
  border: none;
  padding: 12px 25px;
  font-size: 1rem;
  border-radius: 25px;
  margin: 20px auto 0;
  cursor: pointer;
  font-weight: 600;
  display: inline-block;
  transition: background 0.3s;

  &:hover {
    background: #f0f0f0;
  }

`;



const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", margin: 0, padding: 0 }}>
      {/* <Carousel /> */}

      <HeroSection>
        <HeroText>
          <Title>BookVault</Title>
          <SubTitle>Rent books online from the comfort of your home</SubTitle>
        </HeroText>
      </HeroSection>

      <AboutSection>
        <Container>
          <Row className="align-items-center">
            <AboutColumn md={6} className="text-center">
              <StyledImage src={aboutUsImage} alt="About Us" />
            </AboutColumn>
            <AboutColumn md={6}>
              <AboutText>
                <p>
                  Welcome to <strong>BookVault Library</strong>! We are
                  dedicated to providing easy access to a wide range of books
                  and resources for book lovers and researchers. Our online
                  platform lets you rent books from the comfort of your home and
                  have them delivered to your doorstep.
                </p>
              </AboutText>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <StyledButton to="/about">Read More →</StyledButton>
              </div>
            </AboutColumn>
          </Row>
        </Container>
      </AboutSection>

      <ServiceCards />

      <TopRentedBooks />

      <HowItWorks />

      <CTAContainer>
      <CTAHeading>Ready to Find Your Next Read?</CTAHeading>
      <CTADescription>Explore our vast library and rent your favorite books in just a few clicks!</CTADescription>
      <CTAButton onClick={() => navigate('/books')}>
        Browse Books
      </CTAButton>
    </CTAContainer>
    </div>
  );
};

export default Home;
