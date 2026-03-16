import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { FaHeartbeat, FaHandsHelping, FaShippingFast, FaLeaf, FaMapMarkedAlt, FaChartLine } from 'react-icons/fa';

const Home = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    const routePrefix = user.role === 'organization' ? 'org' : user.role;
    return <Navigate to={`/${routePrefix}/dashboard`} replace />;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero py-5 text-center bg-light rounded-3 shadow-sm mb-5">
        <h1 className="display-4 fw-bold text-success mb-3">
          <FaHeartbeat className="me-3 mb-1" />
          Smart Food Donation System
        </h1>
        <p className="lead mb-4 text-secondary px-3 mx-auto" style={{ maxWidth: '700px' }}>
          Bridge the gap between excess food and those in need. Whether you're a donor, an NGO, or a volunteer, join our network to end hunger sustainably.
        </p>
      </section>

      {/* Login Options Section */}
      <section className="logins py-4 mb-5">
        <h2 className="text-center fw-bold mb-4">Select Your Role</h2>
        <div className="row g-4 justify-content-center">
          {/* Donor Card */}
          <div className="col-md-5">
            <div className="card h-100 shadow border-0 border-top border-success border-4">
              <div className="card-body text-center p-4">
                <FaLeaf className="display-4 text-success mb-3" />
                <h3 className="card-title fw-bold">Donor</h3>
                <p className="text-muted mb-4">Restaurants, individuals, and markets with surplus food to give away.</p>
                <Link to="/login?role=donor" className="btn btn-success fw-bold w-100 mb-2">Login as Donor</Link>
                <Link to="/register?role=donor" className="btn btn-outline-success fw-bold w-100">Register as Donor</Link>
              </div>
            </div>
          </div>

          {/* Organization Card */}
          <div className="col-md-5">
            <div className="card h-100 shadow border-0 border-top border-primary border-4">
              <div className="card-body text-center p-4">
                <FaHandsHelping className="display-4 text-primary mb-3" />
                <h3 className="card-title fw-bold">Organization</h3>
                <p className="text-muted mb-4">NGOs and shelters ready to accept and distribute food to the needy.</p>
                <Link to="/login?role=org" className="btn btn-primary fw-bold w-100 mb-2">Login as Organization</Link>
                <Link to="/register?role=org" className="btn btn-outline-primary fw-bold w-100">Register as Organization</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-5">
          <p className="text-muted mb-2">Are you a logistics volunteer?</p>
          <Link to="/login?role=agent" className="btn btn-sm btn-outline-dark fw-bold px-4">
            <FaShippingFast className="me-2"/> Agent Login
          </Link>
        </div>
      </section>

      {/* About & Stats */}
      <section className="about-stats py-5 bg-white rounded-3 shadow-sm px-4">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h3 className="fw-bold mb-3">How it Works</h3>
            <ul className="list-unstyled text-secondary" style={{ lineHeight: '1.8' }}>
              <li><strong>1. Donate:</strong> Share location & details of fresh surplus food.</li>
              <li><strong>2. Match:</strong> Real-time mapping connects nearby organizations.</li>
              <li><strong>3. Transport:</strong> Agents are assigned to pick up and deliver the goods.</li>
              <li><strong>4. Impact:</strong> Live metrics tracking pounds of food saved & people fed.</li>
            </ul>
          </div>
          <div className="col-lg-6 text-center">
             <div className="row g-3">
               <div className="col-6">
                 <div className="p-4 border rounded bg-light">
                    <FaMapMarkedAlt className="text-info fs-1 mb-2"/>
                    <h4 className="fw-bold">10km</h4>
                    <span className="text-muted">Smart Radius Matching</span>
                 </div>
               </div>
               <div className="col-6">
                 <div className="p-4 border rounded bg-light">
                    <FaChartLine className="text-warning fs-1 mb-2"/>
                    <h4 className="fw-bold">100%</h4>
                    <span className="text-muted">Transparent Tracking</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
