import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css"; // Add styling for the home page

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold">Make a Difference with Food Donation</h1>
          <p className="lead">Your excess food can bring joy to those in need. Join us today.</p>
          <div className="mt-3">
            <Link to="/login" className="btn btn-light btn-lg mx-2">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg mx-2">
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-4 fw-bold">Why Donate with Us?</h2>
          <div className="row">
            <div className="col-md-4">
              <h3>🍽️ Easy Donations</h3>
              <p>Quickly list food donations with just a few clicks.</p>
            </div>
            <div className="col-md-4">
              <h3>✅ Verified NGOs</h3>
              <p>We connect you with reliable organizations.</p>
            </div>
            <div className="col-md-4">
              <h3>📊 Track Your Impact</h3>
              <p>See how your donations help those in need.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
