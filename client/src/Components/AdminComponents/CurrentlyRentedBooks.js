import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';

const baseURL = process.env.REACT_APP_BASE_URL;

const RentedBooksPage = () => {
  const [rentedBooks, setRentedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentedBooks = async () => {
      try {
        const response = await fetch(`${baseURL}/api/books/currently-rented`);
        const data = await response.json();
        console.log(data);
        
        setRentedBooks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rented books:', error);
        setLoading(false);
      }
    };

    fetchRentedBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">All Rented Books</h1>
      {rentedBooks.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {rentedBooks.map((book) => (
              <tr key={book.book_id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No rented books available.</p>
      )}
    </Container>
  );
};

export default RentedBooksPage;
