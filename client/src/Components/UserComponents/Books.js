import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Form,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../UserContext";
import styled from "styled-components";
import "./Books.css"

const StyledCard = styled.div`
  .flip-card {
    background-color: transparent;
    width: 100%;
    height: 350px;
    perspective: 1000px;
    font-family: sans-serif;
    margin-bottom: 20px;
  }

  .title {
    font-size: 1.5em;
    font-weight: 900;
    text-align: center;
    margin: 0;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid coral;
    border-radius: 1rem;
  }

  .flip-card-front {
    background: linear-gradient(
      120deg,
      bisque 60%,
      rgb(255, 231, 222) 88%,
      rgb(255, 211, 195) 40%,
      rgba(255, 127, 80, 0.603) 48%
    );
    color: coral;
  }

  .flip-card-back {
    background-color: #f8f9fa;
    color: #212529;
    transform: rotateY(180deg);
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .flip-card-back p {
    margin-bottom: 0.5rem;
  }

  .flip-card-back .title {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .flip-card-back .rent-button {
    width: 100px;
    margin-top: auto;
  }
`;

const Books = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchCategories();
    fetchBooks(); // fetch all books initially
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/books/category"
      );
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBooks = async (category = "All") => {
    try {
      let response;
      if (category === "All") {
        response = await axios.get("http://localhost:3001/api/books/get");
      } else {
        response = await axios.get(
          `http://localhost:3001/api/books/category/${category}`
        );
      }
      setBooks(response.data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchBooks(category);
  };

  const handleAdd = async (bookId, bookName, userId) => {
    if (!userId) {
      toast.error("Please log in to rent books.");
      return;
    }
    try {
      await axios.post("http://localhost:3001/api/booksonrent/rent", {
        user_id: userId,
        book_id: bookId,
      });
      toast.success(`Book added`);
    } catch (error) {
      console.error(error);
      toast.error(`Book not added.`);
    }
  };

  return (
    <Container className="books-container">
      <ToastContainer />
      {/* <Form.Group controlId="categorySelect" className="mb-3">
        <Form.Label>Select Category</Form.Label>
        <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All</option>
          {categories.map((categoryObj, idx) => (
            <option key={idx} value={categoryObj.category}>
              {categoryObj.category}
            </option>
          ))}
        </Form.Select>
      </Form.Group> */}

      <Row className="mb-4 align-items-center">
        <Col xs={12} sm={6} md={4} lg={3}>
          <div className="p-3 border rounded shadow-sm bg-light">
            <h5 className="mb-3 text-primary">📚 Browse by Category</h5>
            <Form.Group controlId="categorySelect">
              <Form.Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="form-select-sm"
              >
                <option value="All">All</option>
                {categories.map((categoryObj, idx) => (
                  <option key={idx} value={categoryObj.category}>
                    {categoryObj.category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </Col>
      </Row>

      <div className="custom-row">
        {books.map((book) => (
          <div key={book.id} className="custom-col">
            <StyledCard>
              <div
                className={`flip-card ${book.quantity <= 0 ? "blur-card" : ""}`}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src={`/Images/${book.imagename}.jpeg`}
                      alt={`${book.name} cover`}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "1rem",
                      }}
                    />
                  </div>
                  <div className="flip-card-back">
                    <div className="title">{book.name}</div>
                    <p>
                      <strong>Author:</strong> {book.author}
                    </p>
                    <p>
                      <strong>Genre:</strong> {book.genre}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {book.quantity}
                    </p>
                    <p>
                      <strong>Rating:</strong>{" "}
                      {book.rating === 0 ? book.rating : "---"}
                    </p>
                    <Button
                      variant="primary"
                      className="rent-button"
                      disabled={book.quantity <= 0}
                      onClick={() =>
                        handleAdd(book.id, book.name, user ? user.id : null)
                      }
                    >
                      {book.quantity > 0 ? "Rent" : "Not Available"}
                    </Button>
                  </div>
                </div>
              </div>
            </StyledCard>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Books;
