import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css"; // CSS for Footer

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container d-flex justify-content-between align-items-center">
        <span>© {new Date().getFullYear()} Food Donation, Inc.</span>
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link text-light" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-twitter"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
