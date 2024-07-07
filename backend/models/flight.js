const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flights:[{
   departure_airport: {
      name: String,
      id: String,
      time: Date
    },
    
  arrival_airport: {
    name: String,
    id: String,
    time: Date
  },
 duration: Number,
 airplane:String,
 airline: String,
  flight_number: String,
}],
  price: Number,
  layovers: [{
    name: String,
    id: String,
    duration: Number,
    overnight: Boolean
  }],
  totalFlightTime: Number,
  ticketNumber: String
});
module.exports = mongoose.model('Flight', flightSchema);
