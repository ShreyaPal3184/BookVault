import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import logo from "../../Assets/BookVault_Logo.png";

const Styles = styled.div`
  .footerlayout {
    background-color: #f9f9f9;
    color: #333;
    margin-top: 40px;
    padding: 40px 0 20px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }

  .footerlayout h3 {
    font-weight: 600;
    margin-bottom: 16px;
    color: rgb(2, 46, 93);
    font-size: 2rem;
  }

  .footerlayout ul {
    list-style: none;
    padding: 0;
  }

  .footerlayout ul li {
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: rgb(50, 50, 50);
  }

  .footerlayout ul li a {
    color: #444;
    text-decoration: none;
    transition: color 0.2s;
  }

  .footerlayout ul li a:hover {
    color: rgb(0, 0, 0);
  }

  .footer-logo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-logo img {
    width: 80px;
    margin-bottom: 10px;
  }

  .footer-logo div {
    font-size: 2.5rem;
    font-weight: bold;
    color: #022e5d;
  }

  .footer-logo h1 {
    font-size: 1.4rem;
    color: rgb(50, 50, 50);
    margin-top: 4px;
  }

  .footer-bottom {
    text-align: center;
    padding-top: 20px;
    font-size: 0.85rem;
    color: #888;
    border-top: 1px solid #ddd;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    .footerlayout {
      text-align: center;
    }

    .footer-logo {
      align-items: center;
    }

    .footer-logo h1 {
      font-size: 0.9rem;
    }
  }
`;

export const Footer = () => (
  <Styles>
    <div className="footerlayout">
      <Container>
        <Row>
          {/* Column 1: Logo */}
          <Col md={4} sm={12} className="mb-4">
            <div className="footer-logo">
              <img src={logo} alt="BookVault Logo" />
              <div>BookVault</div>
              <h1>A Library Management System</h1>
            </div>
          </Col>

          {/* Column 2: Quick Links */}
          <Col md={4} sm={6} className="mb-4">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/books">Books</a>
              </li>
            </ul>
          </Col>
          {/* Column 3: Contact Info */}
          <Col md={4} sm={6} className="mb-4">
            <h3>Contact</h3>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>Email: support@bookvault.com</li>
              <li>Phone: +1 234 567 8901</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  </Styles>
);
