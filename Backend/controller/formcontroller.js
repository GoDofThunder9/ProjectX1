const User = require('../model/user');
module.exports.Form = async (req, res) => {
    try {
      // Extract data from the request body
      const { name, email, tel, area } = req.body;
  
      // Validate required fields
      if (!name || !email || !tel || !area) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Create a new user document
      const user = new User({ name, email, tel, area });
  
      // Save the user document to the database
      await user.save();
  
      // Respond with the saved user
      res.status(201).json({ message: "User added successfully", user });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };