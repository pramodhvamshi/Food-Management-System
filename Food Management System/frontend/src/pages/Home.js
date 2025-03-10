import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Make a Difference with Food Donation</h1>
          <p>Your excess food can bring joy to those in need. Join us today.</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary" aria-label="Sign In">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-secondary" aria-label="Sign Up">
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Donate with Us?</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>🍽️ Easy Donations</h3>
            <p>Quickly list food donations with just a few clicks.</p>
          </div>
          <div className="feature-item">
            <h3>✅ Verified NGOs</h3>
            <p>We connect you with reliable organizations.</p>
          </div>
          <div className="feature-item">
            <h3>📊 Track Your Impact</h3>
            <p>See how your donations help those in need.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
