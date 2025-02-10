const express = require("express");
const mongoose = require('mongoose');
const User = require('../model/user');
const Tourism = require('../model/Tourism');
const Cab = require('../model/Cab');

module.exports.invoice = async function (req, res) {
    const { tourId, userId } = req.params; // Extract IDs from route parameters
    console.log("Tour ID:", tourId, "User ID:", userId);

    try {
        // Fetch tourism data using tourId
        const tourismData = await Tourism.findById(tourId);
        if (!tourismData) {
            return res.status(404).json({ message: "Tourism data not found." });
        }

        // Fetch user data using userId
        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User data not found." });
        }
        // Generate WhatsApp message URL
        const whatsappUrl = sendDirectWhatsAppMessage(
            userData.phone,
            tourismData.title,
            tourismData.price,
        );

        console.log("WhatsApp Message URL:", whatsappUrl);

        // Respond with both tourism and user data
        res.status(200).json({
            message: "Data fetched successfully.",
            whatsappUrl
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
module.exports.invoicecar = async function (req, res) {
    const { cabId, userId } = req.params; // Extract cabId and userId from request body
    console.log("Cab ID:", cabId, "User ID:", userId);

    try {
        // Fetch cab data using cabId
        const cabData = await Cab.findById(cabId);
        if (!cabData) {
            return res.status(404).json({ message: "Cab data not found." });
        }

        // Fetch user data using userId (Assuming you have a User model)
        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User data not found." });
        }

        // Generate WhatsApp message URL using cab and user details
        const whatsappUrl = sendDirectWhatsAppMessage(
            userData.phone,  // User's phone number
            cabData.name,
            cabData.price // User's name
        );

        console.log("WhatsApp Message URL:", whatsappUrl);

        // Respond with cab and user data along with WhatsApp URL
        res.status(200).json({
            whatsappUrl
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Function to generate WhatsApp message URL
const sendDirectWhatsAppMessage = (phone, tourismName, price) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-US', options);

    const message = `🌍 *Tour Confirmation* 🌍
    
Hello! Your booking for *${tourismName}* is placed. 🎉

📅 *Date:* ${currentDate}  
💰 *Price:* ${price}  

For more details, feel free to contact us! 📞

See you soon! ✈️🚀`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
};
