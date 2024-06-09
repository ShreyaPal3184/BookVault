import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { useUser } from '../UserContext';
import { toast } from 'react-toastify';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }

  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    color: #bbb;

    &:hover {
      color: white;
    }
  }
`;

function NavigationBar(){

  const { user, setUser } = useUser();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
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
          <Nav className='ml-auto'>
            <Nav.Item>
              <Nav.Link>
                <Link to='/'>Home</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Link to='/about'>About</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Link to='/books'>Books</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Link to='/mybooks'>My Books</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Link to='/contact'>Contact</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item
                onClick={()=>handleSubmit()}
            >
              <Nav.Link>
                <Link>{user ? "Logout" : "Login"}</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Link>{user ? user.name : null}</Link>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </Styles>
  )
}

export {NavigationBar};
