const express = require("express");
const route =express.Router();
console.log("router loaded");
route.use('/',require('./home'));
route.use('/',require('./Auth'));
module.exports = route;