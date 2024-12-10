const express = require("express");
const formcontroller = require('../controller/formcontroller');
const route =express.Router();
console.log("router loaded");

route.post('/form',formcontroller.Form);
module.exports = route;