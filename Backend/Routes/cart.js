const express = require("express");
const route =express.Router();
const cartController = require('../controller/cartController');
route.get("/addtocart/:product_id/:user_id", cartController.addtocart);
route.get("/removefromcart/:product_id/:user_id", cartController.removeFromCart);
route.get("/fetchcartdetail/:user_id", cartController.cartitems);
module.exports = route;