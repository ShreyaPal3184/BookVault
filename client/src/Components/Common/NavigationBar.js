
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useUser } from '../UserContext';
import { toast } from 'react-toastify';
import Chatbot from "../../Chatbot";
import logo from "../../Assets/BookVault_Logo.png";

const Styles = styled.div`
  .navbar {
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
    padding: 0.5rem 1rem;
  }

  .navbar-collapse {
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .navbar-toggler {
    border-color:rgb(207, 207, 207);
    background-color:rgb(249, 249, 249);
    border-radius: 4px;
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='black' stroke-width='1' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }

  a,
  .navbar-nav .nav-link {
    color: #333333;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 500;

    &:hover {
      color: #007bff;
    }
  }

  .navbar-nav .nav-link.active {
    font-weight: bold;
    color: #007bff;
  }

  .logo {
    height: 50px;
    width: auto;
    margin-right: 10px;
  }

.navbar-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 0 8px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 991.98px) {
    display: block;
    width: 20%;
    margin: 10px 0;
    background-color: white;
    color: #007bff;
    border: 1px solid #007bff;

    &:hover {
      background-color: #007bff;
      color: white;
    }
  }
}

    .navbar-collapse {
      margin-top: 10px;
    }
  }
`;


function NavigationBar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);

  const openChatbot = () => setShowChatbot(true);
  const closeChatbot = () => setShowChatbot(false);

  const handleSubmit = async () => {
    if (user) {
      toast.success(`Logout successful!`);
      setUser(null);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <Styles>
      <Navbar expand="xl">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <img src={logo} className='logo' alt="BookVault Logo" />
            BookVault
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" style={{ fontSize: '16px' }}>
            <Nav className="ms-auto">
              <Nav.Item>
                <Nav.Link as={NavLink} to="/about">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/books">Books</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/mybooks">MyBooks</Nav.Link>
              </Nav.Item>
            </Nav>

            <Nav className="ms-auto">
              <Nav.Item>
                <Button
                  variant="outline-light"
                  onClick={handleSubmit}
                  className="navbar-button"
                >
                  {user ? "Logout" : "Login"}
                </Button>
              </Nav.Item>

              <Nav.Item>
                <Button
                  variant="outline-light"
                  onClick={openChatbot}
                  className="navbar-button"
                >
                  Chat
                </Button>
                <Modal show={showChatbot} onHide={closeChatbot}>
                  <Modal.Body>
                    <Chatbot />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={closeChatbot}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Nav.Item>

              {user && (
                <Nav.Item>
                  <Nav.Link disabled>
                    <span style={{ marginLeft: 10 }}>
                      Signed in as: {user.name}
                    </span>
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Styles>
  );
}

export { NavigationBar };
