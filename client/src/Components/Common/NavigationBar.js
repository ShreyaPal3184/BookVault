import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Nav, Navbar, Modal, Button, Dropdown, Image } from "react-bootstrap";
import styled from "styled-components";
import { useUser } from "../UserContext";
import { toast } from "react-toastify";
import Chatbot from "../../Chatbot";
import logo from "../../Assets/BookVault_Logo.png";
import profileIcon from "../../Assets/Icons/profile_icon.png";

const Styles = styled.div`
  .navbar {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1000;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 0.75rem 2rem;
  }

  .navbar-collapse {
    margin-top: 10px;
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 0.5rem;

    @media (min-width: 1200px) {
      background-color: transparent;
      padding: 0;
      margin-top: 0;
    }
  }

  .navbar-toggler {
    border-color: #ccc;
    background-color: #f5f5f5;
    border-radius: 4px;
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='black' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }

  a,
  .navbar-nav .nav-link {
    color: #333;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: #007bff;
    }
  }

  .navbar-nav .nav-link.active {
    font-weight: bold;
    color: #007bff;
  }

  .logo {
    height: 45px;
    width: auto;
    margin-right: 10px;
  }

  .navbar-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 18px;
    margin: 0 8px;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      background-color: #0056b3;
      transform: translateY(-1px);
    }

    &:focus {
      outline: none;
    }

    @media (max-width: 991.98px) {
      display: block;
      width: 100%;
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

  .navbar-brand {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 1.5rem;
    color: #022e5d !important;
  }

  .dropdown-item:active {
    background-color: transparent !important;
    color: inherit !important;
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

  const handleLogout = () => {
    // Clear user session (example)
    localStorage.removeItem("user");
    // Redirect or update state
    navigate("/login"); // or use navigate('/login') if using React Router
  };

  return (
    <Styles>
      <Navbar expand="xl">
        <div className="container-fluid">
          <Navbar.Brand as={NavLink} to="/">
            <img src={logo} className="logo" alt="BookVault Logo" />
            BookVault
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" style={{ fontSize: "16px" }}>
            <Nav className="ms-auto">
              <Nav.Item>
                <Nav.Link as={NavLink} to="/about">
                  About
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/contact">
                  Contact
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/books">
                  Books
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/mybooks">
                  MyBooks
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Nav className="ms-auto">
              {!user && (
                <Nav.Item>
                  <Button
                    variant="outline-light"
                    onClick={handleSubmit}
                    className="navbar-button"
                  >
                    Login
                  </Button>
                </Nav.Item>
              )}
              {/* <Nav.Item>
                <Button
                  variant="outline-light"
                  onClick={handleSubmit}
                  className="navbar-button"
                >
                  {user ? "Logout" : "Login"}
                </Button>
              </Nav.Item> */}

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
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as={Nav.Link}
                      id="dropdown-user"
                      style={{ padding: 0, border: "none", background: "none" }}
                    >
                      <Image
                        src={user.avatar || profileIcon}
                        roundedCircle
                        width="35"
                        height="35"
                        className="ms-3"
                        alt="User"
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                      {user.role == "admin" && (
                        <Dropdown.Item as={NavLink} to="/admin-dashboard">
                          Dashboard
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </Styles>
  );
}

export { NavigationBar };

// You can replace <FaUserCircle /> with a profile photo like:
// <Image src={user.avatar} roundedCircle width="30" height="30" />
