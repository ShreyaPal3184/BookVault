import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled(Container)`
  margin-top: 30px;
  display: flex;
  flex-direction: row; /* Align items side by side */
  justify-content: space-between;
`;

const LeftStyledBox = styled(Card)`
  width: 60%;
  height: 487px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
`;

const RightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 500px; /* Same height as LeftStyledBox */
  width: 40%;
`;

const StyledBox = styled(Card)`
  height: 150px; /* Adjusted height to fit three boxes */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px 0 0 0;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [topRentedBooks, setTopRentedBooks] = useState([]);

  // Fetch top rented books
  useEffect(() => {
    const fetchTopRentedBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/books/top-rented');
        setTopRentedBooks(response.data);
      } catch (error) {
        console.error('Error fetching top rented books:', error);
      }
    };
    fetchTopRentedBooks();
  }, []);

  return (
    <DashboardContainer>
      {/* Left Box */}
      <LeftStyledBox onClick={() => navigate('/rented-count')}>
        <Card.Header>
          <h4>Top 5 Rented Books</h4>
        </Card.Header>
        <Card.Body>
          {topRentedBooks && topRentedBooks.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
              {topRentedBooks.slice(0, 5).map((book, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '15px 0',
                    borderBottom: '1px solid #ddd',
                    fontSize: '20px',
                  }}
                >
                  <span>{book.name}</span>
                  <span style={{ fontWeight: 'bold', color: '#555' }}>
                    {book.rental_count} rentals
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No data available</p>
          )}
        </Card.Body>

        <Card.Footer>
          <p>Click for all rented books</p>
        </Card.Footer>
      </LeftStyledBox>

      {/* Right Side Container */}
      <RightSideContainer>
        {/* Books Data Box */}
        <StyledBox onClick={() => navigate('/books-get')}>
          <Card.Header>
            <h4>Books Data</h4>
          </Card.Header>
          <Card.Body>
            <p>View and manage all the books.</p>
          </Card.Body>
        </StyledBox>


        {/* Currently Rented Books Box */}
        <StyledBox onClick={() => navigate('/currently-rented-books')}>
          <Card.Header>
            <h4>Currently Rented Books</h4>
          </Card.Header>
          <Card.Body>
            <p>View all currently rented books.</p>
          </Card.Body>
        </StyledBox>

        {/* Users Data Box */}
        <StyledBox onClick={() => navigate('/users')}>
          <Card.Header>
            <h4>Users Data</h4>
          </Card.Header>
          <Card.Body>
            <p>View all registered users.</p>
          </Card.Body>
        </StyledBox>
      </RightSideContainer>
    </DashboardContainer>
  );
};

export default AdminDashboard;
