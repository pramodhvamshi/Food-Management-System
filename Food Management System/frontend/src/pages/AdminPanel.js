import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: Please log in.");
          return;
        }

        const userRes = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const donationRes = await axios.get("http://localhost:5000/api/admin/donations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(userRes.data.users || []);
        setDonations(donationRes.data.donations || []);
      } catch (err) {
        console.error("Error fetching admin data:", err.response || err);
        setError("Error fetching admin data. Please try again.");
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Panel</h2>

      {error && <p className="text-danger">{error}</p>}

      <div className="mb-4">
        <h4>Users Management</h4>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === "admin" ? "bg-danger" : "bg-primary"}`}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div>
        <h4>Donations Management</h4>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Food Item</th>
              <th>Quantity</th>
              <th>Donor</th>
              <th>Organization</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((donation) => (
                <tr key={donation._id}>
                  <td>{donation.foodItem}</td>
                  <td>{donation.quantity}</td>
                  <td>{donation.donorName || "N/A"}</td>
                  <td>{donation.organizationName || "N/A"}</td>
                  <td>
                    <span
                      className={`badge ${donation.status === "completed" ? "bg-success" : "bg-warning"}`}
                    >
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No donations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
