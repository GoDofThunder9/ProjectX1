import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const CartContext = createContext();

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Fetch cartItems from localStorage when initializing state
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Persist cartItems to localStorage whenever it changes
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cartItems to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevCart) => [...prevCart, item]); // Add item to cart
  };

  const removeFromCart = (foodId) => {
    setCartItems((prevCart) => prevCart.filter(item => item !== foodId)); // Removes by foodId if it's just an array of ids
  };
  
  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
