import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';

const RentedBooksPage = () => {
  const [rentedBooks, setRentedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch rented books data from the API
  useEffect(() => {
    const fetchRentedBooks = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/books/rented-count');
        const data = await response.json();
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
              <th>Rental Count</th>
            </tr>
          </thead>
          <tbody>
            {rentedBooks.map((book) => (
              <tr key={book.book_id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.rented_count}</td>
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
