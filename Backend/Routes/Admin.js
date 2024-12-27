const express = require("express");
const route =express.Router();
const AdminController = require('../controller/AdminController')

route.post('/tourismUpload' , AdminController.TourismUpload);
route.post('/foodUpload' , AdminController.FoodUpload);
route.delete('/deleteTour' , AdminController.deleteTour);
route.delete('/foodDelete' , AdminController.deleteFood);
route.get('/tours' , AdminController.TourData);
route.get('/foods' , AdminController.FoodData);

module.exports = route;