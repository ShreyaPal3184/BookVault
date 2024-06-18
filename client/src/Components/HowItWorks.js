import React from 'react';
import styled from 'styled-components';

// Styled component for the container
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

// Styled component for each individual point
const Point = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start; /* Align items at the start */
`;

// Styled component for the blue circle containing the point number
const PointNumber = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff; /* White text color */
  background-color: #007bff; /* Blue background */
  width: 24px; /* Size of the circle */
  height: 24px;
  border-radius: 50%; /* Rounded shape */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px; /* Spacing between circle and heading */
`;

// Styled component for the point heading
const PointHeading = styled.h3`
  font-size: 1.1rem;
  color: #007bff; /* Blue color for the heading */
  margin: 0; /* Remove default margin */
`;

// Styled component for the point description
const PointDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const HowItWorks = () => {
  return (
    <Container>
      <Point>
        <PointNumber>1</PointNumber>
        <div>
          <PointHeading>Register or Login</PointHeading>
          <PointDescription>
            To become a user of BookVault library, you must register yourself. After registering, login.
          </PointDescription>
        </div>
      </Point>
      <Point>
        <PointNumber>2</PointNumber>
        <div>
          <PointHeading>Browse for books to rent</PointHeading>
          <PointDescription>
            We have a large collection of books. Browse the books to find your favourite.
          </PointDescription>
        </div>
      </Point>
      <Point>
        <PointNumber>3</PointNumber>
        <div>
          <PointHeading>View your rented books on MyBooks</PointHeading>
          <PointDescription>
            Click on MyBooks to view your rented books.
          </PointDescription>
        </div>
      </Point>
      <Point>
        <PointNumber>4</PointNumber>
        <div>
          <PointHeading>Return books</PointHeading>
          <PointDescription>
            Go to MyBooks section and click on the 'Return' button to return the rented books.
          </PointDescription>
        </div>
      </Point>
    </Container>
  );
};

export default HowItWorks;
