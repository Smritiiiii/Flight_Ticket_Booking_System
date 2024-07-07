const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const UserInfo = require ('../models/userInfo')


router.post('/sendemail', async (req, res) => {
  try {
   
    const {  email, ticketNumber} = req.body;

    if (!ticketNumber) {
      return res.status(400).send('Ticket number is missing in the request');
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host:'smtp.gmail.com',
      auth: {
        user: 'smritijoshi34@gmail.com', 
        pass: 'anom yitt zkkw hjlq'

      }
    });

    console.log(ticketNumber)

    let mailOptions = {
      from: 'RaAirline@gmail.com',
      to: email,
      subject: 'Ticket Booking Confirmation', 
      text: `Your ticket has been successfully booked. 
      Your ticket number is: ${ticketNumber}. Thank you for choosing RA Airlines. 
      If you have any quries you can call us at +977 9800020012` 
    };

    let info = await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

module.exports = router;

