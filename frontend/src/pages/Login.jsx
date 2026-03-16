import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Parse role from URL query param (e.g. ?role=donor)
  const queryParams = new URLSearchParams(location.search);
  const targetRole = queryParams.get('role') || 'user';

  const roleLabels = {
    donor: 'Donor',
    org: 'Organization',
    agent: 'Agent',
    user: 'User'
  };

  const getRoleTheme = () => {
    if (targetRole === 'donor') return 'success';
    if (targetRole === 'org') return 'primary';
    if (targetRole === 'agent') return 'dark';
    return 'success';
  };

  const themeClass = getRoleTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    if (result.success) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'organization' && targetRole !== 'org' && targetRole !== 'user') {
          // just a soft warning, redirect anyway
      }
      
      const routePrefix = user.role === 'organization' ? 'org' : user.role;
      navigate(`/${routePrefix}/dashboard`);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="row justify-content-center align-items-center mb-5 mt-4">
      <div className="col-md-6 col-lg-4">
        <div className={`card shadow border-0 border-top border-${themeClass} border-4 p-4`}>
          <div className="card-body">
            <div className="text-center mb-4">
              <FaUserCircle className={`display-3 text-${themeClass} mb-2`} />
              <h2 className="fw-bold">{roleLabels[targetRole]} Login</h2>
            </div>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-muted fw-bold">Email address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="form-label text-muted fw-bold">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className={`btn btn-${themeClass} w-100 fw-bold py-2`}>Sign In</button>
            </form>
            
            <div className="text-center mt-4 pt-3 border-top">
              <span className="text-muted">New to our platform?</span><br/>
              <Link to={`/register?role=${targetRole}`} className={`text-${themeClass} fw-bold text-decoration-none mt-1 d-inline-block`}>
                Create a {roleLabels[targetRole]} Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
