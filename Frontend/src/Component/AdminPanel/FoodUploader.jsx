import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FoodUploader.css";

const AdminPortal = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    currency: "USD",
    image: null,
    description: "",
  });

  const categories = [
    "PIZZA/PASTA",
    "SANDWICHES",
    "BRUNCH",
    "STEAK/GRILL",
    "SALAD",
  ];

  const currencyOptions = [
    { symbol: "$", code: "USD", name: "US Dollar" },
    { symbol: "€", code: "EUR", name: "Euro" },
    { symbol: "£", code: "GBP", name: "British Pound" },
    { symbol: "₹", code: "INR", name: "Indian Rupee" },
    { symbol: "A$", code: "AUD", name: "Australian Dollar" },
    { symbol: "C$", code: "CAD", name: "Canadian Dollar" },
    { symbol: "₱", code: "PHP", name: "Philippines peso" },
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
    formDataToSend.append("currency", formData.currency);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("description", formData.description);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/foodUpload`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Menu item uploaded successfully!");
        setFormData({
          name: "",
          category: "",
          price: "",
          currency: "USD",
          image: null,
          description: "",
        });
      }
    } catch (error) {
      console.error("Error uploading menu item:", error);
      toast.error("Failed to upload menu item. Please try again.");
    }
  };

  return (
    <div className="admin-portal">
      <h2>Admin Portal - Add Menu Item</h2>
      <ToastContainer position="top-right" autoClose={3000} />
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="currency">Currency:</label>
          <select id="currency" name="currency" value={formData.currency} onChange={handleChange} required>
            {currencyOptions.map((currency) => (
              <option key={currency.code} value={currency.code}>{currency.symbol} - {currency.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" required></textarea>
        </div>
        <button type="submit" className="submit-button">Upload</button>
      </form>
    </div>
  );
};

export default AdminPortal;
