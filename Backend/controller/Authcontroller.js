const express = require("express");
const mongoose = require('../config/mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer=require('nodemailer');
const dotenv=require('dotenv').config();
const User=require("../model/user");
module.exports.signup = async function (req,res) {
    
    const { Fullname, email,phone,Password,City,Country} = req.body;
    try{
      let user = await User.findOne({email});
      if(user){
        if(user.isVerifed){
          return res.status(400).json({message:'Email already exists'})
        }
        else{
          return res.status(400).json({message:'Email already in verfication process'})
        }
      }
      const otpCode=Math.floor(1000+Math.random()*9000).toString();
      const salt=await bcrypt.genSalt(10);
      const hashedPassword=await bcrypt.hash(Password,salt);
      user=new User({
        Fullname,
        email,
        phone,
        Password:hashedPassword,
        City,
        Country,
        otp:otpCode,
        otpExpiresAt:Date.now()+15*60*1000
      })
      await user.save();
      sendOTPEmail(email, otpCode);
      res.status(200).json({ message: 'User registered, please verify your email.' });
    }  catch(err){
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
function sendOTPEmail(email, otpCode) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Your OTP for email verification is: ${otpCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports.sendotp = async function (req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No verification process found for this email." });
    }
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    user.otp = otpCode;
    user.otpExpiresAt = Date.now() + 15 * 60 * 1000;

    await user.save();
    sendOTPEmail(email, otpCode);
    return res.status(200).json({ message: "OTP sent" });
  } catch (error) {
    return res.status(400).json({ message: "process failed" });
  }
};
module.exports.verifyEmail = async function (req, res) {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "No verification process found for this email." });
    }

    // Check if the OTP matches and is not expired
    if (user.otp === otp && user.otpExpiresAt > Date.now()) {
      // Update the user as verified
      user.isVerifed = true;
      user.otp = null;
      user.otpExpiresAt = null;

      await user.save();

      res
        .status(200)
        .json({ message: "Email verified and user registered successfully!" });
    } else {
      res.status(400).json({ message: "Invalid or expired OTP." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports.forgotPassword = async function (req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const resetToken = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = Date.now() + 15 * 60 * 1000; // Token expires in 15 minutes

    await user.save();

    sendResetmail(email, resetToken); // Send OTP to user's email
    res
      .status(200)
      .json({ message: "OTP sent to your email for password reset" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

function sendResetmail(email, resetToken) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for resetting your password is: ${resetToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
module.exports.verifyResetToken = async function (req, res) {
  const { email, token } = req.body;

  try {
    const user = await User.findOne({
      email: email,
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }, // Check if token is still valid
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({
      message: "OTP verified successfully. You can now reset your password.",
    });
    // At this point, the frontend should redirect the user to the reset password page.
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports.resetPassword = async function (req, res) {
  const { email, token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      email:email,
      resetPasswordToken:token,
      resetPasswordExpiresAt:{$gt: Date.now() }, // Check if token is still valid
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = null;
    user.resetPasswordExpiresAt = null;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.login = async function (req, res) {
  const { email, Password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }
    bcrypt.compare(Password, user.Password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, Fullname: user.Fullname };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 3600 }, // 1 hour
          (err, token) =>{
            if (err) {
              return res.status(500).json({ error: "Error signing token" });
            }
            res.cookie("token", token, {
              httpOnly:true,  
              Secure:false, // Set to true if using HTTPS
              maxAge:24*60*60*1000, // 1 hour
              SameSite:'None', // Set to 'None' for cross-site requests, 'Lax' for same-site requests
            });
            res.json({
              success: true,
              token: "Bearer" + token,
              userId: user.id,
              userName: user.Fullname
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
};
module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Assuming token is stored in cookies

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace JWT_SECRET with your secret key
    req.user = decoded; // Attach decoded token data (e.g., user ID) to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
module.exports.logout = async function (req, res) {
  // Clear the JWT cookie
  res.clearCookie("token");

  // Optionally, you can also respond with a message or redirect the user
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
}
