const express = require('express');
const router = express.Router();
const Register = require('../models/register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require ('../routes/config');


router.post('/flights/login', async (req, res) => {
    try {
        const { email, password } = req.body;

       
        const user = await Register.findOne({ email });

       
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       
        const isPasswordValid = await bcrypt.compare(password, user.password);

       
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        
       
        if (email === 'admin@gmail.com' && password === 'admin') {
          
            const token = jwt.sign({ email: 'admin@gmail.com', role: 'admin' }, config.jwtSecret, { expiresIn: '1h' });
            res.json({ token });
        } else {
          
                  const token = jwt.sign({ id: user._id, email:user.email }, config.jwtSecret, { expiresIn: '1h' });
                 
        res.json({ token });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;