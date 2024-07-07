const jwt = require('jsonwebtoken');
const User = require('../models/userInfo');
const config = require ('../routes/config');

const authMiddleware = async (req, res, next) => {


    try { 

        const token = req.headers.authorization.split(" ")[1];


         
        const decoded =  await jwt.verify(token, config.jwtSecret);

        req.user = decoded ;

       
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};
       


module.exports = authMiddleware;
