import React, { useState, useEffect } from 'react';
import api from '../api';
import MapView from '../components/MapView';

const NearbyPickups = () => {
  const [activeTasks, setActiveTasks] = useState([]);
  const [nearbyTasks, setNearbyTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Assigned Tasks
      const activeRes = await api.get('/agent/tasks');
      setActiveTasks(activeRes.data);

      // 2. Fetch Nearby Accepted Tasks
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const res = await api.get(`/agent/nearby?lat=${latitude}&lng=${longitude}&radiusInKm=20`);
            setNearbyTasks(res.data);
            setLoading(false);
          },
          async () => {
            const res = await api.get('/agent/nearby');
            setNearbyTasks(res.data);
            setLoading(false);
          }
        );
      } else {
        const res = await api.get('/agent/nearby');
        setNearbyTasks(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, action) => {
    let endpoint = '';
    let confirmMsg = '';
    
    if (action === 'accept') {
      endpoint = 'accept';
      confirmMsg = 'Confirm you want to lock and accept this pickup task?';
    } else if (action === 'mark-picked-up') {
      endpoint = 'mark-picked-up';
      confirmMsg = 'Confirm you have physically picked up the food?';
    } else {
      endpoint = 'mark-delivered';
      confirmMsg = 'Confirm you have delivered the food to the organization?';
    }

    if (window.confirm(confirmMsg)) {
      try {
        await api.put(`/agent/${endpoint}/${id}`);
        fetchData(); // Refresh UI
      } catch (error) {
        alert(error.response?.data?.message || 'Error updating status');
      }
    }
  };

  if (loading) return <div>Loading dashboard...</div>;

  // Map markers: Agents need to see Donor (pickup) and Org (delivery) for active tasks
  const mapMarkers = [];
  activeTasks.forEach(t => {
     if (t.location && t.location.coordinates) {
        mapMarkers.push({
           id: t._id + '_donor',
           name: `PICKUP: ${t.donorId?.name}`,
           lat: t.location.coordinates[1],
           lng: t.location.coordinates[0],
           role: 'donor'
        });
     }
     if (t.acceptedByOrg && t.acceptedByOrg.location && t.acceptedByOrg.location.coordinates) {
        mapMarkers.push({
           id: t._id + '_org',
           name: `DELIVERY: ${t.acceptedByOrg?.name}`,
           lat: t.acceptedByOrg.location.coordinates[1],
           lng: t.acceptedByOrg.location.coordinates[0],
           role: 'org'
        });
     }
  });

  return (
    <div>
      <h3 className="mb-4">Agent Dashboard</h3>
      
      <div className="mb-5 shadow-sm rounded-3 overflow-hidden border">
         <MapView markers={mapMarkers} />
      </div>

      <h4 className="border-bottom pb-2 mb-4 text-primary">My Active Deliveries</h4>
      <div className="row mb-5">
        {activeTasks.length === 0 ? (
           <div className="col text-center py-5 text-muted">No active assignments. Accept a nearby pickup below!</div>
        ) : (
          activeTasks.map(task => (
            <div className="col-md-6 mb-4" key={task._id}>
              <div className="card h-100 shadow-sm border-0 border-start border-warning border-5">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title text-dark">
                      {task.foodType} 
                    </h5>
                    <span className={`badge bg-${task.status === 'assigned' ? 'danger' : 'info text-dark'}`}>
                       {task.status.toUpperCase()}
                    </span>
                  </div>
                  <hr/>
                  <div className="mb-3">
                    <p className="mb-1"><strong className="text-success">From (Donor):</strong> {task.donorId?.name} - {task.donorId?.phone}</p>
                    <p className="mb-3 ps-3 text-muted border-start border-success border-2">{task.location?.address}</p>
                    
                    <p className="mb-1"><strong className="text-primary">To (Org):</strong> {task.acceptedByOrg?.name} - {task.acceptedByOrg?.phone}</p>
                    <p className="mb-3 ps-3 text-muted border-start border-primary border-2">{task.acceptedByOrg?.location?.address || 'No address provided'}</p>
                  </div>
                  
                  {task.status === 'assigned' && (
                    <button onClick={() => handleStatusUpdate(task._id, 'mark-picked-up')} className="btn btn-warning w-100 fw-bold shadow-sm">
                      Mark as Picked-Up
                    </button>
                  )}
                  {task.status === 'picked-up' && (
                    <button onClick={() => handleStatusUpdate(task._id, 'mark-delivered')} className="btn btn-primary w-100 fw-bold shadow-sm">
                      Mark as Delivered
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <h4 className="border-bottom pb-2 mb-4 text-success">Nearby Available Pickups</h4>
      <div className="row">
        {nearbyTasks.length === 0 ? (
           <div className="col text-center py-5 text-muted">No nearby pickups found.</div>
        ) : (
          nearbyTasks.map(task => (
            <div className="col-md-6 col-lg-4 mb-4" key={task._id}>
              <div className="card h-100 shadow-sm border-0 border-success border-2">
                <div className="card-body">
                  <h5 className="card-title text-success text-capitalize">{task.foodType}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Qty: {task.quantity}</h6>
                  
                  <div className="mt-3">
                    <p className="mb-1"><strong className="text-dark">Pickup from:</strong> {task.donorId?.name} - {task.donorId?.phone}</p>
                    <p className="mb-2 text-muted"><small>{task.location?.address}</small></p>

                    <p className="mb-1"><strong className="text-dark">Deliver to:</strong> {task.acceptedByOrg?.name}</p>
                    <p className="mb-3 text-muted"><small>{task.acceptedByOrg?.location?.address}</small></p>
                  </div>
                  
                  <button onClick={() => handleStatusUpdate(task._id, 'accept')} className="btn btn-outline-success w-100 fw-bold shadow-sm">
                    Accept Logistics Task
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

export default NearbyPickups;
