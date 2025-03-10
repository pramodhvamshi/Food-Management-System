import React, { useState } from "react";
import axios from "axios";
import "../styles/signup.css";

const SignupDonor = () => {
  const [formData, setFormData] = useState({ name: "", email: "", address: "", state: "", country: "", password: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/signup/donor", formData);
      alert("Signup Successful");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
      <input type="text" name="state" placeholder="State" onChange={handleChange} required />
      <input type="text" name="country" placeholder="Country" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupDonor;