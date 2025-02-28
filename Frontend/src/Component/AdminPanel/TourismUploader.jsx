import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TourismUploader.css";

const currencyOptions = [
  { symbol: "$", code: "USD", name: "US Dollar" },
  { symbol: "€", code: "EUR", name: "Euro" },
  { symbol: "£", code: "GBP", name: "British Pound" },
  { symbol: "₹", code: "INR", name: "Indian Rupee" },
  { symbol: "A$", code: "AUD", name: "Australian Dollar" },
  { symbol: "C$", code: "CAD", name: "Canadian Dollar" },
  { symbol: "₱", code: "PHP", name: "Philippines peso" },
];

const TourForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    currency: "USD", // Default currency
    price: "",
    rating: "",
    reviews: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("duration", formData.duration);
    data.append("currency", formData.currency);
    data.append("price", formData.price);
    data.append("rating", formData.rating);
    data.append("reviews", formData.reviews);
    if (imageFile) data.append("image", imageFile);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tourismUpload`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Tour created successfully!");
        setFormData({
          title: "",
          description: "",
          duration: "",
          currency: "USD",
          price: "",
          rating: "",
          reviews: "",
        });
        setImageFile(null);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Failed to create the tour. Please try again.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create a Tour</h2>
      <ToastContainer position="top-right" autoClose={3000} />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration (days):</label>
          <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} min="1" required />
        </div>

        <div className="form-group">
          <label htmlFor="currency">Currency:</label>
          <select id="currency" name="currency" value={formData.currency} onChange={handleChange} required>
            {currencyOptions.map((curr) => (
              <option key={curr.code} value={curr.code}>{`${curr.symbol} - ${curr.name}`}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} min="0" required />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating (1-5):</label>
          <input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" step="0.1" required />
        </div>

        <div className="form-group">
          <label htmlFor="reviews">Reviews:</label>
          <input type="number" id="reviews" name="reviews" value={formData.reviews} onChange={handleChange} min="0" required />
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default TourForm;