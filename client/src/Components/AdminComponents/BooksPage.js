import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';

const baseURL = process.env.REACT_APP_BASE_URL;

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books data from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${baseURL}/api/books/get`);
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`/api/books/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (response.ok) {
        setBooks(books.filter((book) => book.id !== id));
      } else {
        console.error('Error deleting book:', data);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">All Books</h1>
      {books.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>
                <Button variant="danger" onClick={() => deleteBook(book.id)}> 
                    Delete
                </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No books available.</p>
      )}
    </Container>
  );
};

export default BooksPage;
