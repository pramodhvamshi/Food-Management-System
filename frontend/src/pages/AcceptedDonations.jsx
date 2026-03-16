import React, { useState, useEffect } from 'react';
import api from '../api';
import DonationTimeline from '../components/DonationTimeline';

const AcceptedDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccepted();
  }, []);

  const fetchAccepted = async () => {
    try {
      const res = await api.get('/donations/accepted');
      setDonations(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading history...</div>;

  return (
    <div>
      <h3 className="mb-4">Organization History: Track Incoming Deliveries</h3>
      <div className="table-responsive">
        <table className="table bg-white shadow-sm border border-light">
          <thead className="table-primary">
            <tr>
              <th>Food Details</th>
              <th>Donor Info</th>
              <th>Delivery Address (Yours)</th>
              <th>Status</th>
              <th>Assigned Courier Agent</th>
            </tr>
          </thead>
          <tbody>
            {donations.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-4">No accepted donations yet.</td></tr>
            ) : (
              donations.map(d => (
                <tr key={d._id}>
                  <td>
                    <strong className="text-success text-capitalize">{d.foodType}</strong><br/>
                    <small className="text-muted">Qty: {d.quantity}</small>
                  </td>
                  <td>
                    {d.donorId?.name}<br/>
                    <small>{d.donorId?.phone}</small>
                  </td>
                  <td>{d.location?.address}</td>
                  <td className="align-middle" style={{ minWidth: '360px', paddingRight: '2rem' }}>
                    <DonationTimeline status={d.status} />
                  </td>
                  <td className="align-middle">
                    {d.assignedAgent ? (
                      <span className="fw-bold">{d.assignedAgent.name} ({d.assignedAgent.phone})</span>
                    ) : (
                      <span className="text-muted fst-italic">Awaiting Admin Dispatch...</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcceptedDonations;
