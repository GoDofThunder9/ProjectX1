import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../Food/CardContext.jsx'; // Correct path
import axios from 'axios';
import '../../assets/Style/Cart/cart.css';

const ShoppingCart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetchcartdetail/${storedUserId}`);
        setCartItems(response.data.cart);
        setIsLoading(false);
        const initialQuantities = response.data.cart.reduce((acc, item) => {
          acc[item.foodId] = item.quantity || 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (err) {
        console.error('Error fetching cart items:', err);
        setError('Failed to load cart items. Please try again later.');
        setIsLoading(false);
      }
    };
    fetchCartItems();
  }, [setCartItems, storedUserId]);

  const handleQuantityChange = (foodId, change) => {
    setQuantities(prev => {
      const newQuantities = { ...prev };
      const newQuantity = (newQuantities[foodId] || 1) + change;
      if (newQuantity > 0) {
        newQuantities[foodId] = newQuantity;
        setCartItems(cartItems.map(item => item.foodId === foodId ? { ...item, quantity: newQuantity } : item));
      }
      return newQuantities;
    });
  };

  const removeItemFromCart = async (foodId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/removefromcart/${foodId}/${storedUserId}`);
      if (response.status === 200) {
        const updatedResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetchcartdetail/${storedUserId}`);
        setCartItems(updatedResponse.data.cart);
      }
    } catch (err) {
      console.error('Error removing item from cart:', err);
      setError('Failed to remove item from cart. Please try again later.');
    }
  };

  const handleCheckout = async () => {
    try {
      const payload = {
        userId: storedUserId,
        items: cartItems.map(item => ({
          foodId: item.foodId,
          name: item.name,
          quantity: quantities[item.foodId] || 1,
          price: item.price,
          total: item.price * (quantities[item.foodId] || 1)
        })),
        totalCost: cartItems.reduce((sum, item) => sum + item.price * (quantities[item.foodId] || 1), 0)
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/checkout`, payload);

      if (response.status === 200) {
        alert("Order placed successfully!");
        setCartItems([]);
      }
    } catch (err) {
      console.error('Error during checkout:', err);
      setError('Failed to complete checkout. Please try again.');
    }
  };

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
                  <img src={`${import.meta.env.VITE_API_URL}/api/${item.image}`} alt={item.name} />
                </div>
                <div className="product-details">
                  <div className="product-name">{item.name}</div>
                  <div className="product-variant">{item.description}</div>
                </div>
              </div>
              <div className="product-price">${item.price}</div>
              <div className="quantity-controls">
                <button className="quantity-btn" onClick={() => handleQuantityChange(item.foodId, -1)}>-</button>
                <span className="quantity">{quantities[item.foodId] || 1}</span>
                <button className="quantity-btn" onClick={() => handleQuantityChange(item.foodId, 1)}>+</button>
              </div>
              <div className="product-total">${item.price * (quantities[item.foodId] || 1)}</div>
              <button className="remove-btn" onClick={() => removeItemFromCart(item.foodId)}>×</button>
            </div>
          ))}
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row"><span>Subtotal</span><span>${cartItems.reduce((sum, item) => sum + item.price * (quantities[item.foodId] || 1), 0)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>Free</span></div>
          <button className="coupon-btn">Add coupon code →</button>
          <div className="total-row"><span>Total</span><span>${cartItems.reduce((sum, item) => sum + item.price * (quantities[item.foodId] || 1), 0)}</span></div>
          <button className="checkout-btn" onClick={handleCheckout}>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
