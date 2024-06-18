import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './UserContext';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  background-color: #ffffff; /* White background */
  color: #000000; /* Black text color */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Light shadow */
  font-family: 'Arial, sans-serif';

  .card-body {
    padding: 1rem;
  }

  .card-img-top {
    height: 200px; /* Adjust image height as needed */
    object-fit: cover;
  }

  .btn-primary {
    background-color: #007bff; /* Blue button background */
    border-color: #007bff; /* Blue button border */
    font-size: 1rem;
    font-weight: bold;
  }

  .btn-primary:hover {
    background-color: #0056b3; /* Darker blue on hover */
    border-color: #0056b3;
  }

  .blur-card {
    filter: blur(2px); /* Blur effect for cards with quantity <= 0 */
  }
`;

const Books = () => {
  const [books, setBooks] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleAdd = async (bookId, bookName, userId) => {
    if (!userId) {
      toast.error('Please log in to rent books.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/booksonrent', { user_id: userId, book_id: bookId });
      console.log(response.data);
      toast.success(`Book addedd`);
    } catch (error) {
      console.log(error);
      toast.error(`Book not added.`);
    }
  };

  return (
    <Container className="books-container">
      <ToastContainer />
      <Row>
        {books.map((book) => (
          <Col key={book.id} xs={12} md={6} lg={4} className="mb-4">
            <StyledCard className={`h-100 shadow-sm ${book.quantity <= 0 ? 'blur-card' : ''}`}>
              <Row className="align-items-center">
                <Col md={4}>
                  <Card.Img 
                    variant="top" 
                    src={`/Images/${book.imagename}.jpeg`}
                    alt={`${book.name} cover`} 
                    className="card-img-top" 
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Text>
                      <strong>Author:</strong> {book.author}
                    </Card.Text>
                    <Card.Text>
                      <strong>Genre:</strong> {book.genre}
                    </Card.Text>
                    <Button variant="primary" disabled={book.quantity <= 0} onClick={() => {
                      handleAdd(book.id, book.name, user ? user.id : null);
                    }}>
                      {book.quantity > 0 ? 'Rent' : 'Not Available'}
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </StyledCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Books;
