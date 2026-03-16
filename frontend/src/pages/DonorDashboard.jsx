import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { FaPlusCircle, FaHistory } from 'react-icons/fa';
import DonationTimeline from '../components/DonationTimeline';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyDonations();
  }, []);

  const fetchMyDonations = async () => {
    try {
      const res = await api.get('/donations/my');
      setDonations(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    return {
       total: donations.length,
       pending: donations.filter(d => d.status === 'pending').length,
       accepted: donations.filter(d => d.status === 'accepted').length,
       assigned: donations.filter(d => d.status === 'assigned').length,
       pickedUp: donations.filter(d => d.status === 'picked-up').length,
       delivered: donations.filter(d => d.status === 'delivered').length
    };
  };

  if (loading) return <div>Loading dashboard...</div>;

  const stats = getStats();

  return (
    <div>
      <h2 className="mb-4">Donor Dashboard</h2>
      
      {/* Metric Cards per the updated requirements */}
      <div className="row mb-5 g-3">
        <div className="col-md-4 col-lg-2">
          <div className="card text-center bg-light shadow-sm h-100">
            <div className="card-body p-3">
              <h6 className="text-secondary fw-bold">Total Donations</h6>
              <h3 className="fw-bold display-6">{stats.total}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card text-center bg-primary bg-opacity-10 shadow-sm h-100 border-0">
            <div className="card-body p-3">
              <h6 className="text-primary fw-bold">Pending</h6>
              <h3 className="fw-bold text-primary display-6">{stats.pending}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card text-center bg-info bg-opacity-10 shadow-sm h-100 border-0">
            <div className="card-body p-3">
              <h6 className="text-info fw-bold">Accepted</h6>
              <h3 className="fw-bold text-info display-6">{stats.accepted}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card text-center bg-warning bg-opacity-10 shadow-sm h-100 border-0">
            <div className="card-body p-3">
              <h6 className="text-warning text-dark fw-bold">Assigned</h6>
              <h3 className="fw-bold text-warning display-6">{stats.assigned || 0 + stats.pickedUp || 0}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card text-center bg-success bg-opacity-10 text-success border-success shadow-sm h-100 border-0">
            <div className="card-body p-3">
              <h6 className="fw-bold mb-0">Delivered</h6>
              <h3 className="fw-bold display-6 mb-0">{stats.delivered}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card text-center bg-dark text-white border-0 shadow-sm h-100">
            <div className="card-body p-3">
              <h6 className="fw-bold mt-2 text-white-50">Food Saved</h6>
              <h3 className="display-6 fw-bold">{stats.delivered * 10}kg</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
         <h4 className="mb-0"><FaHistory className="me-2 text-secondary" /> Master Ledger History</h4>
         <Link to="/donor/create-donation" className="btn btn-success fw-bold px-4">
           <FaPlusCircle className="me-2" /> Submit New Donation Request
         </Link>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Food Profile</th>
                  <th>Quantity / Notes</th>
                  <th>Pickup Address</th>
                  <th>Status Progress</th>
                </tr>
              </thead>
              <tbody>
                {donations.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-5 text-muted">No donations yet. Click 'Submit New Donation' to start!</td></tr>
                ) : (
                  donations.map(d => (
                    <tr key={d._id}>
                      <td className="text-capitalize fw-bold">{d.foodType}</td>
                      <td>
                        {d.quantity}<br/>
                        {d.notes && <small className="text-muted d-block mt-1 fst-italic">Note: {d.notes}</small>}
                      </td>
                      <td>
                         <span className="text-truncate d-inline-block" style={{maxWidth: '250px'}}>
                            {d.location?.address}
                         </span>
                      </td>
                      <td style={{ minWidth: '360px' }}>
                        <DonationTimeline status={d.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
