// src/Login.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from './UserContext';
import styled from 'styled-components';
import loginPageImage from '../Assets/loginPageImage.jpg'; // Import your animated image

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full height of the screen */
  width: 100vw;
  padding: 0;
  margin: 0;
`;

const LoginPageImage = styled.img`
  width: 100%;
  max-width: 100%; /* Ensure image doesn't exceed container width */
  height: auto;
  border-radius: 10px; /* Rounded corners for the image */
`;

const LoginFormContainer = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(-225deg, #007bff 0%, #B8DCFF 48%, #6BBBFF 100%); /* Blue gradient matching #007bff */
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users/login', { email, password });
      if (response.status === 200) {
        console.log(response.data);
        toast.success(`Login successful for ${response.data.name}`);
        setUser({ id: response.data.id, name: response.data.name });
        navigate('/');
      } else {
        console.log("Login Failed");
      }
    } catch (error) {
      toast.error(`Login failed: User not found.`);
      console.log(error);
    }
  };

  return (
    <StyledContainer>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <LoginPageImage src={loginPageImage} alt="Login Page Image" />
        </Col>
        <Col md={6}>
          <LoginFormContainer>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="outline-light" type="submit" className="mt-4 btn-block">
                Submit
              </Button>
            </Form>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </LoginFormContainer>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default Login;
