import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css"; // Add a CSS file for styling

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          Food Donation
        </Link>

        {/* ✅ Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/overview">Overview</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/inventory">Inventory</Link>
            </li>
          </ul>

          {/* ✅ Profile Dropdown (Real-Time Image Update) */}
          {user ? (
            <div className="dropdown ms-3">
              <button
                className="btn btn-light dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
              >
                <img
                  src={user.profilePic ? `http://localhost:5000${user.profilePic}?t=${new Date().getTime()}` : "/default-profile.png"}
                  alt="Profile"
                  className="rounded-circle me-2"
                  width="30"
                  height="30"
                />
                {user.name}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                <li><button className="dropdown-item text-danger" onClick={logout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary ms-3">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
