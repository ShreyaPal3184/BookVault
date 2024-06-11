/*// MyBooks.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useUser } from './UserContext';

const MyBooks = () => {
  const { user } = useUser();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user) return; // If no user is logged in, don't fetch books

      try {
        const response = await axios.get(`http://localhost:3001/booksonrent/${user.id}`);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [user]);

  if (!user) {
    return <p>Please log in to view your books.</p>;
  }

  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <Container className="my-books-container">
      <Row>
        {books.map((book) => (
          <Col key={book.b_id} xs={12} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm" style={{ backgroundColor: '#f8f9fa', color: '#212529', fontFamily: 'Arial, sans-serif' }}>
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

export default MyBooks;
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { toast } from 'react-toastify';

const MyBooks = () => {
  const { user } = useUser();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user) return; // If no user is logged in, don't fetch books

      try {
        const response = await axios.get(`http://localhost:3001/booksonrent/${user.id}`);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [user]);

  const handleReturn = async (id) => {
    // Add logic to handle book return here
    //toast.success(`Returned book with ID: ${bookId}`);
    console.log(`Returned book with ID: ${id}`);

    try {
      const response = await axios.put(`http://localhost:3001/booksonrent/${id}`);
      console.log(response.data);
      toast.success(`Book returned`);
    } catch (error) {
      console.log(error);
      toast.error(`Book not added.`); // Changed to toast.error for error notification
    }
  };

  if (!user) {
    // If user is not logged in, show toast and provide a link to login page
    toast.info(`Please log in to view your books.`);
    return (
      <Container className="my-books-container">
        <p>
          Click <Link to="/login">here</Link> to log in.
        </p>
      </Container>
    );
  }

  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <Container className="my-books-container">
      <Row>
        {books.map((book) => (
          <Col key={book.b_id} xs={12} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm" style={{ backgroundColor: '#f8f9fa', color: '#212529', fontFamily: 'Arial, sans-serif' }}>
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
                    <Button variant="primary" onClick={() => handleReturn(book.r_id)}>Return</Button>
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

export default MyBooks;
