import React, { useState } from 'react';
import axios from 'axios';
import './FoodUpdate.css'; // Import external CSS for styling

const UpdateFood = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('name', formData.name);
      if (formData.category) data.append('updatedFields[category]', formData.category);
      if (formData.price) data.append('updatedFields[price]', formData.price);
      if (formData.description) data.append('updatedFields[description]', formData.description);
      if (selectedFile) data.append('image', selectedFile);

      const response = await axios.put('https://aaditgroups.com/api/food/update', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setResponseMessage(`Success: ${response.data.message}`);
      }
    } catch (error) {
      setResponseMessage(
        `Error: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="update-food-container">
      <h2>Update Food Item</h2>

      <form onSubmit={handleSubmit} className="update-food-form">
        <label htmlFor="name">Name (required)</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter the food item's name"
          required
        />

        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter the category"
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter the price"
          min="0"
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter a description"
        ></textarea>

        <label htmlFor="image">Upload New Image (optional)</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
          accept=".jpg"
        />

        <button type="submit">Update Food Item</button>
      </form>

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

export default UpdateFood;
