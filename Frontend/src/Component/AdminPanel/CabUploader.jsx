import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CabUploader.css";

const AdminPortal = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
    capacity: "",
    fuelType: "",
    mileage: "",
    transmission: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const categories = ["SUV", "Sedan", "Hatchback", "Luxury"];
  const fuelOptions = ["Petrol", "Diesel", "Electric"];
  const transmissionOptions = ["Automatic", "Manual"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("capacity", formData.capacity);
    formDataToSend.append("fuelType", formData.fuelType);
    formDataToSend.append("mileage", formData.mileage);
    formDataToSend.append("transmission", formData.transmission);

    try {
      const response = await axios.post(
        "https://aaditgroups.com/api/cabUpload",
        //  "http://localhost:8080/api/cabUpload" ,// Your API endpoint
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Cab item uploaded successfully!");
        setFormData({
          name: "",
          category: "",
          price: "",
          image: null,
          capacity: "",
          fuelType: "",
          mileage: "",
          transmission: "",
        });
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to upload cab item.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-portal">
      <ToastContainer />
      <h2>Admin Portal - Add Cab Item</h2>

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
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="text"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fuelType">Fuel Type:</label>
          <select
            id="fuelType"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            required
          >
            <option value="">Select Fuel Type</option>
            {fuelOptions.map((fuel) => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mileage">Mileage:</label>
          <input
            type="text"
            id="mileage"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="transmission">Transmission:</label>
          <select
            id="transmission"
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            required
          >
            <option value="">Select Transmission</option>
            {transmissionOptions.map((trans) => (
              <option key={trans} value={trans}>
                {trans}
              </option>
            ))}
          </select>
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

        <button
          type="submit"
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default AdminPortal;
