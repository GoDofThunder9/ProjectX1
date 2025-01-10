import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../Food/CardContext.jsx'; // Correct path
import axios from 'axios';
import '../../assets/Style/Cart/cart.css';

const ShoppingCart = () => {
  const { cartItems, setCartItems } = useContext(CartContext); // Make sure you're using the correct context
  const [quantities, setQuantities] = useState({}); // State to track quantities
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedUserId = localStorage.getItem('userId'); // Get user ID from localStorage

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://65.0.199.218:8080/fetchcartdetail/${storedUserId}`);
        setCartItems(response.data.cart); // Update context with fetched cart items (full objects)
        setIsLoading(false); // Set loading to false after fetching
        // Initialize quantities for each item in the cart
        const initialQuantities = response.data.cart.reduce((acc, item) => {
          acc[item.foodId] = item.quantity || 1; // Set default quantity to 1 if not available
          return acc;
        }, {});
        setQuantities(initialQuantities); // Initialize quantities state
      } catch (err) {
        console.error('Error fetching cart items:', err);
        setError('Failed to load cart items. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchCartItems(); // Fetch cart items when the component mounts
  }, [setCartItems, storedUserId]);

  const handleQuantityChange = (foodId, change) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      const newQuantity = (newQuantities[foodId] || 1) + change;
      if (newQuantity > 0) { // Prevent negative quantities
        newQuantities[foodId] = newQuantity;
        setCartItems(cartItems.map(item => item.foodId === foodId ? { ...item, quantity: newQuantity } : item));
      }
      return newQuantities;
    });
  };

  const removeItemFromCart = async (foodId) => {
    try {
      // Make API call to remove item from cart on the backend
      const response = await axios.get(`http://65.0.199.218:8080/removefromcart/${foodId}/${storedUserId}`);
      if (response.status === 200) {
        // After successful removal, re-fetch the updated cart items
        const updatedResponse = await axios.get(`http://65.0.199.218:8080/fetchcartdetail/${storedUserId}`);
        setCartItems(updatedResponse.data.cart); // Update context with the new cart
      }
    } catch (err) {
      console.error('Error removing item from cart:', err);
      setError('Failed to remove item from cart. Please try again later.');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (quantities[item.foodId] || 1), 0);
  const shipping = 'Free';
  const total = subtotal;

  if (isLoading) return <div>Loading cart...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-header">
            <div>PRODUCT</div>
            <div>PRICE</div>
            <div>QUANTITY</div>
            <div>TOTAL</div>
            <div></div>
          </div>

          {cartItems.map((item) => (
            <div key={item.foodId} className="cart-item">
              <div className="product-info">
                <div className="product-image">
                  <img src={`http://65.0.199.218:8080${item.image}`} alt={item.name} />
                </div>
                <div className="product-details">
                  <div className="product-name">{item.name}</div>
                  <div className="product-variant">{item.description}</div>
                </div>
              </div>
              <div className="product-price">${item.price}</div>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.foodId, -1)} // Decrease quantity
                >
                  -
                </button>
                <span className="quantity">{quantities[item.foodId] || 1}</span> {/* Show current quantity */}
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.foodId, 1)} // Increase quantity
                >
                  +
                </button>
              </div>
              <div className="product-total">${item.price * (quantities[item.foodId] || 1)}</div>
              <button
                className="remove-btn"
                onClick={() => removeItemFromCart(item.foodId)} // Use removeItemFromCart to remove item from backend
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping}</span>
          </div>
          <button className="coupon-btn">Add coupon code →</button>
          <div className="total-row">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <button className="checkout-btn">CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
