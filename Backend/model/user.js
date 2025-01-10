const express = require("express");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    Fullname:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    phone:{
      type:String,
      required:true
    },
    Password:{
      type:String,
      required:true
    },
    City:{
      type:String,
      required:true
    },
    Country:{
      type:String,
      required:true
    },
    isVerifed:{
      type:Boolean,
      default:false,
  },
  otp: {
    type: String,
    default: null,
  },
  otpExpiresAt: {
    type: Date,
    default: null,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpiresAt: {
    type: Date,
    default: null,
  },
  cart: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',  // Reference to the Food model
        required: true,
      },
  }]},
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
