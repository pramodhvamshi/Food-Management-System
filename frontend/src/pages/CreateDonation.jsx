import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaLocationArrow } from 'react-icons/fa';
import api from '../api';
import MapView from '../components/MapView';

const CreateDonation = () => {
  const [formData, setFormData] = useState({
    foodType: 'rice', // Default enum value
    quantity: '',
    notes: '',
    address: '',
    pickupTime: '',
    latitude: '',
    longitude: ''
  });
  const [geoStatus, setGeoStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetLocation = () => {
    setGeoStatus('Fetching location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
          setGeoStatus('Location captured successfully! ✓');
        },
        (err) => {
          setGeoStatus('Failed to get location. Please allow permissions or enter manually if possible.');
          console.error(err);
        }
      );
    } else {
      setGeoStatus('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.latitude || !formData.longitude) {
      setError('Please provide a valid location by clicking "Get My Location".');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/donations/create', formData);
      navigate('/donor/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create donation');
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-7">
        <div className="card shadow-sm border-0 border-top border-success border-4 p-4">
          <div className="d-flex align-items-center mb-4 pb-2 border-bottom">
            <h3 className="mb-0 fw-bold text-dark">Create Food Donation</h3>
          </div>
          
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold text-muted">Food Type</label>
                <select className="form-select bg-light" name="foodType" value={formData.foodType} onChange={handleChange}>
                  <option value="rice">Rice / Grains</option>
                  <option value="vegetables">Fresh Vegetables</option>
                  <option value="fruits">Fresh Fruits</option>
                  <option value="groceries">Packaged Groceries</option>
                  <option value="cooked food">Cooked Food (Restaurant/Catering)</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold text-muted">Quantity</label>
                <input 
                  type="text" 
                  className="form-control bg-light" 
                  name="quantity" 
                  placeholder="e.g., 50 servings, 20 kg" 
                  value={formData.quantity} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold text-muted">Additional Notes <small className="fw-normal">(Allergens, packaging, etc.)</small></label>
              <textarea 
                className="form-control bg-light" 
                name="notes" 
                rows="2" 
                value={formData.notes} 
                onChange={handleChange} 
              ></textarea>
            </div>
            
            <div className="card bg-light border-0 mb-4 p-3 shadow-sm">
              <h5 className="mb-3 text-secondary"><FaMapMarkerAlt className="me-2 text-danger"/> Pickup Location</h5>
              
              <div className="mb-3">
                <label className="form-label fw-bold text-muted">Exact Address</label>
                <textarea 
                  className="form-control" 
                  name="address" 
                  rows="2" 
                  placeholder="Enter the exact door/building address"
                  value={formData.address} 
                  onChange={handleChange} 
                  required 
                ></textarea>
              </div>

              <div className="row g-2 align-items-center">
                <div className="col-auto">
                   <button type="button" className="btn btn-outline-primary fw-bold" onClick={handleGetLocation}>
                     <FaLocationArrow className="me-2"/> Get My Coordinates
                   </button>
                </div>
                <div className="col">
                   {geoStatus && <span className={`small ms-2 fw-bold ${geoStatus.includes('✓') ? 'text-success' : 'text-danger'}`}>{geoStatus}</span>}
                </div>
              </div>

              {(formData.latitude && formData.longitude) && (
                <div className="mt-3 text-muted small">
                  <strong>Coordinates Locked:</strong> {Number(formData.latitude).toFixed(4)}, {Number(formData.longitude).toFixed(4)}
                  <div className="mt-3">
                    <MapView markers={[{ id: '1', name: 'Pickup Location', lat: parseFloat(formData.latitude), lng: parseFloat(formData.longitude), role: 'donor' }]} />
                  </div>
                </div>
              )}
            </div>
            
            <div className="mb-5">
              <label className="form-label fw-bold text-secondary">Ideal Pickup Time</label>
              <input 
                type="datetime-local" 
                className="form-control bg-light" 
                name="pickupTime" 
                value={formData.pickupTime} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <hr className="mb-4"/>
            
            <div className="d-flex justify-content-end gap-3">
              <button type="button" className="btn btn-light px-4 fw-bold" onClick={() => navigate(-1)}>Cancel</button>
              <button type="submit" className="btn btn-success px-5 fw-bold shadow-sm" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Donation Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDonation;
