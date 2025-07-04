import React from 'react';
import styled from 'styled-components';

// Wrapper for the full section
const SectionWrapper = styled.section`
   padding: 50px 20px;
`;

// Centralized container
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px;
`;

// Title for section
const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  color: #000000;
  margin-bottom: 30px;
  font-weight: 600;
`;

// Wrapper for each step
const Step = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

// Circle or icon
const StepNumber = styled.div`
  background-color: #007bff;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

// Text block
const StepContent = styled.div`
  max-width: 800px;
`;

// Heading
const StepHeading = styled.h3`
  color: #007bff;
  font-size: 1.3rem;
  margin-bottom: 8px;
`;

// Description
const StepDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
`;

const HowItWorks = () => {
  const steps = [
    {
      title: 'Register or Login',
      description: 'Create an account to start your BookVault journey. Once registered, simply log in to access your dashboard.',
    },
    {
      title: 'Browse for Books',
      description: "Head to the 'Books' section to explore our wide collection and find your next great read.",
    },
    {
      title: 'Rent Your Favorite Books',
      description: "Click 'Rent' on any book you'd like to borrow. It's added to your rented list instantly.",
    },
    {
      title: 'Manage Rented Books',
      description: "Use the 'MyBooks' section to track current rentals, due dates, and return them when you're done.",
    },
    {
      title: 'Chat with Rasa Assistant',
      description: "Need help? Use our integrated Rasa chatbot via the 'Chat' button for support or queries.",
    },
    {
      title: 'Admin Login',
      description: "Admins can log in via the Admin portal to access powerful management tools.",
    },
    {
      title: 'Manage Users & Books',
      description: "Admins can add/edit/remove books, manage user accounts, and monitor all book rentals.",
    }
  ];

  return (
    <SectionWrapper>
      <Container>
        <SectionTitle>How It Works</SectionTitle>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepNumber>{index + 1}</StepNumber>
            <StepContent>
              <StepHeading>{step.title}</StepHeading>
              <StepDescription>{step.description}</StepDescription>
            </StepContent>
          </Step>
        ))}
      </Container>
    </SectionWrapper>
  );
};

export default HowItWorks;
