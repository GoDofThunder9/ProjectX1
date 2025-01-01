import React from 'react';
import './AdminPage.css';

// Import images
import foodImage from './images/food.jpg'; // Adjust path based on your project structure
import cabImage from './images/cab.jpg';
import tourismImage from './images/tourism.jpg';

const AdminPage = () => {
  const adminPanels = [
    {
      id: 1,
      name: 'Food Management',
      image: foodImage,
      options: [
        // { label: 'Update', link: '/admin/food/update' },
        { label: 'Delete', link: '/admin/food/delete' },
        { label: 'Add', link: '/admin/food/upload' },
      ],
    },
    {
      id: 2,
      name: 'Cab Management',
      image: cabImage,
      options: [
        // { label: 'Update', link: '/admin/cabs/update' },
        { label: 'Delete', link: '/admin/cab/delete' },
        { label: 'Add', link: '/admin/cab/upload' },
      ],
    },
    {
      id: 3,
      name: 'Tourism Management',
      image: tourismImage,
      options: [
        // { label: 'Update', link: '/admin/tourism/update' },
        { label: 'Delete', link: '/admin/tour/delete' },
        { label: 'Add', link: '/admin/tour/upload' },
      ],
    },
  ];

  return (
    <div className="admin-page-container">
      {/* Sticky Navbar */}
      <nav className="admin-navbar">
        <h1 className="navbar-title">Admin Dashboard</h1>
      </nav>

      {/* Admin Panel Options */}
      <div className="admin-panel-selection">
        <h2>Choose an Admin Panel</h2>
        <div className="admin-panel-boxes">
          {adminPanels.map((panel) => (
            <div key={panel.id} className="admin-panel-box">
              <img src={panel.image} alt={panel.name} className="panel-image" />
              <h3 className="panel-name">{panel.name}</h3>
              <div className="dropdown">
                <select
                  className="dropdown-select"
                  onChange={(e) => {
                    if (e.target.value !== 'default') {
                      window.location.href = e.target.value;
                    }
                  }}
                >
                  <option value="default">Select Action</option>
                  {panel.options.map((option, index) => (
                    <option key={index} value={option.link}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
