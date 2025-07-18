// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Container, Row, Col, Button } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useUser } from "../UserContext";
// import { toast } from "react-toastify";
// import styled from "styled-components";
// import viewImage from "../../Assets/loginToView.jpg";

// const baseURL = process.env.REACT_APP_BASE_URL;

// const StyledContainer = styled(Container)`
//   text-align: center;

//   @media (max-width: 576px) {
//     padding: 15px 10px;
//     margin-top: 10px;
//   }
// `;

// const StyledImage = styled.img`
//   width: 500px;
//   max-width: 90%;
//   margin: 0 auto 15px;
//   display: block;

//   @media (max-width: 576px) {
//     width: 260px;
//   }
// `;

// const StyledText = styled.p`
//   font-size: 1.6rem;
//   color: #333;
//   margin-bottom: 10px;

//   @media (max-width: 576px) {
//     font-size: 1.1rem;
//   }
// `;

// const StyledLoginLink = styled(Link)`
//   display: inline-block;
//   margin-top: 5px;
//   padding: 8px 18px;
//   color:  #007bff;
//   font-weight: bold;
//   border-radius: 5px;
//   font-size: 1.4rem;
//   text-decoration: none;

//   &:hover {
//     color: #0056b3;
//     text-decoration: none;
//   }
// `;

// const MyBooks = () => {
//   const { user } = useUser();
//   const [books, setBooks] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBooks = async () => {
//       if (!user) return;

//       try {
//         const response = await axios.get(
//           `${baseURL}/api/booksonrent/get/${user.id}`
//         );
//         setBooks(response.data);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };

//     fetchBooks();
//   }, [user]);

//   const handleReturn = async (id) => {
//     console.log(`Returned book with ID: ${id}`);
//     setBooks((prevBooks) => prevBooks.filter((book) => book.r_id !== id));

//     try {
//       const response = await axios.put(
//         `${baseURL}/api/booksonrent/return/${id}`
//       );
//       console.log(response.data);
//       toast.success(`Book returned`);
//     } catch (error) {
//       console.log(error);
//       toast.error(`Failed to return book.`);
//     }
//   };

//   if (!user) {
//     toast.info(`Please log in to view your books.`);
//     return (
//       <StyledContainer>
//         <StyledImage src={viewImage} alt="Login to view books" />
//         <StyledText>
//           You need to be logged in to view your rented books.
//         </StyledText>
//         <StyledLoginLink to="/login">Login to Continue</StyledLoginLink>
//       </StyledContainer>
//     );
//   }

//   if (books.length === 0) {
//     return (
//       <StyledContainer>
//         <StyledText>You haven’t rented any books yet.</StyledText>
//       </StyledContainer>
//     );
//   }

//   return (
//     <Container className="my-books-container mt-4">
//       <Row>
//         {books.map((book) => (
//           <Col key={book.b_id} xs={12} md={6} lg={4} className="mb-4">
//             <Card
//               className="h-100 shadow-sm"
//               style={{ backgroundColor: "#f8f9fa", color: "#212529" }}
//             >
//               <Row className="align-items-center">
//                 <Col md={4}>
//                   <Card.Img
//                     variant="top"
//                     src={`/Images/${book.imagename}.jpeg`}
//                     alt={`${book.name} cover`}
//                     style={{ height: "100%", objectFit: "cover" }}
//                   />
//                 </Col>
//                 <Col md={8}>
//                   <Card.Body>
//                     <Card.Title
//                       style={{ fontSize: "1.2rem", fontWeight: "bold" }}
//                     >
//                       {book.name}
//                     </Card.Title>
//                     <Button
//                       variant="primary"
//                       onClick={() => handleReturn(book.r_id)}
//                     >
//                       Return
//                     </Button>
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
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { toast } from "react-toastify";
import styled from "styled-components";
import viewImage from "../../Assets/loginToView.jpg";
// import noBooksImage from "../../Assets/noBooks.png"; // Add a placeholder image

const baseURL = process.env.REACT_APP_BASE_URL;

// Styled Components
const StyledContainer = styled(Container)`
  text-align: center;
  margin-top: 20px;
  padding-bottom: 50px;

  @media (max-width: 576px) {
    padding: 15px 10px;
  }
`;

const StyledImage = styled.img`
  width: 500px;
  max-width: 90%;
  margin: 0 auto 20px;
  display: block;

  @media (max-width: 576px) {
    width: 260px;
  }
`;

const StyledText = styled.p`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;

  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
`;

const StyledLoginLink = styled(Link)`
  display: inline-block;
  margin-top: 5px;
  padding: 8px 18px;
  color: #007bff;
  font-weight: bold;
  border-radius: 5px;
  font-size: 1.3rem;
  text-decoration: none;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
`;

const BookCard = styled(Card)`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow 0.3s ease-in-out;
  height: 100%;

  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .book-img {
    height: 100%;
    object-fit: cover;
    width: 100%;
    border-radius: 0;
  }

  .book-body {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }

  .book-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .book-author {
    font-size: 0.95rem;
    color: #777;
    margin-bottom: 10px;
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
          `${baseURL}/api/booksonrent/get/${user.id}`
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
        `${baseURL}/api/booksonrent/return/${id}`
      );
      toast.success(`Book returned`);
    } catch (error) {
      toast.error(`Failed to return book.`);
    }
  };

  if (!user) {
    toast.info(`Please log in to view your books.`);
    return (
      <StyledContainer>
        <StyledImage src={viewImage} alt="Login to view books" />
        <StyledText>You need to be logged in to view your rented books.</StyledText>
        <StyledLoginLink to="/login">Login to Continue</StyledLoginLink>
      </StyledContainer>
    );
  }

  if (books.length === 0) {
    return (
      <StyledContainer>
        <StyledImage src={viewImage} alt="No books rented" />
        <StyledText>You haven’t rented any books yet.</StyledText>
        <StyledLoginLink to="/books">Browse & Rent Books</StyledLoginLink>
      </StyledContainer>
    );
  }

  return (
    <Container className="my-books-container mt-4">
      <Row>
        {books.map((book) => (
          <Col key={book.b_id} xs={12} md={6} lg={4} className="mb-4">
            <BookCard className="shadow-sm">
              <Row className="g-0 h-100">
                <Col xs={4}>
                  <Card.Img
                    src={`/Images/${book.imagename}.jpeg`}
                    alt={`${book.name} cover`}
                    className="book-img"
                  />
                </Col>
                <Col xs={8}>
                  <Card.Body className="book-body">
                    <div className="book-title">{book.name}</div>
                    <div className="book-author">by {book.author}</div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleReturn(book.r_id)}
                    >
                      Return Book
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </BookCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyBooks;
