import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { toast } from 'react-toastify';
import styled from 'styled-components';


const StyledContainer = styled(Container)`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const StyledText = styled.p`
  font-size: 1.2rem;
  color: #333;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const MyBooks = () => {
  const { user } = useUser();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user) return; // If no user is logged in, don't fetch books

      try {
        const response = await axios.get(`http://localhost:3001/api/booksonrent/${user.id}`);
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

    setBooks(prevBooks => prevBooks.filter(book => book.r_id !== id));

    try {
      const response = await axios.put(`http://localhost:3001/api/booksonrent/return/${id}`);
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
      <StyledContainer className="my-books-container">
      <StyledText>
        To view your books, <StyledLink to="/login">Login here</StyledLink>
      </StyledText>
    </StyledContainer>
    );
  }

  if (books.length === 0) {
    return <h1 style={{textAlign: 'center', marginTop: 50}}>No Books found</h1>
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



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { useUser } from './UserContext';
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
//   const [showModal, setShowModal] = useState(false);
//   const [selectedBookId, setSelectedBookId] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [wantsToRate, setWantsToRate] = useState(false); // To track if the user wants to rate
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBooks = async () => {
//       if (!user) return;

//       try {
//         const response = await axios.get(`http://localhost:3001/booksonrent/${user.id}`);
//         setBooks(response.data);
//       } catch (error) {
//         console.error('Error fetching books:', error);
//       }
//     };

//     fetchBooks();
//   }, [user]);

//   const handleReturn = async (id) => {
//     setSelectedBookId(id);
//     setShowModal(true); // Show modal asking for rating
//     setWantsToRate(false); // Reset the rating state
//   };

//   const handleRatingChange = (e) => {
//     setRating(parseInt(e.target.value));
//   };

//   const handleRatingSubmit = async () => {
//     console.log("Selected Rating:", rating); 
//     console.log("Selected Book ID:", selectedBookId);
//     console.log(typeof(rating));
//     console.log(typeof(selectedBookId));

//     if (isNaN(rating) || isNaN(selectedBookId)) {
//       console.log("Invalid data.");
//       return;
//     } 
    

//     if (rating < 1 || rating > 5) {
//       toast.error("Please select a rating between 1 and 5.");
//       return;
//     }

//     try {
//       // Update the rating in the database
//       console.log(1);      
//       await axios.put('http://localhost:3001/booksonrent/rate', { rental_id: selectedBookId, rating });
//       toast.success('Rating submitted successfully!');
//       console.log(1);      

//       // Proceed to return the book after rating
//       await axios.put(`http://localhost:3001/booksonrent/${selectedBookId}`);
//       setBooks(prevBooks => prevBooks.filter(book => book.r_id !== selectedBookId));
//       console.log(1);      

//       console.log(1);      
//       toast.success('Book returned successfully!');
//     } catch (error) {
//       console.log('error');
      
//       console.error(error);
//       toast.error('Failed to return the book or submit the rating.');
//     }

//     setShowModal(false); // Close the modal after action
//     setRating(0); // Reset the rating state
//   };

//   const handleCloseModal = () => {
//     setShowModal(false); // Close the modal if the user cancels
//   };

//   const handleRateChoice = (choice) => {
//     if (choice === 'yes') {
//       setWantsToRate(true); // Show the rating dropdown if the user wants to rate
//     } else {
//       // Return the book even if the user chooses not to rate
//       returnBook(selectedBookId);
//     }
//   };

//   const returnBook = async (id) => {
//     try {
//       // Proceed to return the book
//       await axios.put(`http://localhost:3001/booksonrent/${id}`);
//       setBooks(prevBooks => prevBooks.filter(book => book.r_id !== id));

//       toast.success('Book returned successfully!');
//       setShowModal(false); // Close the modal after returning the book
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to return the book.');
//       setShowModal(false); // Close modal even if there's an error
//     }
//   };

//   if (!user) {
//     toast.info(`Please log in to view your books.`);
//     return (
//       <StyledContainer className="my-books-container">
//         <StyledText>
//           To view your books, <StyledLink to="/login">Login here</StyledLink>
//         </StyledText>
//       </StyledContainer>
//     );
//   }

//   if (books.length === 0) {
//     return <h1 style={{ textAlign: 'center', marginTop: 50 }}>No Books found</h1>;
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

//       {/* Modal for rating the book */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Rate this Book</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Would you like to rate this book?</p>
//           <Button variant="secondary" onClick={() => handleRateChoice('no')}>No</Button>
//           <Button variant="primary" onClick={() => handleRateChoice('yes')} className="ml-3">Yes</Button>

//           {/* Show rating dropdown if user wants to rate */}
//           {wantsToRate && (
//             <>
//               <Form.Group controlId="rating">
//                 <Form.Label>Rate this book:</Form.Label>
//                 <Form.Control
//                   as="select"
//                   value={rating || 0}
//                   onChange={handleRatingChange}
//                 >
//                   {[0, 1, 2, 3, 4, 5].map((rate) => (
//                     <option key={rate} value={rate}>
//                       {rate}
//                     </option>
//                   ))}
//                 </Form.Control>
//               </Form.Group>
//               <Button variant="success" onClick={handleRatingSubmit} style={{ marginTop: '10px' }}>
//                 Submit Rating and Return Book
//               </Button>
//             </>
//           )}
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default MyBooks;
