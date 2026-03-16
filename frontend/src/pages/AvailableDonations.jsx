import React, { useState, useEffect } from 'react';
import api from '../api';
import MapView from '../components/MapView';

const AvailableDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    fetchAvailable();
  }, []);

  const fetchAvailable = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const res = await api.get(`/donations/available?lat=${latitude}&lng=${longitude}&radiusInKm=15`);
            setDonations(res.data);
            setLoading(false);
          },
          async (err) => {
            console.warn('Geolocation blocked/failed, fetching all without filters');
            const res = await api.get('/donations/available');
            setDonations(res.data);
            setLoading(false);
          }
        );
      } else {
         const res = await api.get('/donations/available');
         setDonations(res.data);
         setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    if (window.confirm('Do you want to accept this donation request? This atomically locks it for your organization.')) {
      try {
        await api.put(`/donations/accept/${id}`);
        fetchAvailable();
      } catch (error) {
        alert(error.response?.data?.message || 'Error accepting donation');
      }
    }
  };

  if (loading) return <div>Detecting nearby available donations...</div>;

  // Format donations into markers for Map
  const mapMarkers = donations.filter(d => d.location && d.location.coordinates).map(d => ({
    id: d._id,
    name: `${d.foodType} - ${d.donorId?.name}`,
    lat: d.location.coordinates[1],
    lng: d.location.coordinates[0],
    role: 'donor'
  }));

  return (
    <div>
      <h3 className="mb-4">Nearby Available Donations (15km Radius)</h3>
      
      {/* Map View */}
      <div className="mb-5 shadow-sm rounded-3 overflow-hidden border">
         <MapView markers={mapMarkers} />
      </div>

      <div className="row">
        {donations.length === 0 ? (
          <div className="col text-center text-muted py-5">
            <h5>No pending donations available near you right now. Check back later!</h5>
          </div>
        ) : (
          donations.map(d => (
            <div className="col-md-6 col-lg-4 mb-4" key={d._id}>
              <div className="card h-100 shadow-sm border-0 border-top border-warning border-3">
                <div className="card-body">
                  <h5 className="card-title text-success text-capitalize">{d.foodType}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Qty: {d.quantity}</h6>
                  
                  <div className="mt-3">
                    <strong>Pickup Address:</strong>
                    <p className="mb-1 text-truncate">{d.location?.address || 'N/A'}</p>
                    
                    <strong>Time:</strong>
                    <p className="mb-1">{new Date(d.pickupTime).toLocaleString()}</p>

                    <strong>Donor Contact:</strong>
                    <p className="mb-3">{d.donorId?.name} - {d.donorId?.phone}</p>
                    
                    {d.notes && (
                       <div className="bg-light p-2 rounded small mb-3">
                         <strong>Notes:</strong> {d.notes}
                       </div>
                    )}
                  </div>
                  
                  <button onClick={() => handleAccept(d._id)} className="btn btn-warning w-100 fw-bold shadow-sm">
                    Accept & Lock Donation
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AvailableDonations;
