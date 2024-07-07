const express = require('express');
const UserInfo = require('../models/userInfo');
const Flight = require('../models/flight');
const router = express.Router();

// Route to fetch user info and flight details based on ticket number
router.get('/userinfo/:ticketNumber', async (req, res) => {
    try {
        const ticketNumber = req.params.ticketNumber;
        
        // Find user info based on ticket number
        const userInfo = await UserInfo.findOne({ ticketNumber });

        // If user info not found, return error
        if (!userInfo) {
            return res.status(404).json({ message: 'User info not found for the provided ticket number.' });
        }

        // Find flight details based on ticket number
        const flightDetails = await Flight.findOne({ ticketNumber });

        // If flight details not found, return error
        if (!flightDetails) {
            return res.status(404).json({ message: 'Flight details not found for the provided ticket number.' });
        }

        // If both user info and flight details found, return them
        res.status(200).json({ userInfo, flightDetails });
    } catch (error) {
        console.error('Error fetching user info and flight details:', error);
        res.status(500).json({ message: 'An error occurred while fetching user info and flight details.' });
    }
});

module.exports = router;
