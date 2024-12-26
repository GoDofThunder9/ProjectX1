import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TourList = () => {
  const [tours, setTours] = useState([]); // Stores the list of tours
  const [responseMessage, setResponseMessage] = useState(''); // Stores success/error messages

  // Fetch the list of tours when the component mounts
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('http://localhost:8080/tours');
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
      const response = await axios.delete('http://localhost:8080/deleteTour', {
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
    <div style={{ marginTop: '40px', maxWidth: '800px', margin: 'auto' }} className="tour-list-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Tour List</h2>

      {/* Display Tours */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tours.map((tour) => (
          <li
            key={tour.title}
            className="tour-item"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px',
              marginBottom: '20px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 10px', color: '#333' }}>{tour.title}</h3>
              <p style={{ margin: '0 0 5px', color: '#666' }}>{tour.description}</p>
              <p style={{ margin: '0 0 5px', fontWeight: 'bold', color: '#333' }}>
                <strong>Duration:</strong> {tour.duration} days
              </p>
              <p style={{ margin: '0 0 5px', fontWeight: 'bold', color: '#333' }}>
                <strong>Price:</strong> ${tour.price}
              </p>
            </div>
            <button
              onClick={() => handleDelete(tour.title)}
              style={{
                marginLeft: '20px',
                padding: '10px 15px',
                backgroundColor: '#ff4d4d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#ff3333')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#ff4d4d')}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Response Message */}
      {responseMessage && (
        <p
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: responseMessage.startsWith('Success') ? '#d4edda' : '#f8d7da',
            color: responseMessage.startsWith('Success') ? '#155724' : '#721c24',
            border: responseMessage.startsWith('Success') ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
            borderRadius: '5px',
          }}
        >
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default TourList;
