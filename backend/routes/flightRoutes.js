const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/flights', async (req, res) => {
    try {
     
        const { origin, destination, date} = req.query;

        const type = '2';

     

        const url = `https://serpapi.com/search?engine=google_flights`
            + `&departure_id=${origin}`
            + `&arrival_id=${destination}`
            + `&outbound_date=${date}`
            + `&type=${type}`
            + `&hl=en`
            + `&currency=USD`
            + `&show_hidden=true`
            + `&api_key=37f4274f3dff98fc0dcf50fbed5e2101a13f829357a231d9d0ddc7f1ed0a5ba1`
            + `&output=json`;




        
            const response = await axios.get(url);

            
        //    console.log(response.data)
            if (response.data && response.data.best_flights && Array.isArray(response.data.best_flights)) {
                const flights = response.data.best_flights.map(flight => ({
                    price: flight.price,
                    departureDate: flight.outbound_date, 
                    flights: flight.flights,
                    totalFlightTime: flight.total_duration,
                    layovers: flight.layovers
                }));
                
                res.json(flights);
            } else {
                res.status(500).json({ message: 'No flights found in the response' });
            }
            
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;


