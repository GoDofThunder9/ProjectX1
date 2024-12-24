const express = require("express");
const verify = require("../controller/Authcontroller")
const route =express.Router();
console.log("router loaded");
const authcontroller = require('../controller/Authcontroller');
route.post("/signup", authcontroller.signup);
route.post("/verify-email", authcontroller.verifyEmail);
route.post("/resendotp", authcontroller.sendotp);
route.post("/login", authcontroller.login);
route.post("/forgot-password", authcontroller.forgotPassword);
route.get('/protected', verify.verifyToken,(req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });
// Route to verify the OTP sent to the user's email
route.post("/verify-reset-token", authcontroller.verifyResetToken);

// Route to reset the password (after OTP is verified)
route.post("/reset-password", authcontroller.resetPassword);
route.post("/logout", authcontroller.logout);
module.exports = route;