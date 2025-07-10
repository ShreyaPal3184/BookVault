import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const Button = styled.button`
  background-color: ${(props) => props.bg || "#007bff"};
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.hover || "#0056b3"};
  }
`;

const Filter = styled.select`
  margin-bottom: 1rem;
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 0.75rem;
    text-align: left;
  }

  th {
    background-color: #f1f1f1;
  }
`;

const Form = styled.form`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 10px;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [genreFilter, setGenreFilter] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
  });

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/books/get");
      setBooks(res.data);
    } catch (err) {
      toast.error("Failed to fetch books");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/books/category");
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/books/delete/${id}`);
      fetchBooks();
    } catch (err) {
      toast.error("Failed to delete book");
    }
  };

  const createBook = async (e) => {
    e.preventDefault();
    const { title, author, genre } = newBook;

    if (!title || !author || !genre) {
      toast.error("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/books/create", newBook);
      toast.success("Book added!");
      setNewBook({ title: "", author: "", genre: "" });
      setShowCreateForm(false);
      fetchBooks();
    } catch (err) {
      toast.error("Failed to create book");
    }
  };

  const filteredBooks =
    genreFilter === "all"
      ? books
      : books.filter((book) => book.category === genreFilter);

  return (
    <Container>
      <Header>
        <Title>Book Management</Title>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? "Cancel" : "Add Book"}
        </Button>
      </Header>

      {showCreateForm && (
        <Form onSubmit={createBook}>
          <Input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            required
          />
          <Input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            required
          />
          {/* <Input
            type="text"
            placeholder="Genre"
            value={newBook.genre}
            onChange={(e) =>
              setNewBook({ ...newBook, genre: e.target.value })
            }
            required
          /> */}
          <select
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <Button type="submit">Add Book</Button>
        </Form>
      )}

      <Filter
        value={genreFilter}
        onChange={(e) => setGenreFilter(e.target.value)}
      >
        <option value="all">All</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.category}
          </option>
        ))}
      </Filter>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>

                <td>
                  <Button
                    bg="#dc3545"
                    hover="#a52834"
                    onClick={() => deleteBook(book.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BookManagement;
