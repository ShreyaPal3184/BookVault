import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;

  @media (max-width: 480px) {
    text-align: center;
    width: 100%;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.bg || "#007bff"};
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.hover || "#0056b3"};
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Filter = styled.select`
  margin-bottom: 1rem;
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 200px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    border: 1px solid #ddd;
    padding: 0.75rem;
    text-align: left;
    min-width: 150px;
  }

  th {
    background-color: #f1f1f1;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  margin-inline: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const Error = styled.div`
  color: red;
  font-size: 0.9rem;
`;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3001/api/users/get");
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3001/api/users/delete/${id}`);
    fetchUsers();
  };

  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    await axios.patch(`http://localhost:3001/api/users/${id}/role`, {
      role: newRole,
    });
    fetchUsers();
  };

  const createAdmin = async (e) => {
    e.preventDefault();
    setPasswordError("");

    const { name, email, password, confirmPassword } = newAdmin;

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/users/register", {
        name,
        email,
        password,
        role: "admin",
      });
      setNewAdmin({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "admin",
      });
      setShowCreateForm(false);
      fetchUsers();
    } catch (err) {
      window.alert(err?.response?.data?.message || "Failed to create admin.");
    }
  };

  const filteredUsers =
    roleFilter === "all"
      ? users
      : users.filter((user) => user.role === roleFilter);

  return (
    <Container>
      <Header>
        <Title>User Management</Title>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? "Cancel" : "Create Admin"}
        </Button>
      </Header>

      {showCreateForm && (
        <Form onSubmit={createAdmin}>
          <Input
            type="text"
            placeholder="Name"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={newAdmin.email}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, email: e.target.value })
            }
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={newAdmin.password}
            onChange={(e) => {
              const value = e.target.value;
              setNewAdmin((prev) => ({ ...prev, password: value }));
              setPasswordValid(value.length >= 8);
              setConfirmPasswordMatch(value === newAdmin.confirmPassword);
            }}
            required
          />
          {!passwordValid && newAdmin.password && (
            <Error>Password must be at least 8 characters.</Error>
          )}

          <Input
            type="password"
            placeholder="Confirm Password"
            value={newAdmin.confirmPassword}
            onChange={(e) => {
              const value = e.target.value;
              setNewAdmin((prev) => ({ ...prev, confirmPassword: value }));
              setConfirmPasswordMatch(newAdmin.password === value);
            }}
            required
          />
          {!confirmPasswordMatch && newAdmin.password && (
            <Error>Passwords do not match.</Error>
          )}

          {passwordError && <Error>{passwordError}</Error>}
          <input type="hidden" value="admin" name="role" />
          <Button
            type="submit"
            disabled={!passwordValid || !confirmPasswordMatch}
          >
            Create Admin
          </Button>
        </Form>
      )}

      <Filter
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </Filter>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    onClick={() => deleteUser(user.id)}
                    bg="#dc3545"
                    hover="#a52834"
                    style={{ marginRight: "0.5rem" }}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => toggleRole(user.id, user.role)}
                    bg="#28a745"
                    hover="#1e7e34"
                  >
                    {user.role === "admin" ? "Demote" : "Promote"}
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

export default UserManagement;
