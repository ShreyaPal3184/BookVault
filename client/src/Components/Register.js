import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    if (password !== confirmPassword) {
      toast.error("Passwords do not match"); // Changed to toast.error for error notification
    } else {
      try {
        const response = await axios.post('http://localhost:3001/users', { name, email, password });
        console.log(response.data);
        toast.success(response.data); // Changed to toast.success for success notification
        navigate('/login');
      } catch (error) {
        console.log(error);
        toast.error('Registration failed - please try again.'); // Changed to toast.error for error notification
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Register User</h2> {/* Centered the heading */}
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mt-3">
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

            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 btn-block"> {/* Made the button full-width */}
              Register
            </Button>
          </Form>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
