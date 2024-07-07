const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    ticketNumber: String
});

module.exports = mongoose.model('UserInfo', userSchema);

