const express = require("express");
const route =express.Router();
console.log("router loaded");
route.use('/',require('./home'));
route.use('/',require('./Auth'));
route.use('/',require('./Admin'));
route.use('/',require('./Invoice'));
route.use('/',require('./cart'));
module.exports = route;