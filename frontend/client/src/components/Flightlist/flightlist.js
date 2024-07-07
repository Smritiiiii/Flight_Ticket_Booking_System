import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
import './FlightsList.css';

function FlightList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flights : initialFlights} = location.state;
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [flights, setFlights]= useState(initialFlights)
 

  const toggleSortOptions = () => {
    console.log("Toggling sort options...");
    setShowSortOptions(!showSortOptions);
  };
  

  const generateTicketNumber = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 5;
    let ticketNumber = '';
    for (let i = 0; i < length; i++) {
      ticketNumber += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return ticketNumber;
  };


  const bookFlight = (flightDetails) => {
    const ticketNumber = generateTicketNumber();
    const dataToSave = { ...flightDetails, ticketNumber };

    // Send a POST request to your backend to save the data
    axios.post('http://localhost:3001/saveFlightDetails', dataToSave)
   
      .then(response => {
        console.log('Flight details saved:', response.data);
        navigate('/signup',{ state: { ticketNumber } });
        
      })
      

      .catch(error => {
        console.error('Error saving flight details:', error);
       
      });
  };
  const sortFlightsByPrice = () => {
    const sortedFlights = [...flights].sort((a, b) => a.price - b.price);
    setFlights(sortedFlights);
  };


  const sortFlightsByLayovers = () => {
    const sortedFlights = [...flights].sort((a, b) => a.layovers.length - b.layovers.length);
    setFlights(sortedFlights);
  };

  return (
    <div className="ticket-container">
      <div className="sort-menu">
      <div className="sort-icon" onClick={toggleSortOptions}>
    <i className="fas fa-sort"></i>
  </div>
  {showSortOptions && (
    <div className="sort-options">
      <div className="sort-option" onClick={sortFlightsByPrice}>Sort based on price</div>
      <div className="sort-option" onClick={sortFlightsByLayovers}>
        Based on layovers
          </div>
        </div>
        )}
      </div>
      <h2 className="ticket-title">Flight Search Results</h2>
      {flights && flights.length > 0 ? (
        flights.map((flightGroup, index) => (
          <div key={index} className="ticket">
            <div className="ticket-header">
              <div className="origin-destination">
              {flightGroup && flightGroup.flights && flightGroup.flights.length > 0 && flightGroup.flights[0].departure_airport && flightGroup.flights[flightGroup.flights.length - 1].arrival_airport && (
            `${flightGroup.flights[0].departure_airport.name} to ${flightGroup.flights[flightGroup.flights.length - 1].arrival_airport.name}`
          )}
              </div>
              
            </div>
            <div className="flight-details">
            {flightGroup && flightGroup.flights && flightGroup.flights.map && flightGroup.flights.map((singleFlight, flightIndex) => (
                <div key={flightIndex} className="flight">
                  <img src={singleFlight.airline_logo} alt={singleFlight.airline} className="airline-logo" />
                  <div className="flight-info">
                    <p className="flight-info-item">Airline: {singleFlight.airline}</p>
                    <p className="flight-info-item">Flight Number: {singleFlight.flight_number}</p>
                    <p className="flight-info-item">
                      Departure Airport: {singleFlight.departure_airport.name} ({singleFlight.departure_airport.id})
                    </p>
                    <p className="flight-info-item">Departure Time: {singleFlight.departure_airport.time}</p>
                    <p className="flight-info-item">
                      Arrival Airport: {singleFlight.arrival_airport.name} ({singleFlight.arrival_airport.id})
                    </p>
                    <p className="flight-info-item">Arrival Time: {singleFlight.arrival_airport.time}</p>
                    <p className="flight-info-item">Duration: {singleFlight.duration} minutes</p>
                    <p className="flight-info-item">Price: {flightGroup.price}</p>
                    <p className="flight-info-item">Total Flight Time: {flightGroup.totalFlightTime} minutes</p>
                    
                    {singleFlight.extensions && (
                      <ul className="extensions-list">
                        {/* {singleFlight.extensions.map((extension, extensionIndex) => (
                          <li key={extensionIndex} className="extension-item">
                            {extension}
                          </li>
                        ))} */}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
              <div className="layovers">
                <p className="layover-title">Layovers:</p>
                <ul className="layovers-list">
                  {flightGroup.layovers.map((layover, layoverIndex) => (
                    <li key={layoverIndex} className="layover-item">
                      <p className="layover-info">Name: {layover.name}</p>
                      <p className="layover-info">ID: {layover.id}</p>
                      <p className="layover-info">Duration: {layover.duration}min</p>
                      <p className="layover-info">Overnight: {layover.overnight ? 'Yes' : 'No'}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="book-now">
            <Link to="/signup" className="book-now-button" onClick={() => bookFlight(flightGroup)}>Book Now</Link>
              
            </div>
          </div>
        ))
      ) : (
        <p>No flights found</p>
      )}
    </div>
  );
}

export default FlightList;

