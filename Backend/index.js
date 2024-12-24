const express = require("express");
const dotenv = require("dotenv").config(); // Load environment variables
const mongoose = require("./config/mongoose"); // Import the Mongoose setup
const passport = require('passport');
const session = require("express-session");
const cors = require('cors');
const  MongoStore = require('connect-mongo');
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin:'http://localhost:5173', // Your frontend origin
  credentials:true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use("/asset", express.static("asset"));
app.use("/", require("./Routes"));
const port = process.env.PORT || 3000; // Default to port 3000 if PORT is not set
app.listen(port, (err) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Server is running on Port", port);
  }
});
