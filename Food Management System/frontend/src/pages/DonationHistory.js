import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonationHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: Please log in.");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/donations/history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.data) {
          setDonations(res.data.data);
        } else {
          setError("No donation history found.");
        }
      } catch (err) {
        console.error("Error fetching donation history:", err.response || err);
        setError("Error fetching donation history. Please try again.");
      }
    };

    fetchDonationHistory();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Donation History</h2>

      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Food Item</th>
              <th>Quantity</th>
              <th>Organization</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((donation) => (
                <tr key={donation._id}>
                  <td>{donation.foodItem}</td>
                  <td>{donation.quantity}</td>
                  <td>{donation.organizationName || "N/A"}</td>
                  <td>
                    <span
                      className={`badge ${
                        donation.status === "completed" ? "bg-success" : "bg-warning"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No past donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DonationHistory;
