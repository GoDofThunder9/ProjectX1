import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TourismUploader.css"; // Ensure this path is correct

const TourForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    rating: "",
    reviews: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("duration", formData.duration);
    data.append("price", formData.price);
    data.append("rating", formData.rating);
    data.append("reviews", formData.reviews);
    if (imageFile) data.append("image", imageFile);

    try {
      const response = await axios.post(
        "https://aaditgroups.com/api/tourismUpload",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Tour created successfully!");
        setFormData({
          title: "",
          description: "",
          duration: "",
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

      {/* Toastify Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label className="label_tourism" htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="input_tourism"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label_tourism" htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            className="textarea_tourism"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label_tourism" htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            className="input_tourism"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label_tourism" htmlFor="duration">Duration (days):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            className="input_tourism"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label className="label_tourism" htmlFor="price">Price ($):</label>
          <input
            type="number"
            id="price"
            name="price"
            className="input_tourism"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label className="label_tourism" htmlFor="rating">Rating (1-5):</label>
          <input
            type="number"
            id="rating"
            name="rating"
            className="input_tourism"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label className="label_tourism" htmlFor="reviews">Reviews:</label>
          <input
            type="number"
            id="reviews"
            name="reviews"
            className="input_tourism"
            value={formData.reviews}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default TourForm;
