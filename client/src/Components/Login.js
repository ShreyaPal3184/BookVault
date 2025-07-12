import React, { useState } from 'react';
import { useUser } from './UserContext.js';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import formImage from '../Assets/register.jpg';

const baseURL = process.env.REACT_APP_BASE_URL;

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 0 20px;
  background: linear-gradient(135deg,rgb(249, 253, 255), #ffffff);
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
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
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
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); 
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/users/login`, { email, password, role });
      console.log(response.data);
      
      if (response.status === 200) {  
        console.log(response.data);
        toast.success(`Login successful`);
        setUser({ id: response.data.id, name: response.data.name, role: response.data.role });
        navigate('/');
      } else {
        console.log("Login Failed");
        toast.error(`Login failed.`);
      }
    } catch (error) {
      toast.error(`Login failed: User not found.`);
      console.log(error);
    }
  };

  return (
    <StyledContainer fluid>
      <Row className="w-100 align-items-center">
        <Col md={6}>
          <RegisterPageImage src={formImage} alt="Login Image" />
        </Col>
        <Col md={6}>
          <RegisterFormContainer>
            <h2>Login Here</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <StyledFormControl
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <StyledFormControl
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

          {/* <Form.Group className="mt-3">
                 <Row>
                   <Col xs={1}>
                     <Form.Label>Role: </Form.Label>
                   </Col>
                   <Col xs={4}>
                     <Row>
                       <Col xs={5}>
                         <Form.Check
                          type="radio"
                          label="User"
                          value="user"
                          checked={role === 'user'}
                          onChange={() => setRole('user')}
                        />
                      </Col>
                      <Col xs={5}>
                        <Form.Check
                          type="radio"
                          label="Admin"
                          value="admin"
                          checked={role === 'admin'}
                          onChange={() => setRole('admin')}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form.Group> */}

              <Form.Group className="mt-3">
  <Form.Label>Role</Form.Label>
  <div className="d-flex flex-column flex-md-row gap-3">
    <Form.Check
      type="radio"
      label="User"
      value="user"
      checked={role === 'user'}
      onChange={() => setRole('user')}
      id="role-user"
    />
    <Form.Check
      type="radio"
      label="Admin"
      value="admin"
      checked={role === 'admin'}
      onChange={() => setRole('admin')}
      id="role-admin"
    />
  </div>
</Form.Group>

              

              <StyledButton variant="primary" type="submit">
                Login
              </StyledButton>
            </Form>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </RegisterFormContainer>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default Register;
