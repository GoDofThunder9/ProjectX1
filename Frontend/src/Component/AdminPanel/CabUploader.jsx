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
    currency: "PHP", // Default to currency code
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

  // Currency options (now using codes)
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

  const handleCurrencyChange = (e) => {
    setFormData({ ...formData, currency: e.target.value }); // Store currency code
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cabUpload`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        toast.success("Cab item uploaded successfully!");
        setFormData({
          name: "",
          category: "",
          price: "",
          currency: "USD", // Reset to default currency code
          image: null,
          capacity: "",
          fuelType: "",
          mileage: "",
          transmission: "",
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to upload cab item.";
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
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price with Currency Selection */}
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <div className="price-input">
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Enter amount"
            />
            <select id="currency" name="currency" value={formData.currency} onChange={handleCurrencyChange}>
              {currencyOptions.map(({ code, name }) => (
                <option key={code} value={code}>
                  {name} ({code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacity:</label>
          <input type="text" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="fuelType">Fuel Type:</label>
          <select id="fuelType" name="fuelType" value={formData.fuelType} onChange={handleChange} required>
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
          <input type="text" id="mileage" name="mileage" value={formData.mileage} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="transmission">Transmission:</label>
          <select id="transmission" name="transmission" value={formData.transmission} onChange={handleChange} required>
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
          <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} required />
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default AdminPortal;
