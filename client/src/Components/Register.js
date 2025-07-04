import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import formImage from "../Assets/register.jpg";

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 0 20px;
  background: linear-gradient(135deg, rgb(249, 253, 255), #ffffff);
`;

const RegisterPageImage = styled.img`
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
  height: auto;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const RegisterFormContainer = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease;
  animation: fadeIn 0.5s ease-in;

  h2 {
    font-weight: 700;
    color: #007bff;
    margin-bottom: 30px;
    text-align: center;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledFormControl = styled(Form.Control)`
  border-radius: 10px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ced4da;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 12px;
  font-weight: bold;
  border-radius: 10px;
  font-size: 16px;
  background-color: #007bff;
  border: none;
  transition: 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [role] = useState("user");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/users/register",
          {
            name,
            email,
            password,
            role,
          }
        );
        toast.success("Registration successful!");
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.status === 409) {
          toast.error("User already exists.");
        } else {
          toast.error("Registration failed - please try again.");
        }

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    }
  };

  return (
    <StyledContainer fluid>
      <Row className="w-100 align-items-center">
        <Col md={6}>
          <RegisterPageImage src={formImage} alt="Register" />
        </Col>
        <Col md={6}>
          <RegisterFormContainer>
            <h2>Create Your Account</h2>
            <Form onSubmit={handleRegister}>
              <Form.Group controlId="formBasicName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <StyledFormControl
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <StyledFormControl
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <StyledFormControl
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);

                    if (value.length < 8) {
                      setPasswordError(
                        "Password must be at least 8 characters long."
                      );
                    } else {
                      setPasswordError("");
                    }
                  }}
                />
                {passwordError && (
                  <Form.Text className="text-danger">{passwordError}</Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <StyledFormControl
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <StyledButton variant="primary" type="submit">
                Register
              </StyledButton>
            </Form>
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </RegisterFormContainer>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default Register;
