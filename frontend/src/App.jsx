import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import DonorDashboard from './pages/DonorDashboard';
import CreateDonation from './pages/CreateDonation';

import OrgDashboard from './pages/OrgDashboard';
import AvailableDonations from './pages/AvailableDonations';
import AcceptedDonations from './pages/AcceptedDonations';

// We switched to NearbyPickups in agent routing previously, but the previous App.jsx expected AgentDashboard.
// Let's use NearbyPickups as the agent index / dashboard.
import NearbyPickups from './pages/NearbyPickups';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          <Route element={<ProtectedRoute allowedRoles={['donor']} />}>
            <Route path="donor/dashboard" element={<DonorDashboard />} />
            <Route path="donor/create-donation" element={<CreateDonation />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['organization']} />}>
            <Route path="org/dashboard" element={<OrgDashboard />} />
            <Route path="org/available" element={<AvailableDonations />} />
            <Route path="org/accepted" element={<AcceptedDonations />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['agent']} />}>
            {/* Agent Dashboard relies heavily on NearbyPickups and tracking */}
            <Route path="agent/dashboard" element={<NearbyPickups />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
