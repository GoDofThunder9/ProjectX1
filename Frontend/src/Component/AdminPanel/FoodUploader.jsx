import React, { useState } from "react";
import axios from "axios";
import "./FoodUploader.css";

const AdminPortal = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
    description: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const categories = [
    "PIZZA/PASTA",
    "SANDWICHES",
    "BRUNCH",
    "STEAK/GRILL",
    "SALAD",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("description", formData.description);

    try {
      const response = await axios.post(
        "https://aaditgroups.com/api/foodUpload", // Your API endpoint
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Menu item uploaded successfully!");
        setFormData({
          name: "",
          category: "",
          price: "",
          image: null,
          description: "",
        });
      }
    } catch (error) {
      console.error("Error uploading menu item:", error);
      setErrorMessage("Failed to upload menu item. Please try again.");
    }
  };

  return (
    <div className="admin-portal">
      <h2>Admin Portal - Add Menu Item</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Upload
        </button>
      </form>
    </div>
  );
};

export default AdminPortal;
