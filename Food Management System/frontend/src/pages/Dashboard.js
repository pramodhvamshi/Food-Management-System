import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: Please log in.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/donations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched Donations:", res.data);

        if (res.data && res.data.data) {
          setDonations(res.data.data);
        } else {
          setError("No donations found.");
        }
      } catch (err) {
        console.error("Error fetching donations:", err.response || err);
        setError("Error fetching donations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Donations</h2>

      {loading ? (
        <p>Loading donations...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : donations.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Food Item</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td>{donation.foodItem}</td>
                <td>{donation.quantity}</td>
                <td>
                  <span
                    className={`badge ${
                      donation.status === "completed" ? "bg-success" : "bg-warning"
                    }`}
                  >
                    {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                  </span>
                </td>
                <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No donations found.</p>
      )}
    </div>
  );
};

export default Dashboard;
