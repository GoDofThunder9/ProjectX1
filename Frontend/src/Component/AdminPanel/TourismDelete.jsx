import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TourismDelete.css'; // Import the external CSS file

const TourList = () => {
  const [tours, setTours] = useState([]); // Stores the list of tours
  const [responseMessage, setResponseMessage] = useState(''); // Stores success/error messages

  // Fetch the list of tours when the component mounts
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('https://aaditgroups.com/api/tours');
        console.log(response);
        if (response.status === 200) {
          setTours(response.data.tours); // Assuming backend returns an array in `tours`
        }
      } catch (error) {
        console.error('Error fetching tours:', error.response?.data || error.message);
      }
    };

    fetchTours();
  }, []);

  // Handle delete request
  const handleDelete = async (title) => {
    try {
      const response = await axios.delete('https://aaditgroups.com/api/deleteTour', {
        data: { title },
      });

      if (response.status === 200) {
        setResponseMessage(`Success: ${response.data.message}`);
        // Remove the deleted tour from the list
        setTours(tours.filter((tour) => tour.title !== title));
      }
    } catch (error) {
      setResponseMessage(
        `Error: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="tour-list-container">
      <h2>Tour List</h2>

      {/* Display Tours */}
      <ul className="tour-list">
        {tours.map((tour) => (
          <li key={tour.title} className="tour-item">
            <div className="tour-details">
              <h3>{tour.title}</h3>
              <p>{tour.description}</p>
              <p>
                <strong>Duration:</strong> {tour.duration} days
              </p>
              <p>
                <strong>Price:</strong> ${tour.price}
              </p>
            </div>
            <button
              onClick={() => handleDelete(tour.title)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
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

export default TourList;
