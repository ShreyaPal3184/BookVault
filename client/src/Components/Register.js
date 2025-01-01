// import React, { useState } from 'react';
// import { Container, Form, Button, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Link, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import loginPageImage from '../Assets/loginPageImage.jpg'; // Import your animated image

// const StyledContainer = styled(Container)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100vh; /* Full height of the screen */
//   width: 100vw;
//   padding: 0;
//   margin: 0;
// `;

// const RegisterPageImage = styled.img`
//   width: 100%;
//   max-width: 100%; /* Ensure image doesn't exceed container width */
//   height: auto;
//   border-radius: 10px; /* Rounded corners for the image */
//   margin-top: 80px;
// `;

// const RegisterFormContainer = styled.div`
//   background: #ffffff;
//   padding: 30px;
//   border-radius: 10px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   background: linear-gradient(-225deg, #007bff 0%, #B8DCFF 48%, #6BBBFF 100%); /* Blue gradient matching #007bff */
// `;

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//     } else {
//       try {
//         const response = await axios.post('http://localhost:3001/users', { name, email, password });
//         console.log(response.data);
//         toast.success(response.data);
//         navigate('/login');
//       } catch (error) {
//         console.log(error);
//         toast.error('Registration failed - please try again.');
//       }
//     }
//   };

//   return (
//     <StyledContainer>
//       <Row className="justify-content-md-center">
//         <Col md={6}>
//           <RegisterPageImage src={loginPageImage} alt="Register Page Image" />
//         </Col>
//         <Col md={6}>
//           <RegisterFormContainer>
//             <h2 className="text-center mb-4">Register</h2>
//             <Form onSubmit={handleRegister}>
//               <Form.Group controlId="formBasicName">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formBasicEmail" className="mt-3">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formBasicPassword" className="mt-3">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formConfirmPassword" className="mt-3">
//                 <Form.Label>Confirm Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Confirm Password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//               </Form.Group>

//               <Button variant="outline-light" type="submit" className="mt-4 btn-block">
//                 Register
//               </Button>
//             </Form>
//             <p className="text-center mt-3">
//               Already have an account? <Link to="/login">Login here</Link>
//             </p>
//           </RegisterFormContainer>
//         </Col>
//       </Row>
//     </StyledContainer>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
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

const RegisterPageImage = styled.img`
  width: 100%;
  max-width: 100%; /* Ensure image doesn't exceed container width */
  height: auto;
  border-radius: 10px; /* Rounded corners for the image */
  margin-top: 80px;
`;

const RegisterFormContainer = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(-225deg, #007bff 0%, #B8DCFF 48%, #6BBBFF 100%); /* Blue gradient matching #007bff */
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to 'user'
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const response = await axios.post('http://localhost:3001/api/users/register', { name, email, password, role });
        console.log(response.data);
        toast.success('Registration successful!');
        navigate('/login');
      } catch (error) {
        console.log(error);
        toast.error('Registration failed - please try again.');
      }
    }
  };

  return (
    <StyledContainer>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <RegisterPageImage src={loginPageImage} alt="Register Page Image" />
        </Col>
        <Col md={6}>
          <RegisterFormContainer>
            <h2 className="text-center mb-4">Register</h2>
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

              {/* Add Radio Buttons for Role Selection */}
              <Form.Group className="mt-3">
                <Form.Label>Role</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="User"
                    value="user"
                    checked={role === 'user'}
                    onChange={() => setRole('user')}
                  />
                  <Form.Check
                    type="radio"
                    label="Admin"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={() => setRole('admin')}
                  />
                </div>
              </Form.Group>

              <Button variant="outline-light" type="submit" className="mt-4 btn-block">
                Register
              </Button>
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
