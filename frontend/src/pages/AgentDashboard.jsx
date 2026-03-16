import React, { useState, useEffect } from 'react';
import api from '../api';

const AgentDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/agent/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCollect = async (donationId) => {
    if (window.confirm('Confirm that you have collected this donation?')) {
      try {
        await api.put(`/agent/mark-collected/${donationId}`);
        fetchTasks();
      } catch (error) {
        alert(error.response?.data?.message || 'Error marking as collected');
      }
    }
  };

  if (loading) return <div>Loading agent tasks...</div>;

  return (
    <div>
      <h2 className="mb-4">Agent Dashboard</h2>

      <div className="card text-white bg-warning shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title text-dark">My Assigned Tasks</h5>
          <p className="display-4 fw-bold text-dark">{tasks.length}</p>
        </div>
      </div>

      <h4 className="mb-3">Task List</h4>
      <div className="row g-4">
        {tasks.length === 0 ? (
          <div className="col text-center text-muted py-4">
            <h5>No assigned tasks yet.</h5>
          </div>
        ) : (
          tasks.map(task => (
            <div className="col-md-6" key={task._id}>
              <div className="card h-100 shadow-sm border-0 border-start border-warning border-5">
                <div className="card-body">
                  <h5 className="card-title text-dark">
                    Food: {task.donationId?.foodType} 
                    <span className="badge bg-secondary float-end px-2 fs-6">Qty: {task.donationId?.quantity}</span>
                  </h5>
                  <hr/>
                  <p className="mb-1"><strong>Pickup From:</strong> {task.donationId?.pickupAddress}</p>
                  <p className="mb-1"><strong>Time:</strong> {new Date(task.pickupTime).toLocaleString()}</p>
                  <p className="mb-3"><strong>Donor Phone:</strong> {task.donationId?.donorId?.phone}</p>
                  
                  {task.status === 'collected' ? (
                    <button className="btn btn-success w-100 disabled fw-bold">✓ Collected</button>
                  ) : (
                    <button onClick={() => handleCollect(task.donationId?._id)} className="btn btn-warning w-100 fw-bold shadow-sm">
                      Mark as Collected
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;
