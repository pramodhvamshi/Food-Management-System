import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { FaHeartbeat, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to={user ? `/${user.role === 'organization' ? 'org' : user.role}/dashboard` : "/"}>
          <FaHeartbeat className="me-2" />
          Smart Food Donation
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">Welcome, {user.name}</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/${user.role === 'organization' ? 'org' : user.role}/dashboard`}>
                    <FaUserCircle className="me-1"/> Dashboard
                  </Link>
                </li>
                <li className="nav-item ms-lg-3">
                  <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                    <FaSignOutAlt className="me-1"/> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light text-success fw-bold ms-lg-2" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
