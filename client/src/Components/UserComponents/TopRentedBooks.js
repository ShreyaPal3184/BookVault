import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Section = styled.section`
  padding: 40px 20px;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 3rem;
  color: rgb(0, 0, 0);
  font-weight: 600;
  margin-bottom: 20px;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const BookCard = styled.div`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 10px;
  width: 250px;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const BookTitle = styled.h3`
  font-size: 1.4rem;
  color: rgb(0, 0, 0);
  margin: 10px 0 5px 0;
`;

const Author = styled.p`
  font-size: 1.1rem;
  color: rgb(70, 70, 70);
  margin-bottom: 8px;
`;

const Count = styled.p`
  font-size: 1.2rem;
  color: rgb(60, 60, 60);
`;

const TopRentedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/books/top-rented')
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
            <BookImage src={`/Images/${book.imagename}.jpeg`} alt={book.name} />
            <BookTitle>{book.name}</BookTitle>
            <Author>{book.author}</Author>
            <Count>Rented {book.rental_count} times</Count>
          </BookCard>
        ))}
      </CardGrid>
    </Section>
  );
};

export default TopRentedBooks;
