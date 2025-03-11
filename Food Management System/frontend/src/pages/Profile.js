import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(res.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:5000/api/auth/update-profile", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setProfile(res.data.user);
      if (setUser) {
        setUser(res.data.user);
      }
      alert("Profile updated successfully!");
      window.location.reload(); // ✅ Force UI update
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Profile</h2>
      {loading ? (
        <p className="text-center">Loading profile...</p>
      ) : (
        <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "400px" }}>
          <div className="mb-3 text-center">
            <label className="form-label">Profile Picture</label>
            <img
              src={profile?.profilePic ? `http://localhost:5000${profile.profilePic}?t=${new Date().getTime()}` : "/default-profile.png"}
              alt="Profile"
              className="img-fluid rounded-circle mb-2"
              width="100"
            />
            <input type="file" className="form-control mt-2" onChange={handleFileChange} />
            <button className="btn btn-primary mt-2 w-100" onClick={handleUpload}>Upload</button>
          </div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={profile?.name} disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={profile?.email} disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <input type="text" className="form-control" value={profile?.role} disabled />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
