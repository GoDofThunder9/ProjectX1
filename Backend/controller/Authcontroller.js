const express = require("express");
const mongoose = require('../config/mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer=require('nodemailer');
const dotenv=require('dotenv').config();
const User=require("../model/user");
const tempUserStorage = new Map(); // Temporary in-memory storage for unverified usersgroups
const path = require("path");
module.exports.signup = async function (req, res) {
  const { Fullname, email, phone, Password, City, Country } = req.body;

  try {
    // Check if email already exists in the database
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: user.isVerifed
          ? "Email already exists."
          : "Email already in verification process.",
      });
    }

    // Generate OTP
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Temporarily store user details in memory
    tempUserStorage.set(email, {
      Fullname,
      phone,
      Password: hashedPassword,
      City,
      Country,
      otp: otpCode,
      otpExpiresAt: Date.now() + 15 * 60 * 1000, // OTP expires in 15 minutes
    });

    // Send OTP to user's email
    sendOTPEmail(email, otpCode);

    res.status(200).json({ message: "User registered. Please verify your email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

function sendOTPEmail(email, otpCode) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Addit Groups" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Email Verification - Addit Groups",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <div style="text-align: center;">
          <img src="cid:companyLogo" alt="Addit Groups Logo" style="max-width: 150px; margin-bottom: 20px;">
        </div>
        <h2 style="text-align: center; color: #333;">Welcome to Addit Groups!</h2>
        <p style="font-size: 16px; color: #555;">
          Thank you for choosing Addit Groups. We specialize in:
        </p>
        <ul style="font-size: 16px; color: #555; list-style-type: disc; padding-left: 20px;">
          <li>Cab Booking</li>
          <li>Food Services</li>
          <li>Tourism</li>
          <li>Movie Booking</li>
        </ul>
        <p style="font-size: 16px; color: #555;">
          Your OTP for email verification is:
          <strong style="font-size: 18px; color: #007BFF;">${otpCode}</strong>
        </p>
        <p style="font-size: 16px; color: #555;">
          If you did not request this, please ignore this email.
        </p>
        <p style="font-size: 16px; color: #555;">Best Regards,<br><strong>Addit Groups Team</strong></p>
      </div>
    `,
    attachments: [
      {
        filename: "logo.jpeg", // File name with correct extension
        path: path.join(__dirname, "/logo.jpeg"), // Path to the file
        cid: "companyLogo",
      },
    ],
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
    // Retrieve the user from temporary storage
    const tempUser = tempUserStorage.get(email);

    if (!tempUser) {
      return res
        .status(400)
        .json({ message: "No verification process found for this email." });
    }

    // Check if the OTP matches and is not expired
    if (tempUser.otp === otp && tempUser.otpExpiresAt > Date.now()) {
      // Save the user to MongoDB
      const user = new User({
        Fullname: tempUser.Fullname,
        email,
        phone: tempUser.phone,
        Password: tempUser.Password,
        City: tempUser.City,
        Country: tempUser.Country,
        isVerifed: true,
      });
      await user.save();

      // Remove the user from temporary storage
      tempUserStorage.delete(email);

      res.status(200).json({
        message: "Email verified and user registered successfully!",
      });
    } else {
      res.status(400).json({ message: "Invalid or expired OTP." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports.forgotPassword = async function (req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    // If the user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({ message: "The email you entered is not registered." });
    }

    // Generate a 6-digit OTP for password reset
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = Date.now() + 15 * 60 * 1000; // Token expires in 15 minutes

    await user.save();

    // Send OTP to the user's email
    sendResetmail(email, resetToken); 
    res.status(200).json({ message: "OTP sent to your email for password reset" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
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

  // Check if the user exists by email
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "The email address you entered is incorrect." });
    }

    // Compare provided password with the hashed password in the database
    bcrypt.compare(Password, user.Password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, Fullname: user.Fullname }; // Payload for JWT

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 3600 }, // Token expiry: 1 hour
          (err, token) => {
            if (err) {
              return res.status(500).json({ message: "An error occurred while signing the token." });
            }

            // Set cookie and send response
            res.cookie("token", token, {
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000 * 24, // Cookie expiry: 1 day
              secure: false, // Set to true if using HTTPS
              sameSite:'None', // Set to 'None' for cross-site requests, 'Lax' for same-site requests
            });

            res.json({
              success: true,
              token: "Bearer " + token,
              userId: user.id,
              userName: user.Fullname,
            });
          }
        );
      } else {
        return res.status(400).json({ message: "The password you entered is incorrect." });
      }
    });
  }).catch((err) => {
    console.error(err);
    return res.status(500).json({ message: "An internal server error occurred. Please try again later." });
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


module.exports.sendFeedback = async (req,res) =>{
  const {name , email , phone , problem , feedback} = req.body;

  if(!name || !email || !phone || !problem || !feedback) {
    return res.status(400).json({
      message : "All fields are required",
    })
  }

  const transporter = nodemailer.createTransport({
    service : "gmail",
    auth :{
      user : process.env.EMAIL_USER,
      pass : process.env.EMAIL_PASS,
    }
  });

  //Email Content
  const mailOptions = {
    from : email,
    to : process.env.EMAIL_USER,
    subject: "New Feedback from Contact Form",
    html: `
      <h3>New Feedback Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Problem:</strong> ${problem}</p>
      <p><strong>Feedback:</strong> ${feedback}</p>
    `,
  }

  //send mail
  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({
      message : "Feedback sent successfully",
    })
  } catch (error) {
    console.error("Error sending feedback email" , error);
    return res.status(500).json({error : "Failed to send Feedback email. Please try again later"})
  }
}