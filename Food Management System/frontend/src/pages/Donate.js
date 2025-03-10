import React, { useState } from "react";
import axios from "axios";

const Donate = () => {
  const [foodItem, setFoodItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ngo, setNgo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!foodItem || !quantity || !ngo) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Get JWT token

      await axios.post(
        "http://localhost:5000/api/donations",
        { foodItem, quantity, ngo },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("🎉 Donation Submitted Successfully!");
      
      // Reset form
      setFoodItem("");
      setQuantity("");
      setNgo("");
    } catch (error) {
      console.error("Donation Error:", error);
      alert(error.response?.data?.message || "🚨 Donation submission failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">🍽️ Donate Food</h2>
      <form onSubmit={handleSubmit} className="donate-form">
        <div className="mb-3">
          <label className="form-label">Food Item</label>
          <input
            type="text"
            className="form-control"
            placeholder="E.g., Rice, Bread, Fruits"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            required
            aria-label="Food Item"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="text"
            className="form-control"
            placeholder="E.g., 5kg, 10 packs"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            aria-label="Quantity"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Select NGO</label>
          <select
            className="form-select"
            value={ngo}
            onChange={(e) => setNgo(e.target.value)}
            required
            aria-label="Select NGO"
          >
            <option value="">Choose an NGO</option>
            <option value="Helping Hands">Helping Hands</option>
            <option value="Food for All">Food for All</option>
            <option value="Hope Foundation">Hope Foundation</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100">
          ✅ Submit Donation
        </button>
      </form>
    </div>
  );
};

export default Donate;
