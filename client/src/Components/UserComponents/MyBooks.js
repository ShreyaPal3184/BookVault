// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, Container, Row, Col, Button } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { useUser } from '../UserContext';
// import { toast } from 'react-toastify';
// import styled from 'styled-components';

// const StyledContainer = styled(Container)`
//   background-color: #f8f9fa;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   margin-top: 20px;
// `;

// const StyledText = styled.p`
//   font-size: 1.2rem;
//   color: #333;
//   text-align: center;
// `;

// const StyledLink = styled(Link)`
//   color: #007bff;
//   text-decoration: none;
//   font-weight: bold;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const MyBooks = () => {
//   const { user } = useUser();
//   const [books, setBooks] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBooks = async () => {
//       if (!user) return; // If no user is logged in, don't fetch books

//       try {
//         const response = await axios.get(`http://localhost:3001/api/booksonrent/get/${user.id}`);
//         setBooks(response.data);
//       } catch (error) {
//         console.error('Error fetching books:', error);
//       }
//     };

//     fetchBooks();
//   }, [user]);

//   const handleReturn = async (id) => {
//     // Add logic to handle book return here
//     //toast.success(`Returned book with ID: ${bookId}`);
//     console.log(`Returned book with ID: ${id}`);

//     setBooks(prevBooks => prevBooks.filter(book => book.r_id !== id));

//     try {
//       const response = await axios.put(`http://localhost:3001/api/booksonrent/return/${id}`);
//       console.log(response.data);
//       toast.success(`Book returned`);
//     } catch (error) {
//       console.log(error);
//       toast.error(`Book not added.`); // Changed to toast.error for error notification
//     }
//   };

//   if (!user) {
//     // If user is not logged in, show toast and provide a link to login page
//     toast.info(`Please log in to view your books.`);
//     return (
//       <StyledContainer className="my-books-container">
//       <StyledText>
//         To view your books, <StyledLink to="/login">Login here</StyledLink>
//       </StyledText>
//     </StyledContainer>
//     );
//   }

//   if (books.length === 0) {
//     return <h1 style={{textAlign: 'center', marginTop: 50}}>No Books found</h1>
//   }

//   return (
//     <Container className="my-books-container">
//       <Row>
//         {books.map((book) => (
//           <Col key={book.b_id} xs={12} md={6} lg={4} className="mb-4">
//             <Card className="h-100 shadow-sm" style={{ backgroundColor: '#f8f9fa', color: '#212529', fontFamily: 'Arial, sans-serif' }}>
//               <Row className="align-items-center">
//                 <Col md={4}>
//                   <Card.Img
//                     variant="top"
//                     src={`/Images/${book.imagename}.jpeg`}
//                     alt={`${book.name} cover`}
//                     style={{ height: '100%', objectFit: 'cover' }}
//                   />
//                 </Col>
//                 <Col md={8}>
//                   <Card.Body>
//                     <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{book.name}</Card.Title>
//                     <Button variant="primary" onClick={() => handleReturn(book.r_id)}>Return</Button>
//                   </Card.Body>
//                 </Col>
//               </Row>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default MyBooks;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { toast } from "react-toastify";
import styled from "styled-components";
import viewImage from "../../Assets/loginToView.jpg";

const StyledContainer = styled(Container)`
  text-align: center;

  @media (max-width: 576px) {
    padding: 15px 10px;
    margin-top: 10px;
  }
`;

const StyledImage = styled.img`
  width: 500px;
  max-width: 90%;
  margin: 0 auto 15px;
  display: block;

  @media (max-width: 576px) {
    width: 260px;
  }
`;

const StyledText = styled.p`
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
`;

const StyledLoginLink = styled(Link)`
  display: inline-block;
  margin-top: 5px;
  padding: 8px 18px;
  color:  #007bff;
  font-weight: bold;
  border-radius: 5px;
  font-size: 1.4rem;
  text-decoration: none;

  &:hover {
    color: #0056b3;
    text-decoration: none;
  }
`;

const MyBooks = () => {
  const { user } = useUser();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user) return;

      try {
        const response = await axios.get(
          `http://localhost:3001/api/booksonrent/get/${user.id}`
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [user]);

  const handleReturn = async (id) => {
    console.log(`Returned book with ID: ${id}`);
    setBooks((prevBooks) => prevBooks.filter((book) => book.r_id !== id));

    try {
      const response = await axios.put(
        `http://localhost:3001/api/booksonrent/return/${id}`
      );
      console.log(response.data);
      toast.success(`Book returned`);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to return book.`);
    }
  };

  if (!user) {
    toast.info(`Please log in to view your books.`);
    return (
      <StyledContainer>
        <StyledImage src={viewImage} alt="Login to view books" />
        <StyledText>
          You need to be logged in to view your rented books.
        </StyledText>
        <StyledLoginLink to="/login">Login to Continue</StyledLoginLink>
      </StyledContainer>
    );
  }

  if (books.length === 0) {
    return (
      <StyledContainer>
        <StyledText>You haven’t rented any books yet.</StyledText>
      </StyledContainer>
    );
  }

  return (
    <Container className="my-books-container mt-4">
      <Row>
        {books.map((book) => (
          <Col key={book.b_id} xs={12} md={6} lg={4} className="mb-4">
            <Card
              className="h-100 shadow-sm"
              style={{ backgroundColor: "#f8f9fa", color: "#212529" }}
            >
              <Row className="align-items-center">
                <Col md={4}>
                  <Card.Img
                    variant="top"
                    src={`/Images/${book.imagename}.jpeg`}
                    alt={`${book.name} cover`}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      {book.name}
                    </Card.Title>
                    <Button
                      variant="primary"
                      onClick={() => handleReturn(book.r_id)}
                    >
                      Return
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

export default MyBooks;
