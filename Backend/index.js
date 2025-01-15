const express = require("express");
const dotenv = require("dotenv").config(); // Load environment variables
const mongoose = require("./config/mongoose"); // Import the Mongoose setup
const passport = require('passport');
const session = require("express-session");
const cors = require('cors');
const  MongoStore = require('connect-mongo');
const cookieParser = require("cookie-parser");
const path = require('path');
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
const allowedOrigins = [
  'https://aaditgroups.com',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the allowed list or if origin is undefined (e.g., non-browser requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Deny the request
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200); // Respond to preflight with a success status
});


app.use("/asset", express.static("asset"));
app.use("/", require("./Routes"));
const port = process.env.PORT || 8080; // Default to port 3000 if PORT is not set
app.listen(port, (err) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Server is running on Port", port);
  }
});