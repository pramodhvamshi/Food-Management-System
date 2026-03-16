import React from 'react';
import { FaRegClock, FaCheckCircle, FaBoxOpen, FaTruck, FaHome } from 'react-icons/fa';

const DonationTimeline = ({ status }) => {
  const stages = [
    { key: 'pending', label: 'Created', icon: <FaRegClock /> },
    { key: 'accepted', label: 'Accepted', icon: <FaCheckCircle /> },
    { key: 'assigned', label: 'Assigned', icon: <FaBoxOpen /> },
    { key: 'picked-up', label: 'Picked Up', icon: <FaTruck /> },
    { key: 'delivered', label: 'Delivered', icon: <FaHome /> }
  ];

  const statusMap = {
     'pending': 0,
     'accepted': 1,
     'assigned': 2,
     'picked-up': 3,
     'delivered': 4
  };
  const currentIndex = statusMap[status] ?? 0;

  return (
    <div className="d-flex align-items-center justify-content-between my-2 position-relative" style={{ minWidth: '350px' }}>
      {/* Background line */}
      <div className="position-absolute top-50 translate-middle-y bg-secondary bg-opacity-25" style={{ height: '2px', zIndex: 0, left: '5%', right: '5%' }}></div>
      {/* Active line */}
      <div className="position-absolute top-50 translate-middle-y bg-success" style={{ height: '2px', zIndex: 0, left: '5%', width: `${(currentIndex / 4) * 90}%`, transition: 'width 0.4s ease' }}></div>

      {stages.map((stage, i) => {
        const isActive = i <= currentIndex;
        return (
          <div key={stage.key} className="text-center position-relative" style={{ zIndex: 1, flex: 1 }}>
            <div className={`rounded-circle d-inline-flex justify-content-center align-items-center mx-auto mb-1 ${isActive ? 'bg-success text-white border border-success shadow-sm' : 'bg-white text-secondary border'}`} style={{ width: '30px', height: '30px', fontSize: '14px' }}>
               {stage.icon}
            </div>
            <div className={`small ${isActive ? 'fw-bold text-dark' : 'text-muted'}`} style={{ fontSize: '0.75rem' }}>{stage.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DonationTimeline;
