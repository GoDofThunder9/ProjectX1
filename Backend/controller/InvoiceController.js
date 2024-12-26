const express = require("express");
const mongoose = require('mongoose');
const User = require('../model/user');
const Tourism = require('../model/Tourism');
const axios = require('axios');


module.exports.invoice = async function (req, res) {
      const { tourId, userId } = req.params; // Extract IDs from route parameters
      console.log("Tour ID:", tourId, "User ID:", userId);

      try {
        // Fetch tourism data using tourId
        const tourismData = await Tourism.findById(tourId);

        if (!tourismData) {
          return res.status(404).json({ message: "Tourism data not found." });
        }

        // Optionally, fetch user data using userId (if required)
        const userData = await User.findById(userId);

        if (!userData) {
          return res.status(404).json({ message: "User data not found." });
        }

        // Respond with both tourism and user data
        res.status(200).json({
          message: "Data fetched successfully.",
        //   tourism: tourismData,
        //   user: userData,
        });

        
    // Define the API endpoint and payload
        const url = 'https://graph.facebook.com/v21.0/537449016112360/messages';
        const token = 'EAAH8EiLPkWcBO282ZAetsZBi42DVZCtWduv2PnguFoQ2fobWlIZC5Wmazc1pyJppmwZAtKpjHeZCgrn8qsBuZA5gmZBZCMDIZBGLp8k1LNEapOM1vXHaCjiMU4CdeGBllTKLkUxQNwacljGWgOnZCcDpR4Tmd0SMrLPIa3Qo43KyW9gjLjUd9JJgrIZA1TxOTigkLZAmeZAgADZByPxqD26H53bzauWtQGwbBsZD';

        const data = {
          messaging_product: 'whatsapp',
          to: `${userData.phone}`,
          type: 'template',
          template: {
            name: 'hello_world',
            language: {
              code: 'en_US'
            }
          }
        };

        // Make the POST request
        axios.post(url, data, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log('Message sent successfully:', response.data);
        })
        .catch(error => {
          console.error('Error sending message:', error.response ? error.response.data : error.message);
        });



      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "An error occurred while fetching data." });
      }
};


