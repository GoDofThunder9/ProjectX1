import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodDelete.css'; // Import the external CSS file

const FoodList = () => {
  const [foodItems, setFoodItems] = useState([]); // Stores the list of food items
  const [responseMessage, setResponseMessage] = useState(''); // Stores success/error messages
  // Fetch the list of food items when the component mounts
//   console.log("hello1");

  useEffect(() => {
    // console.log("hello");

    const fetchFoodItems = async () => { 
      try {
        const response = await axios.get('https://aaditgroups.com/api/foods');
        // console.log(response);
        if (response.status === 200) {
          setFoodItems(response.data.foods); // Assuming backend returns an array in `foodItems`
        //   console.log(response.data.foods);
        }
      } catch (error) {
        console.error('Error fetching food items:', error.response?.data || error.message);
      }
    };

    fetchFoodItems();
  }, []);

  // Handle delete request
  const handleDelete = async (name) => {
    try {
      const response = await axios.delete('https://aaditgroups.com/api/foodDelete', {
        data: { name },
      });
      console.log(response);
      if (response.status === 200) {
        setResponseMessage(`Success: ${response.data.message}`);
        // Remove the deleted food item from the list
        setFoodItems(foodItems.filter((food) => food.name !== name));
      }
    } catch (error) {
      setResponseMessage(
        `Error: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="food-list-container">
      <h2>Food List</h2>

      {/* Display Food Items */}
      <ul className="food-list">
  {foodItems && foodItems.length > 0 ? (
    foodItems.map((food) => (
      <li key={food.name} className="food-item">
        <div className="food-details">
          <h3>{food.name}</h3>
          <p>
            <strong>Category:</strong> {food.category}
          </p>
          <p>
            <strong>Price:</strong> ${food.price}
          </p>
          <img
            src={`http://65.0.199.218:8080${food.image}`}
            alt={food.name}
            className="food-image"
          />
        </div>
        <button
          onClick={() => handleDelete(food.name)}
          className="delete-button"
        >
          Delete
        </button>
      </li>
    ))
  ) : (
    <p>No food items available</p>
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

export default FoodList;
