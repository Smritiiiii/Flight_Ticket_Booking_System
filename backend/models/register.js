const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String 

  

});

module.exports = mongoose.model('Register', RegisterSchema);
