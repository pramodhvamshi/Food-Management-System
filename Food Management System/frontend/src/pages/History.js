import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/history.css";

const History = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get("/api/donations", { withCredentials: true });
        setDonations(data.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h2>Your Donation History</h2>
      <table>
        <thead>
          <tr>
            <th>Food Items</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation._id}>
              <td>{donation.foodItems.map((item) => item.name).join(", ")}</td>
              <td>{donation.address}</td>
              <td className={donation.status}>{donation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;