import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Card = styled.div`
  width: 400px; 
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  text-align: center;
  background-color: #f0f4ff; 
`;

const CardHeading = styled.h3`
  color: #007bff; 
`;

const Cards = () => {
  return (
    <CardContainer>
      <Card>
        <CardHeading>Extensive Book Collection</CardHeading>
        <p>Discover a vast selection of books covering diverse genres, ensuring there's a perfect read for every reader. Whether you're into thrilling mysteries, heartwarming romances, or thought-provoking non-fiction, our collection caters to all tastes and interests. Enjoy exploring new literary worlds with BookVault's comprehensive library.</p>
      </Card>
      <Card>
        <CardHeading>Flexible Rental Plans</CardHeading>
        <p>Tailor your reading experience with our adaptable rental plans, designed to accommodate your unique reading habits. Whether you prefer short-term rentals for quick reads or extended periods for leisurely exploration, we have a plan that fits your schedule and interests.</p>
      </Card>
      <Card>
        <CardHeading>Highly Rated Books</CardHeading>
        <p>BookVault's "Highly Rated Books" service meticulously selects top-tier titles by aggregating user feedback, critical acclaim, and bestseller rankings. This curated collection ensures readers discover captivating reads that are celebrated for their quality and popularity.</p>
      </Card>
    </CardContainer>
  );
};

export default Cards;
