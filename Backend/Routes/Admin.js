const express = require("express");
const route =express.Router();
const AdminController = require('../controller/AdminController')

route.post('/tourismUpload' , AdminController.TourismUpload);
route.post('/foodUpload' , AdminController.FoodUpload);
route.post('/cabUpload' , AdminController.CabUpload);
route.delete('/deleteTour' , AdminController.deleteTour);
route.delete('/foodDelete' , AdminController.deleteFood);
route.delete('/cabDelete' , AdminController.deleteCab);
route.get('/tours' , AdminController.TourData);
route.get('/foods' , AdminController.FoodData);
// route.get('/cabs',AdminController.CabData);
route.get('/cabs' , AdminController.CabData);
route.put('/foodUpadte' , AdminController.updateFood);

module.exports = route;