import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DonationForm = () => {
  const [foodItem, setFoodItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ngos, setNgos] = useState([]);
  const [selectedNgo, setSelectedNgo] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/ngos");
        setNgos(res.data.ngos);
      } catch (err) {
        console.error("Error fetching NGOs:", err);
      }
    };
    fetchNgos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/donations",
        { foodItem, quantity, ngoId: selectedNgo },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Donation submitted successfully!");
      setFoodItem("");
      setQuantity("");
      setSelectedNgo("");
    } catch (error) {
      console.error("Donation error:", error.response?.data || error.message);
      setMessage("Failed to submit donation. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Donate Food</h2>

      {message && <p className="alert alert-info">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Food Item</label>
          <input
            type="text"
            className="form-control"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select NGO</label>
          <select className="form-select" value={selectedNgo} onChange={(e) => setSelectedNgo(e.target.value)} required>
            <option value="">Choose an NGO...</option>
            {ngos.map((ngo) => (
              <option key={ngo._id} value={ngo._id}>
                {ngo.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Donate Now
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
