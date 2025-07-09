import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const DashboardContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: #f4f6f8;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #000000;
  margin-bottom: 2rem;
  text-align: center;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  width: 320px;
  max-width: 90%;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardContainer>
      <Title>Admin Dashboard</Title>
      <CardGrid>
        <Card>
          <Icon>👥</Icon>
          <CardTitle>User Management</CardTitle>
          <Description>
            View, add, delete users, and promote/demote user roles.
          </Description>
          <Button onClick={() => navigate("/admin/user-management")}>Manage Users</Button>
        </Card>

        <Card>
          <Icon>📚</Icon>
          <CardTitle>Book Management</CardTitle>
          <Description>
            Add, update, delete books and manage book inventory easily.
          </Description>
          <Button onClick={() => navigate("/admin/books-management")}>Manage Books</Button>
        </Card>

        <Card>
          <Icon>📦</Icon>
          <CardTitle>Rentals Management</CardTitle>
          <Description>
            Track rented books, top rentals, and user rental activity.
          </Description>
          <Button onClick={() => navigate("/admin/rentals-management")}>Manage Rentals</Button>
        </Card>
      </CardGrid>
    </DashboardContainer>
  );
}

export default AdminDashboard;
