import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const AdminDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignmentData, setAssignmentData] = useState({ agentId: '', donationId: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [donRes, userRes] = await Promise.all([
        api.get('/donations/all'),
        api.get('/users') 
      ]);
      setDonations(donRes.data);
      setAgents(userRes.data.filter(u => u.role === 'agent'));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!assignmentData.agentId || !assignmentData.donationId) return;
    
    try {
      await api.put(`/donations/assign-agent/${assignmentData.donationId}`, { agentId: assignmentData.agentId });
      alert('Agent assigned successfully');
      setAssignmentData({ agentId: '', donationId: '' });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error assigning agent');
    }
  };

  const getStats = () => {
    return {
      total: donations.length,
      pending: donations.filter(d => d.status === 'pending').length,
      accepted: donations.filter(d => d.status === 'accepted').length,
      assigned: donations.filter(d => d.status === 'assigned').length,
      pickedUp: donations.filter(d => d.status === 'picked-up').length,
      delivered: donations.filter(d => d.status === 'delivered').length,
      foodSaved: donations.filter(d => d.status === 'delivered').length // Could sum kg here if structured
    };
  };

  if (loading) return <div>Loading admin dashboard...</div>;

  const stats = getStats();

  return (
    <div>
      <h2 className="mb-4">Admin Control Panel</h2>
      
      {/* Dynamic Metric Cards */}
      <div className="row mb-5 g-3">
        <div className="col-md-2">
          <div className="card text-center shadow-sm">
            <div className="card-body px-2">
              <h6 className="text-secondary">Tot. Donations</h6>
              <h3 className="fw-bold">{stats.total}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card text-center shadow-sm">
            <div className="card-body px-2">
              <h6 className="text-warning">Pending</h6>
              <h3 className="fw-bold">{stats.pending}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card text-center shadow-sm">
            <div className="card-body px-2">
              <h6 className="text-primary">Accepted</h6>
              <h3 className="fw-bold">{stats.accepted}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card text-center shadow-sm border-start border-danger border-4">
            <div className="card-body px-2">
              <h6 className="text-danger mb-0">Action Req:</h6>
              <small className="text-muted">(Needs Agent)</small>
              <h3 className="fw-bold">{stats.accepted}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card text-center shadow-sm">
             <div className="card-body px-2">
                <h6 className="text-info">In Transit</h6>
                <h3 className="fw-bold">{stats.pickedUp + stats.assigned}</h3>
             </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card text-center shadow-sm bg-success text-white">
            <div className="card-body px-2">
              <h6 className="mb-0">Success Deliveries</h6>
              <h3 className="fw-bold">{stats.delivered}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0 mb-5 border-start border-primary border-5">
        <div className="card-body bg-light">
          <form onSubmit={handleAssign} className="row g-3 align-items-center">
             <div className="col-md-5">
               <label className="form-label text-primary fw-bold">Manual override: Assign Agent to ACCEPTED state</label>
               <select 
                 className="form-select" 
                 value={assignmentData.donationId} 
                 onChange={(e) => setAssignmentData({...assignmentData, donationId: e.target.value})}
                 required
               >
                 <option value="">Choose Accepted Donation...</option>
                 {donations.filter(d => d.status === 'accepted' && !d.assignedAgent).map(d => (
                   <option key={d._id} value={d._id}>
                     {d.foodType} from {d.donorId?.name} 
                   </option>
                 ))}
               </select>
             </div>
             <div className="col-md-4">
               <label className="form-label fw-bold">Select Agent</label>
               <select 
                 className="form-select" 
                 value={assignmentData.agentId} 
                 onChange={(e) => setAssignmentData({...assignmentData, agentId: e.target.value})}
                 required
               >
                 <option value="">Choose Agent...</option>
                 {agents.map(a => (
                   <option key={a._id} value={a._id}>{a.name} ({a.phone})</option>
                 ))}
               </select>
             </div>
             <div className="col-md-3 mt-auto">
               <button type="submit" className="btn btn-primary w-100 fw-bold py-2">Dispatch Route &rarr;</button>
             </div>
          </form>
        </div>
      </div>

      <h4 className="mb-3">Master History Record</h4>
      <div className="table-responsive bg-white shadow-sm rounded border">
        <table className="table table-hover mb-0">
          <thead className="table-dark">
            <tr>
              <th>Food</th>
              <th>Donor</th>
              <th>Org (Receiver)</th>
              <th>Agent (Courier)</th>
              <th>Status</th>
              <th>Created On</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(d => (
              <tr key={d._id}>
                <td className="fw-bold text-capitalize">{d.foodType}</td>
                <td>{d.donorId?.name}</td>
                <td>{d.acceptedByOrg ? d.acceptedByOrg.name : <span className="text-muted fst-italic">Waiting matching</span>}</td>
                <td>{d.assignedAgent ? d.assignedAgent.name : <span className="text-muted fst-italic">No agent</span>}</td>
                <td>
                   <span className={`badge bg-${
                      d.status === 'pending' ? 'secondary' : 
                      d.status === 'accepted' ? 'primary' : 
                      d.status === 'assigned' ? 'warning text-dark' : 
                      d.status === 'picked-up' ? 'info text-dark' : 'success'
                   }`}>
                     {d.status.toUpperCase()}
                   </span>
                </td>
                <td>{new Date(d.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
