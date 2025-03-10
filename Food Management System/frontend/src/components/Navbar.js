import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Fetch user authentication status from backend
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve JWT from storage
                if (token) {
                    const res = await axios.get("http://localhost:5000/api/auth/user", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(res.data.user);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setIsLoggedIn(false);
            }
        };
        fetchUser();
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from storage
        setIsLoggedIn(false);
        setUser(null);
        navigate("/login"); // Redirect to login page
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                {/* Logo */}
                <Link to="/" className="navbar-brand">
                    <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                        <use xlinkHref="#bootstrap"></use>
                    </svg>
                    Food Donation
                </Link>

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
                    {/* Navigation Links */}
                    <ul className="navbar-nav me-auto">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/overview" className="nav-link">Overview</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/inventory" className="nav-link">Inventory</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/customers" className="nav-link">Customers</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/products" className="nav-link">Products</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/features" className="nav-link">Features</Link>
                                </li>
                                
                                <li className="nav-item">
                                    <Link to="/faqs" className="nav-link">FAQs</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about" className="nav-link">About</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Authentication / Profile */}
                    {isLoggedIn ? (
                        <div className="dropdown text-end">
                            <a
                                href="#"
                                className="d-block link-light text-decoration-none dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={user?.profilePic || "https://github.com/mdo.png"}
                                    alt="Profile"
                                    width="32"
                                    height="32"
                                    className="rounded-circle"
                                />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end text-small">
                                <li><Link className="dropdown-item" to="/new-project">New project...</Link></li>
                                <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={handleLogout}>Sign out</button></li>
                            </ul>
                        </div>
                    ) : (
                        <div className="text-end">
                            <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                            <Link to="/signup" className="btn btn-warning">Sign-up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
