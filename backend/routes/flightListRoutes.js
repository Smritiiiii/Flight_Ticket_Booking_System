const express = require('express');
const Flight = require('../models/flight');

// Initialize Express Router
const router = express.Router();

// Define a route to handle POST requests for saving flight details
router.post('/saveFlightDetails', (req, res) => {
  const flightData = req.body;
  

  // Create an array to store flights
  const flights = flightData.flights.map(singleFlightData => {
    return {
      airline: singleFlightData.airline,
      flight_number: singleFlightData.flight_number,
      departure_airport: {
        id: singleFlightData.departure_airport.id,
        name: singleFlightData.departure_airport.name,
        time: singleFlightData.departure_airport.time
      },
      arrival_airport: {
        name: singleFlightData.arrival_airport.name,
        id: singleFlightData.arrival_airport.id,
        time: singleFlightData.arrival_airport.time
      },
      duration: singleFlightData.duration
    };
  });

  // Create a new Flight document using the data sent from the frontend
  const newFlight = new Flight({
    flights: flights,
    price: flightData.price,
    layovers: flightData.layovers.map(layover => ({
      name: layover.name,
      id: layover.id,
      duration: layover.duration,
      overnight: layover.overnight
    })),
    totalFlightTime: flightData.totalFlightTime,
    ticketNumber: flightData.ticketNumber
  });

  // Save the new Flight document to the database
  newFlight.save()
    .then(savedFlight => {
      // console.log('Flight details saved:', savedFlight);
      res.status(201).json(savedFlight);
    })
    .catch(error => {
      console.error('Error saving flight details:', error);
      res.status(500).json({ error: 'Failed to save flight details' });
    });
});

module.exports = router;
