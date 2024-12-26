const express = require("express");
const route =express.Router();
const AdminController = require('../controller/AdminController')

route.post('/tourismUpload' , AdminController.TourismUpload);
route.delete('/deleteTour' , AdminController.deleteTour);
route.get('/tours' , AdminController.TourData);

module.exports = route;