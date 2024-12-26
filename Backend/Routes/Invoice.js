const express = require("express");
const route =express.Router();
const  InvoiceController = require('../controller/InvoiceController')

// route.get('/invoiceSender/:id' , InvoiceController.invoice)
route.get('/invoiceSender/:tourId/:userId', InvoiceController.invoice);

module.exports = route;