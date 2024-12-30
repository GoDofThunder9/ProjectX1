const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/assets/CabImages');
console.log("AVATAR PATH" , AVATAR_PATH)

// Define the schema
const CabSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Configure Multer storage
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.join(__dirname, '..', AVATAR_PATH)); 
    const destinationPath = path.join(__dirname, '..', AVATAR_PATH).replace(/\\/g, '/');
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    // Extract the original file extension
    const fileExtension = path.extname(file.originalname).toLowerCase();

    // Validate .jpg format
    if (fileExtension !== '.jpg') {
      return cb(new Error('Only .jpg files are allowed'));
    }

    // Use the original filename
    cb(null, file.originalname);
  }
});

// Configure Multer file filter
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg files are allowed'), false);
  }
};

// Add Multer instance to the schema
CabSchema.statics.uploadAvatar = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single('image');

CabSchema.statics.avatarPath = AVATAR_PATH;

// Create the model
const Cab = mongoose.model('Cab', CabSchema);

module.exports = Cab;