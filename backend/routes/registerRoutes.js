const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Register = require('../models/register');

router.post('/flights/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = await Register.create({
            email,
            password: hashedPassword
        });

      
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
