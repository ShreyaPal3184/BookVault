import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled section container
const Section = styled.section`
  padding: 40px 20px;
text-align: center;
`;

// Heading
const Heading = styled.h2`
  font-size: 3rem;
  color:rgb(0, 0, 0);
  font-weight: 600;
  margin-bottom: 20px;
`;

// Card container
const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

// Book card
const BookCard = styled.div`
background: linear-gradient(120deg,rgb(238, 245, 252),rgb(233, 196, 254));  
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  width: 250px;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

// Book title
const BookTitle = styled.h3`
  font-size: 1.4rem;
  color:rgb(0, 0, 0);
  margin: 10px 0;
`;

// Rental count
const Count = styled.p`
  font-size: 1.2rem;
  color:rgb(60, 60, 60);
`;

const TopRentedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/books/top-rented') // Adjust if route differs
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching top rented books:", err);
      });
  }, []);

  return (
    <Section>
      <Heading>Top Rented Books</Heading>
      <CardGrid>
        {books.map((book) => (
          <BookCard key={book.book_id}>
            <BookTitle>{book.name}</BookTitle>
            <Count>Rented {book.rental_count} times</Count>
          </BookCard>
        ))}
      </CardGrid>
    </Section>
  );
};

export default TopRentedBooks;
