import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useUser } from '../UserContext';
import { toast } from 'react-toastify';
import Chatbot from "../../Chatbot";

const Styles = styled.div`
  .navbar {
    background-color: #ffffff; /* Changed to white */
    box-shadow: 0 4px 2px -2px gray; /* Added shadow for differentiation */
    background: linear-gradient(-225deg, #007bff 0%, #B8DCFF 48%, #6BBBFF 100%); /* Blue gradient matching #007bff */
  }

  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    color: #000000; /* Changed to black */
    text-decoration: none; /* Removed underline */

    &:hover {
      color: #5A72A0; /* Changed hover color */
    }
  }

  .active {
    font-weight: bold;
    color: #5A72A0;
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
  }

  return (
    <Styles>
      <Navbar expand='lg'>
        <Container>
          <Navbar.Brand href='/'>BookVault</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav>
              <Nav.Item>
                <Nav.Link as={NavLink} to='/' exact>
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to='/books'>
                  Books
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to='/mybooks'>
                  My Books
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                className="ms-auto"
                onClick={() => handleSubmit()}
              >
                <Nav.Link as={NavLink} to={user ? "/" : "/login"}>
                  {user ? "Logout" : "Login"}
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav.Item className="ms-auto">
              <Button variant="outline-light" onClick={openChatbot}>
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
            <Nav.Item>
              <Nav.Link>
                <span style={{marginLeft: 10}}>{user ? `Signed in as: ${user.name}` : null}</span>
              </Nav.Link>
            </Nav.Item>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Styles>
  )
}

export { NavigationBar };
  