import React, { useContext } from 'react';
import Navbar from './Navbar';
import { Outlet, Link, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { FaHome, FaMap, FaHistory, FaUser, FaPlusCircle } from 'react-icons/fa';

const Sidebar = ({ role }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active bg-success text-white shadow-sm' : 'text-dark hover-bg-light';

  const getLinks = () => {
    switch(role) {
      case 'donor': return [
        { path: '/donor/dashboard', label: 'Dashboard', icon: <FaHome className="me-2"/> },
        { path: '/donor/create-donation', label: 'New Donation', icon: <FaPlusCircle className="me-2"/> },
        { path: '/profile', label: 'Profile', icon: <FaUser className="me-2"/> }
      ];
      case 'organization': return [
        { path: '/org/dashboard', label: 'Dashboard', icon: <FaHome className="me-2"/> },
        { path: '/org/available', label: 'Available Food', icon: <FaMap className="me-2"/> },
        { path: '/org/accepted', label: 'Incoming Deliveries', icon: <FaHistory className="me-2"/> },
        { path: '/profile', label: 'Profile', icon: <FaUser className="me-2"/> }
      ];
      case 'agent': return [
        { path: '/agent/dashboard', label: 'Active & Nearby Tasks', icon: <FaMap className="me-2"/> },
        { path: '/profile', label: 'Profile', icon: <FaUser className="me-2"/> }
      ];
      default: return [];
    }
  };

  const links = getLinks();
  if (links.length === 0) return null;

  return (
    <div className="bg-white border-end border-top pt-4 shadow-sm flex-shrink-0" style={{ width: '260px', minHeight: '100%' }}>
      <div className="px-3">
         <h6 className="text-muted fw-bold text-uppercase mb-3 px-2" style={{letterSpacing: '1px', fontSize: '12px'}}>Navigation Menu</h6>
         <ul className="nav nav-pills flex-column mb-auto gap-1">
           {links.map(link => (
             <li className="nav-item" key={link.path}>
               <Link to={link.path} className={`nav-link fw-bold px-3 py-2 ${isActive(link.path)}`} style={{transition: 'all 0.2s'}}>
                 {link.icon} {link.label}
               </Link>
             </li>
           ))}
         </ul>
      </div>
    </div>
  );
};

const Layout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />
      <div className="d-flex flex-grow-1 align-items-stretch">
        {user && <Sidebar role={user.role} />}
        <main className="flex-grow-1 py-4 px-4" style={{ backgroundColor: '#f8f9fa' }}>
          <div className={user ? 'container-fluid' : 'container'}>
             <Outlet />
          </div>
        </main>
      </div>
      <footer className="bg-dark text-white text-center py-3 mt-auto shadow-lg">
        <div className="container">
          <p className="mb-0 small text-light opacity-75">&copy; {new Date().getFullYear()} Smart Food Donation System. Developed to eradicate hunger sustainably.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
