/*import React, { useState } from 'react';
import axios from 'axios';
import { Form } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //const response = await axios.post('http://localhost:3000/users', { email, password });
      const response = await axios.post('http://localhost:3001/users/login', { email, password });
      console.log(response);
    } catch (error) {
      alert('Login failed');
    }
  };


  return (
    <Form>
      <div>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </div>
    </Form>
  );
};

export default Login;
*/

// src/Login.js

// src/Login.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from './UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users/login', { email, password });
      console.log(response.data);
      toast.success(`Login successful for ${response.data[0].name}`);
      setUser({ id: response.data[0].id, name: response.data[0].name });
      navigate('/books');
    } catch (error) {
      console.log(error);
      toast.error(`Login failed - email and/or password is incorrect.`); // Changed to toast.error for error notification
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Login</h2> {/* Centered the heading */}
          <Form onSubmit={handleSubmit}>
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

            <Button variant="primary" type="submit" className="mt-4 btn-block"> {/* Made the button full-width */}
              Submit
            </Button>
          </Form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
