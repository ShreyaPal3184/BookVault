import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

const Books = () => {
  const [books, setBooks] = useState([]);

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

  return (
    <Container className="books-container">
      <Row>
        {books.map((book) => (
          <Col key={book.id} xs={12} md={6} lg={4} className="mb-4">
            <Card className={`h-100 shadow-sm ${book.quantity <= 0 ? 'blur-card' : ''}`} style={{ backgroundColor: '#f8f9fa', color: '#212529', fontFamily: 'Arial, sans-serif' }}>
              <Row className="align-items-center">
                <Col md={4}>
                  <Card.Img 
                    variant="top" 
                    src={`/Images/${book.imagename}.jpeg`}
                    alt={`${book.name} cover`} 
                    style={{ height: '100%', objectFit: 'cover' }} 
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{book.name}</Card.Title>
                    <Card.Text style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                      <strong>Author:</strong> {book.author}
                    </Card.Text>
                    <Card.Text style={{ fontSize: '1rem' }}>
                      <strong>Genre:</strong> {book.genre}
                    </Card.Text>
                    <Button variant="primary" disabled={book.quantity <= 0}> {/* Disable button if quantity is 0 or less */}
                      {book.quantity > 0 ? 'Add' : 'Not Available'}
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Books;
