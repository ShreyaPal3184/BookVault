import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './UserContext';


const Books = () => {
  const [books, setBooks] = useState([]);
  const [bookCounts, setBookCounts] = useState({});
  const { user } = useUser();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/books');
        const initialCounts = response.data.reduce((acc, book) => {
          acc[book.id] = 0; // Initialize count for each book to 0
          return acc;
        }, {});
        setBooks(response.data);
        setBookCounts(initialCounts);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleAdd = (bookId, bookName) => {
    if (!user) {
      toast.error('Please log in to rent books.');
      return;
    }

    setBookCounts(prevCounts => {
      const newCount = prevCounts[bookId] + 1;

      if (prevCounts[bookId] === 0) {
        try {
          const response = await axios.post('http://localhost:3001/booksonrent', { user.id,  });
          console.log(response.data);
          toast.success(`Login successful for ${response.data[0].name}`);
          setUser({ id: response.data[0].id, name: response.data[0].name });
          navigate('/books');
        } catch (error) {
          console.log(error);
          toast.error(`Login failed - email and/or password is incorrect.`); // Changed to toast.error for error notification
        }
        toast.success(`${bookName} added!`);

      } else {
        toast.info(`${bookName} already added!`);
      }

      return {
        ...prevCounts,
        [bookId]: newCount
      };
    });
  };

  return (
    <Container className="books-container">
      <ToastContainer />
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
                    <Button variant="primary" disabled={book.quantity <= 0} onClick={() => {
                      handleAdd(book.id, book.name);
                    }}> {/* Disable button if quantity is 0 or less */}
                      {book.quantity > 0 ? 'Rent' : 'Not Available'}
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
