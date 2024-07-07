const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  
  email: String,
  password: String 

  

});

module.exports = mongoose.model('Login', LoginSchema);
