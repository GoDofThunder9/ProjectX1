const express = require('express')
const mongooose = require('mongoose')
const tourSchema = require('../model/Tourism')
const FoodSchema = require('../model/food')
const CabSchema = require('../model/Cab')
const path = require('path')
const fs = require('fs');

module.exports.TourData = async function (req,res) {
  const tours = await tourSchema.find();
  res.status(200).json({ tours});
}
module.exports.FoodData = async function (req,res) {
  const foods = await FoodSchema.find();
  res.status(200).json({ foods});
}
module.exports.CabData = async function (req,res) {
  const cabs = await CabSchema.find();
  res.status(200).json({ cabs});
}

module.exports.TourismUpload = async function (req, res) {
    // Use the Multer middleware to handle file uploads
    tourSchema.uploadAvatar(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: 'File upload failed', error: err.message });
      }
  
      // Extract form fields and uploaded file information
      const { title, description, duration, price, rating, reviews } = req.body;
      // const image = req.file ? tourSchema.avatarPath + "/" + req.file.filename : null; 
      // const image = req.file ? req.file.filename : null;
      const image = req.file
      ? path.join(tourSchema.avatarPath, req.file.filename).replace(/\\/g, '/')
      : null;
      
      console.log(image);
  
      try {
        // Validate if the required fields are provided
        if (!title || !description || !duration || !price) {
          return res.status(400).json({ message: 'Required fields are missing' });
        }
  
        // Create a new tour document
        const newTour = new tourSchema({
          title,
          description,
          image,
          duration,
          price,
          rating: rating || null, // Optional fields
          reviews: reviews || null, // Optional fields
        });
  
        // Save to the database
        await newTour.save();
  
        // Respond with success
        res.status(200).json({ message: 'Tour created successfully', tour: newTour });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
      }
    });
  };
  // const path = require('path');
  
  module.exports.deleteTour = async function (req, res) {
    try {
      const { title } = req.body;
  
      if (!title) {
        return res.status(400).json({ message: 'Title is required to delete the tour' });
      }
  
      // Find the tour by title and delete it
      const deletedTour = await tourSchema.findOneAndDelete({ title });
  
      if (!deletedTour) {
        return res.status(404).json({ message: 'Tour not found with the provided title' });
      }
  
      // If an image exists, delete it from the assets folder
      if (deletedTour.image) {
        const imagePath = path.join(__dirname, '..', deletedTour.image);
  
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Error deleting the image file:', err.message);
            return res.status(500).json({
              message: 'Tour deleted, but failed to delete the associated image file',
              error: err.message,
            });
          }
  
          console.log(`Image file deleted successfully: ${imagePath}`);
        });
      }
  
      res.status(200).json({ message: 'Tour deleted successfully', deletedTour });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  module.exports.FoodUpload = async function (req, res) {
  // Use the Multer middleware to handle file uploads
  FoodSchema.uploadAvatar(req, res, async function (err) {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ message: "File upload failed", error: err.message });
    }

    // Extract form fields and uploaded file information
    const { name, category, price, description } = req.body;

    // Construct the image path if the file was uploaded
    const image = req.file
      ? path.join(FoodSchema.avatarPath, req.file.filename).replace(/\\/g, "/")
      : null;

    console.log("Uploaded image path:", image);

    try {
      // Validate if the required fields are provided
      if (!name || !category || !price || !description) {
        return res.status(400).json({ message: "Required fields are missing" });
      }

      // Create a new food document
      const newFood = new FoodSchema({
        name,
        category,
        price,
        description,
        image,
      });

      // Save to the database
      await newFood.save();

      // Respond with success
      res.status(200).json({ message: "Food item created successfully", food: newFood });
    } catch (err) {
      console.error("Error saving food item:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });
};
module.exports.deleteFood = async function (req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required to delete the food item' });
    }

    // Find the food item by name and delete it
    const deletedFood = await FoodSchema.findOneAndDelete({ name });

    if (!deletedFood) {
      return res.status(404).json({ message: 'Food item not found with the provided name' });
    }
    // If an image exists, delete it from the assets folder
    if (deletedFood.image) {
      const imagePath = path.join(__dirname, '..', deletedFood.image).replace(/\\/g, '/');
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting the image file:', err.message);
          return res.status(500).json({
            message: 'Food item deleted, but failed to delete the associated image file',
            error: err.message,
          });
        }

        console.log(`Image file deleted successfully: ${imagePath}`);
      });
    }

    res.status(200).json({ message: 'Food item deleted successfully', deletedFood });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
module.exports.updateFood = async function (req, res) {
  try {
    const { name, updatedFields } = req.body;

    if (!name || !updatedFields) {
      return res.status(400).json({ message: 'Name and updated fields are required' });
    }

    // Find the food item by name
    const existingFood = await FoodSchema.findOne({ name });

    if (!existingFood) {
      return res.status(404).json({ message: 'Food item not found with the provided name' });
    }

    // Update the fields provided in updatedFields
    Object.keys(updatedFields).forEach((key) => {
      existingFood[key] = updatedFields[key];
    });

    // If an image is being updated
    if (req.file) {
      const oldImagePath = path.join(__dirname, '..', existingFood.image).replace(/\\/g, '/');

      // Replace the old image path with the new one
      existingFood.image = `/assets/uploads/${req.file.filename}`;

      // Delete the old image file
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error('Error deleting the old image file:', err.message);
          return res.status(500).json({
            message: 'Food item updated, but failed to delete the old image file',
            error: err.message,
          });
        }
        console.log(`Old image file deleted successfully: ${oldImagePath}`);
      });
    }

    // Save the updated food item
    await existingFood.save();

    res.status(200).json({ message: 'Food item updated successfully', updatedFood: existingFood });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
// const path = require("path");
// const CabSchema = require("../models/Cab"); // Adjust the path based on your project structure

module.exports.CabUpload = async function (req, res) {
  // Use the Multer middleware to handle file uploads
  CabSchema.uploadAvatar(req, res, async function (err) {
    if (err) {
      console.error("File upload error:", err);
      return res
        .status(400)
        .json({ message: "File upload failed", error: err.message });
    }

    // Extract form fields and uploaded file information
    const { name, category, price, capacity, fuelType, mileage, transmission } =
      req.body;

    // Construct the image path if the file was uploaded
    const image = req.file
      ? path.join(CabSchema.avatarPath, req.file.filename).replace(/\\/g, "/")
      : null;

    console.log("Uploaded image path:", image);

    try {
      // Validate if the required fields are provided
      if (
        !name ||
        !category ||
        !price ||
        !capacity ||
        !fuelType ||
        !mileage ||
        !transmission
      ) {
        return res
          .status(400)
          .json({ message: "Required fields are missing" });
      }

      // Create a new cab document
      const newCab = new CabSchema({
        name,
        category,
        price,
        capacity,
        fuelType,
        mileage,
        transmission,
        image,
      });

      // Save to the database
      await newCab.save();

      // Respond with success
      res
        .status(201)
        .json({ message: "Cab item created successfully", cab: newCab });
    } catch (err) {
      console.error("Error saving cab item:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });
};

module.exports.deleteCab = async function (req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required to delete the food item' });
    }

    // Find the food item by name and delete it
    const deletedCab = await CabSchema.findOneAndDelete({ name });

    if (!deletedCab) {
      return res.status(404).json({ message: 'Cab item not found with the provided name' });
    }
    // If an image exists, delete it from the assets folder
    if (deletedCab.image) {
      const imagePath = path.join(__dirname, '..', deletedCab.image).replace(/\\/g, '/');
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting the image file:', err.message);
          return res.status(500).json({
            message: 'Cab item deleted, but failed to delete the associated image file',
            error: err.message,
          });
        }

        console.log(`Image file deleted successfully: ${imagePath}`);
      });
    }

    res.status(200).json({ message: 'Food item deleted successfully', deletedCab });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};