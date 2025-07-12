import React from "react";
import styled from "styled-components";
import userIcon from "../../Assets/BookVault_Logo.png";
import bookIcon from "../../Assets/BookVault_Logo.png";
import myBooksIcon from "../../Assets/BookVault_Logo.png";
import adminIcon from "../../Assets/BookVault_Logo.png";

const CardContainer = styled.div`
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

const HeadingWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`;

const Heading = styled.h2`
  font-size: 3rem;
  color:rgb(0, 0, 0);
  font-weight: 600;
  margin: 0;
`;


const Card = styled.div`
  width: 300px;
  background-color: #fff;
  border-radius: 12px;
  padding: 25px 20px;
  text-align: left;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Icon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
`;

const CardHeading = styled.h3`
  color: rgb(0, 38, 79);
  margin-bottom: 15px;
  font-size: 1.4rem;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: #444;
`;

const services = [
  {
    icon: userIcon,
    title: "User Registration & Login",
    text: "Secure sign-up and login system with validation ensures that every user can access their personal dashboard and services easily.",
  },
  {
    icon: bookIcon,
    title: "Browse & Rent Books",
    text: "Explore a rich collection of books by genre, title, or author, and rent them with a single click from your dashboard.",
  },
  {
    icon: myBooksIcon,
    title: "My Books Dashboard",
    text: "View and manage your currently rented books in one place, including due dates and return status.",
  },
  {
    icon: adminIcon,
    title: "Admin Panel",
    text: "Powerful admin dashboard to manage books, users, rentals, and maintain control over the entire system with ease.",
  },
];

const Cards = () => {
  return (
    <CardContainer>
      <HeadingWrapper>
        <Heading>Our Services</Heading>
      </HeadingWrapper>{" "}
      {services.map((service, index) => (
        <Card key={index}>
          <Icon src={service.icon} alt={service.title} />
          <CardHeading>{service.title}</CardHeading>
          <CardText>{service.text}</CardText>
        </Card>
      ))}
    </CardContainer>
  );
};

export default Cards;
