import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { FaUserPlus } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    orgName: '',
    description: '',
    latitude: null,
    longitude: null
  });
  const [error, setError] = useState('');
  const [geoStatus, setGeoStatus] = useState('');
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const location_url = useLocation();

  useEffect(() => {
    if (navigator.geolocation) {
      setGeoStatus('Fetching location...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
          setGeoStatus('Location acquired ✓');
        },
        (error) => {
          console.warn("Geolocation error", error);
          setGeoStatus('Location unavailable (Proceeding without exact coordinates)');
        }
      );
    } else {
      setGeoStatus('Geolocation is not supported by this browser.');
    }
  }, []);

  const queryParams = new URLSearchParams(location_url.search);
  const targetRole = queryParams.get('role') || 'donor';

  const roleLabels = {
    donor: 'Donor',
    org: 'Organization',
    agent: 'Agent'
  };

  const getRoleTheme = () => {
    if (targetRole === 'donor') return 'success';
    if (targetRole === 'org') return 'primary';
    if (targetRole === 'agent') return 'dark';
    return 'success';
  };

  const themeClass = getRoleTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Inject the role into the registration payload
    const finalRole = targetRole === 'org' ? 'organization' : targetRole === 'agent' ? 'agent' : 'donor';
    const payload = { ...formData, role: finalRole };

    const result = await register(payload);
    if (result.success) {
      const routePrefix = targetRole === 'org' ? 'org' : targetRole === 'agent' ? 'agent' : 'donor';
      navigate(`/${routePrefix}/dashboard`);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-8 col-lg-6">
        <div className={`card shadow border-0 border-top border-${themeClass} border-4 p-4`}>
          <div className="card-body">
            <div className="text-center mb-4">
              <FaUserPlus className={`display-4 text-${themeClass} mb-2`} />
              <h2 className="fw-bold">Register as {roleLabels[targetRole]}</h2>
            </div>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label fw-bold text-muted">Full Name</label>
                  <input type="text" className="form-control bg-light" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-muted">Email address</label>
                  <input type="email" className="form-control bg-light" name="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label fw-bold text-muted">Password</label>
                  <input type="password" className="form-control bg-light" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-muted">Phone Number</label>
                  <input type="text" className="form-control bg-light" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold text-muted">Street Address</label>
                <textarea className="form-control bg-light" name="address" rows="2" value={formData.address} onChange={handleChange} required></textarea>
              </div>

              {targetRole === 'org' && (
                <div className="bg-light p-4 rounded mb-4 border border-primary border-opacity-25">
                  <h5 className="mb-3 text-primary fw-bold">Organization Details</h5>
                  <div className="mb-3">
                    <label className="form-label fw-bold text-muted">Organization Name</label>
                    <input type="text" className="form-control" name="orgName" value={formData.orgName} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold text-muted">Mission Description</label>
                    <textarea className="form-control" name="description" rows="2" value={formData.description} onChange={handleChange} required></textarea>
                  </div>
                </div>
              )}

              <button type="submit" className={`btn btn-${themeClass} py-3 fs-5 w-100 fw-bold shadow-sm`}>Create Account</button>
              
              {geoStatus && (
                <div className="text-center mt-3 small text-muted">
                  <span className="badge bg-secondary me-2">GPS</span>
                  {geoStatus}
                </div>
              )}
            </form>
            
            <div className="text-center mt-4 pt-3 border-top">
               <span className="text-muted">Already registered?</span><br/>
               <Link to={`/login?role=${targetRole}`} className={`text-${themeClass} fw-bold text-decoration-none mt-1 d-inline-block`}>
                 Log in to your account
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
