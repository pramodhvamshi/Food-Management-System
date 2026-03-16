import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { FaMapMarkedAlt, FaClipboardCheck } from 'react-icons/fa';

const OrgDashboard = () => {
  const [stats, setStats] = useState({
    available: 0,
    accepted: 0,
    pickedUp: 0,
    delivered: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Organizations care about what's available vs what they've accepted
      const [availableRes, acceptedRes] = await Promise.all([
         api.get('/donations/available'),
         api.get('/donations/accepted')
      ]);
      
      const accDonations = acceptedRes.data;

      setStats({
         available: availableRes.data.length,
         accepted: accDonations.filter(d => d.status === 'accepted').length,
         assigned: accDonations.filter(d => d.status === 'assigned').length, // waiting for pickup
         pickedUp: accDonations.filter(d => d.status === 'picked-up').length,
         delivered: accDonations.filter(d => d.status === 'delivered').length
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h2 className="mb-4">Organization Dashboard</h2>
      
      <div className="row mb-5 g-4">
        {/* Metric Cards */}
        <div className="col-md-4 col-lg-2">
          <div className="card text-center bg-light border-0 shadow-sm h-100">
            <div className="card-body p-3">
              <h6 className="text-secondary fw-bold mt-2">Total Donations</h6>
              <h3 className="display-6 fw-bold">{stats.available + stats.accepted + stats.assigned + stats.pickedUp + stats.delivered}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card text-center bg-primary bg-opacity-10 border-0 shadow-sm h-100">
            <div className="card-body p-3">
              <h6 className="text-primary fw-bold mt-2">Pending</h6>
              <h3 className="display-6 text-primary fw-bold">{stats.available}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card text-center bg-info bg-opacity-10 border-0 shadow-sm h-100">
            <div className="card-body p-3">
              <h6 className="text-info fw-bold mt-2">Accepted</h6>
              <h3 className="display-6 text-info fw-bold">{stats.accepted}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card text-center bg-warning bg-opacity-10 border-0 shadow-sm h-100">
            <div className="card-body p-3">
              <h6 className="text-warning text-dark fw-bold mt-2">Assigned</h6>
              <h3 className="display-6 text-warning fw-bold">{stats.assigned + stats.pickedUp}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card text-center bg-success bg-opacity-10 border-0 shadow-sm h-100">
            <div className="card-body p-3">
              <h6 className="text-success fw-bold mt-2">Delivered</h6>
              <h3 className="display-6 text-success fw-bold">{stats.delivered}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card text-center bg-dark text-white border-0 shadow-sm h-100">
            <div className="card-body p-3">
              <h6 className="fw-bold mt-2 text-white-50">Food Saved</h6>
              <h3 className="display-6 fw-bold">{stats.delivered * 10}kg</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0 border-top border-primary border-4 hover-shadow">
            <div className="card-body text-center p-5">
              <FaMapMarkedAlt className="display-3 text-primary mb-3" />
              <h4 className="card-title fw-bold">Live Donation Map</h4>
              <p className="card-text text-muted mb-4">View and instantly lock fresh food donations explicitly matched near your NGO radius.</p>
              <Link to="/org/available" className="btn btn-primary fw-bold px-5 py-2 rounded-pill">Find Food Nearby</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0 border-top border-success border-4 hover-shadow">
            <div className="card-body text-center p-5">
              <FaClipboardCheck className="display-3 text-success mb-3" />
              <h4 className="card-title fw-bold">Incoming Deliveries</h4>
              <p className="card-text text-muted mb-4">Track expected drop-offs, observe courier assignments, and review historically received stock.</p>
              <Link to="/org/accepted" className="btn btn-outline-success fw-bold px-5 py-2 rounded-pill">View Active Tracking</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgDashboard;
