import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import AuthContext from '../contexts/AuthContext';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    password: '',
    profilePhoto: '',
    availabilityStatus: 'available',
    orgProfile: {
      orgName: '',
      description: '',
      location: { coordinates: [], address: '' }
    }
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/profile/my');
      setFormData({
        name: res.data.name || '',
        phone: res.data.phone || '',
        address: res.data.address || '',
        password: '',
        profilePhoto: res.data.profilePhoto || '',
        availabilityStatus: res.data.availabilityStatus || 'available',
        orgProfile: res.data.orgProfile || { orgName: '', description: '', location: { coordinates: [], address: '' } }
      });
    } catch (error) {
       console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrgChange = (e) => {
    setFormData({
      ...formData,
      orgProfile: {
        ...formData.orgProfile,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    
    const payload = { ...formData };
    if (!payload.password) delete payload.password;

    try {
      const res = await api.put('/profile/my', payload);
      setSuccessMsg('Profile details updated successfully.');
      
      const updatedUser = { ...user, name: res.data.name, profilePhoto: res.data.profilePhoto };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setFormData(prev => ({ ...prev, password: '' }));
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Error updating profile');
    }
  };

  if (!user) return null;

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow-sm border-0 border-top border-dark border-4 p-4">
          <h3 className="mb-4">My Account Settings ({user.role})</h3>
          
          {successMsg && <div className="alert alert-success">{successMsg}</div>}
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          
          <form onSubmit={handleSubmit}>
            {user.role === 'organization' && (
              <>
                <div className="mb-3">
                  <label className="form-label text-muted fw-bold">Organization Name</label>
                  <input type="text" className="form-control" name="orgName" value={formData.orgProfile?.orgName || ''} onChange={handleOrgChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted fw-bold">Description</label>
                  <textarea className="form-control" name="description" rows="3" value={formData.orgProfile?.description || ''} onChange={handleOrgChange} required></textarea>
                </div>
              </>
            )}

            {(user.role === 'donor' || user.role === 'agent' || user.role === 'admin') && (
              <div className="mb-3">
                <label className="form-label text-muted fw-bold">Full Name / Display Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label text-muted fw-bold">Phone Number</label>
              <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label text-muted fw-bold">Default Street Address</label>
              <textarea className="form-control" name="address" rows="2" value={formData.address} onChange={handleChange}></textarea>
            </div>

            {user.role === 'donor' && (
              <div className="mb-3">
                <label className="form-label text-muted fw-bold">Profile Photo URL</label>
                <input type="text" className="form-control" name="profilePhoto" value={formData.profilePhoto} onChange={handleChange} />
                {formData.profilePhoto && (
                  <div className="mt-2 text-center">
                     <img src={formData.profilePhoto} alt="Profile Preview" className="img-thumbnail rounded-circle" style={{width: '100px', height: '100px', objectFit: 'cover'}} />
                  </div>
                )}
              </div>
            )}

            {user.role === 'agent' && (
              <div className="mb-3">
                <label className="form-label text-muted fw-bold">Availability Status</label>
                <select className="form-select" name="availabilityStatus" value={formData.availabilityStatus} onChange={handleChange}>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
            )}

            <hr className="my-4"/>
            <p className="text-muted small">Only fill this if you want to change your password.</p>
            
            <div className="mb-4">
              <label className="form-label text-muted fw-bold">New Password</label>
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep same password" />
            </div>

            <button type="submit" className="btn btn-dark w-100 fw-bold py-2">Save Profile Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
