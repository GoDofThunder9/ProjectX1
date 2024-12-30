import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CabDelete.css'; // Import the external CSS file

const CabList = () => {
  const [cabItems, setCabItems] = useState([]); // Stores the list of cab items
  const [responseMessage, setResponseMessage] = useState(''); // Stores success/error messages

  // Fetch the list of cab items when the component mounts
  useEffect(() => {
    const fetchCabItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cabs');
        if (response.status === 200) {
          setCabItems(response.data.cabs); // Assuming backend returns an array in `cabs`
        }
      } catch (error) {
        console.error('Error fetching cab items:', error.response?.data || error.message);
      }
    };

    fetchCabItems();
  }, []);

  // Handle delete request
  const handleDelete = async (name) => {
    try {
      const response = await axios.delete('http://localhost:8080/cabDelete', {
        data: { name },
      });
      if (response.status === 200) {
        setResponseMessage(`Success: ${response.data.message}`);
        // Remove the deleted cab item from the list
        setCabItems(cabItems.filter((cab) => cab.name !== name));
      }
    } catch (error) {
      setResponseMessage(
        `Error: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="cab-list-container">
      <h2>Cab List</h2>

      {/* Display Cab Items */}
      <ul className="cab-list">
        {cabItems && cabItems.length > 0 ? (
          cabItems.map((cab) => (
            <li key={cab.name} className="cab-item">
              <div className="cab-details">
                <h3>{cab.name}</h3>
                <p>
                  <strong>Type:</strong> {cab.type}
                </p>
                <p>
                  <strong>Capacity:</strong> {cab.capacity} People
                </p>
                <p>
                  <strong>Price/Day:</strong> ${cab.pricePerDay}
                </p>
                <img
                  src={`http://localhost:8080${cab.image}`}
                  alt={cab.name}
                  className="cab-image"
                />
              </div>
              <button
                onClick={() => handleDelete(cab.name)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No cab items available</p>
        )}
      </ul>

      {/* Response Message */}
      {responseMessage && (
        <p
          className={`response-message ${
            responseMessage.startsWith('Success') ? 'success' : 'error'
          }`}
        >
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default CabList;
