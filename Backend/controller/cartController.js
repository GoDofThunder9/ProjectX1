const express = require("express");
const mongoose = require("mongoose");
const User = require('../model/user');
const Food = require('../model/food');
const axios = require('axios');

module.exports.addtocart = async function (req, res) {
try {
      const {product_id,user_id} = req.params;
    const product = await Food.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Could not find the product" });
    }

    // Find the user by user_id
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "Could not find the user" });
    }

    // Add the product to the user's cart
    user.cart.push({ foodId: product._id });
    await user.save(); // Save the updated user

    res.status(200).json({
      message: "Product added to cart successfully.",
      cart: user.cart,  // Optionally send back the updated cart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while adding the product to the cart." });
  }
};
module.exports.removeFromCart = async function (req, res) {
  try {
    const { product_id, user_id } = req.params;

    // Find the user by user_id
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "Could not find the user" });
    }

    // Find the food item in the user's cart
    const foodIndex = user.cart.findIndex(item => item.foodId.toString() === product_id);
    if (foodIndex === -1) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    // Remove the item from the cart
    user.cart.splice(foodIndex, 1);

    // Save the updated user document
    await user.save();

    res.status(200).json({
      message: "Product removed from cart successfully.",
      cart: user.cart,  // Optionally send back the updated cart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while removing the product from the cart." });
  }
};
module.exports.cartitems = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find the user by user_id
    const user = await User.findById(user_id).populate('cart.foodId'); // Populate food details
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the cart items with details
    res.status(200).json({
      message: "Cart items fetched successfully.",
      cart: user.cart.map(item => ({
        foodId: item.foodId._id,
        name: item.foodId.name,
        price: item.foodId.price,
        description: item.foodId.description,
        image: item.foodId.image,
        quantity: item.quantity || 1, // Default quantity if not stored
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the cart items." });
  }
};
