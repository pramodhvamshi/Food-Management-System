import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container text-center">
        <p>© {new Date().getFullYear()} Food Donation. All Rights Reserved.</p>
        
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>

        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">🌐 Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸 Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
