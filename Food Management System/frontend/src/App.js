import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./context/AuthContext";
import Profile from "./pages/Profile";
import History from "./pages/History";
import SignUpDonor from "./pages/SignupDonor";
import SignUpOrganization from "./pages/SignupOrganization";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
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
      <Footer />
    </AuthProvider>
  );
};

export default App;
