import React from 'react';
import styled from 'styled-components';
import Carousel from "./Components/Carousel";
import Cards from "./Components/Cards";
import HowItWorks from './Components/HowItWorks';

// Styled component for the section heading
const SectionHeading = styled.h1`
  text-align: center;
  margin-top: 60px; /* Adjust this value to add space above the heading */
`;

const Home = () => {
  return (
    <div>
      <Carousel />
      <SectionHeading>Our Services</SectionHeading>
      <Cards />
      <SectionHeading>How It Works</SectionHeading>
      <HowItWorks />
    </div>
  );
};

export default Home;
