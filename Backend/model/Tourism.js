const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/assets/TourismImages');
console.log("AVATAR PATH", AVATAR_PATH);

// Define the schema
const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  reviews: {
    type: Number,
    min: 0,
  },
}, {
  timestamps: true,
});

// Configure Multer storage
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, '..', AVATAR_PATH).replace(/\\/g, '/');
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    // Extract the original file extension
    const fileExtension = path.extname(file.originalname).toLowerCase();

    // Validate .jpg, .jpeg, or .png formats
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    if (!allowedExtensions.includes(fileExtension)) {
      return cb(new Error('Only .jpg, .jpeg, or .png files are allowed'));
    }

    // Use the original filename
    cb(null, file.originalname);
  }
});

// Configure Multer file filter
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg, or .png files are allowed'), false);
  }
};

// Add Multer instance to the schema
tourSchema.statics.uploadAvatar = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single('image');

tourSchema.statics.avatarPath = AVATAR_PATH;

// Create the model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
