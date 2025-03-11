import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./context/AuthContext";
import History from "./pages/History";
import SignUpDonor from "./pages/SignupDonor";
import SignUpOrganization from "./pages/SignupOrganization";

const App = () => {
  return (
    <AuthProvider>  {/* ✅ No <Router> here! */}
      <Navbar />
      <div className="d-flex flex-column min-vh-100">
        <div className="container flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signup-donor" element={<SignUpDonor />} />
            <Route path="/signup-organization" element={<SignUpOrganization />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
