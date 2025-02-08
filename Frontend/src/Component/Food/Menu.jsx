import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../Food/CardContext.jsx'; // Import the CartContext
import '../../assets/Style/Food/Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const MenuSection = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext); // Use cartContext
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [error, setError] = useState(null);
  const storedUserId = localStorage.getItem('userId');

  const categories = ['ALL', 'PIZZA/PASTA', 'SANDWICHES', 'BRUNCH', 'STEAK/GRILL', 'SALAD'];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/foods`);
        setMenuItems(response.data.foods);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to load menu items. Please try again later.');
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems = activeCategory === 'ALL' ? menuItems : menuItems.filter(item => item.category === activeCategory);

  const handleAddToCart = async (itemId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/addtocart/${itemId}/${storedUserId}`);
      if (response.status === 200) {
        addToCart(itemId); // Add to cart in context
      }
    } catch (err) {
      console.error('Error adding item to cart:', err);
      setError('Failed to add item to cart. Please try again later.');
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/removefromcart/${itemId}/${storedUserId}`);
      if (response.status === 200) {
        removeFromCart(itemId); // Remove from cart in context
      }
    } catch (err) {
      console.error('Error removing item from cart:', err);
      setError('Failed to remove item from cart. Please try again later.');
    }
  };

  return (
    <section className="menu-section">
      <h3 className="section-subtitle">Discover</h3>
      <h2 className="section-title">Our Menu</h2>
      <p className="section-description">
        White men large of on front. Via be greater related adopted proceed entered on. Through if examine express
        promises no. Past add size gone cold get off old.
      </p>

      <nav className="menu-nav">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      <div className="menu-grid">
        {error ? (
          <p className="error-message">{error}</p>
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item._id} className="menu-item">
              <img
                src={`${import.meta.env.VITE_API_URL}/api${item.image}`}
                alt={item.name}
                className="menu-item-image"
              />
              <span className="menu-item-price">{item.price}</span>
              <h3 className="menu-item-title">{item.name}</h3>
              <p className="menu-item-category">{item.category}</p>
              <p className="menu-item-description">{item.description}</p>
              <button
                onClick={() => {
                  if (cartItems.includes(item._id)) {
                    handleRemoveFromCart(item._id);
                  } else {
                    handleAddToCart(item._id);
                  }
                }}
                className="order-button"
              >
                {cartItems.includes(item._id) ? 'Remove from Cart' : 'Add to Cart'}
              </button>
            </div>
          ))
        ) : (
          <p className="no-items-message">No menu items available at the moment.</p>
        )}
      </div>

      {/* Cart Icon */}
      <div className="cart-icon-container" onClick={() => navigate('/cart')}>
        <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
        <span className="cart-item-count">{cartItems.length}</span>
      </div>
    </section>
  );
};

export default MenuSection;
