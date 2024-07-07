const express = require('express');
const router = express.Router();
const UserInfo = require('../models/userInfo');
const Flight = require('../models/flight'); // Import Flight model



router.post('/userinfo', async (req, res) => {
    try {
       
        const lastFlight = await Flight.findOne().sort({ _id: -1 });
         const ticketNumber = lastFlight.ticketNumber; 

         console.log('Received ticket number:', ticketNumber);


        const userCount = await UserInfo.countDocuments();
        const userId = String(userCount + 1).padStart(2, '0');
      
        const { title, firstName, middleName, lastName, phoneNumber, email} = req.body;

        const userinfo = new UserInfo({
            userId,
            title,
            firstName,
            middleName,
            lastName, 
            phoneNumber,
            email,
            ticketNumber
        });

        await userinfo.save();
       

        res.status(200).json({ message: 'User details submitted successfully.', userId });
    } catch (error) {
        console.error('Error submitting user details:', error);
        res.status(500).json({ message: 'An error occurred while submitting user details.' });
    }
});

module.exports = router ; 

