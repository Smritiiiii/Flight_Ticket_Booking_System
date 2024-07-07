const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const UserInfo = require('../models/userInfo');
const router = express.Router();

router.get('/admin/dashboard', authMiddleware, async (req, res) => {
    try {
    
        if (req.user.email !== 'admin@gmail.com' || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        
        
        const usersWithFlights = await UserInfo.find({});
        
    
        res.json({ usersWithFlights });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.put('/admin/dashboard/:userId', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedUserInfo = req.body; 

       
        const updatedUser = await UserInfo.findOneAndUpdate({ userId }, updatedUserInfo, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



router.delete('/admin/dashboard/:userId', authMiddleware, async (req, res) => {
    try {
        const {userId }= req.params;

        await UserInfo.findOneAndDelete(userId);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
