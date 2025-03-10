import React from "react";

const About = () => {
  return (
    <div className="container mt-5">
      <h2>About Us</h2>
      <p className="lead">
        Welcome to <strong>Food Donation Platform</strong>, where we connect food donors with organizations in need. Our mission is to reduce food waste and help those in need by creating a seamless donation process.
      </p>

      <h4>Our Vision</h4>
      <p>
        We aim to create a world where no food goes to waste while people struggle with hunger. Our platform bridges the gap between food surplus and food scarcity.
      </p>

      <h4>How It Works</h4>
      <ul>
        <li><strong>Donors</strong> register and list excess food.</li>
        <li><strong>Organizations</strong> can browse and claim donations.</li>
        <li>Once a donation is accepted, a pickup/delivery is arranged.</li>
      </ul>

      <h4>Join Us</h4>
      <p>Whether you're an individual, a restaurant, or a business, you can make a difference by donating surplus food.</p>
    </div>
  );
};

export default About;
