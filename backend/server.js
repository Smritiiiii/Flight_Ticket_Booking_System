const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios'); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/flight_booking')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

const authMiddleware = require('./middleware/authMiddleware'); 
const flights = require('./routes/flightRoutes');
const flightList = require('./routes/flightListRoutes')
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const userInfoRoutes = require('./routes/userinfoRoutes');
const mailRoutes = require('./routes/mailRoutes')
const adminDashboard = require('./routes/adminDashboardRoutes');
const fetchUserandFlight = require('./routes/fetchuserinfoFlight')

app.use('/admin', authMiddleware); 
app.use('/admin', adminDashboard); 


app.use('/', flights); 
app.use('/', registerRoutes);
app.use('/', loginRoutes);
app.use('/', userInfoRoutes);
app.use('/', mailRoutes)
app.use ('/', flightList);
app.use('/',fetchUserandFlight)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

