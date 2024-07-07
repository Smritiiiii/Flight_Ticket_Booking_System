import React from 'react';
import { useLocation } from 'react-router-dom';
import './TicketDetails.css'; 

const TicketDetails = () => {
    const location = useLocation();
    const { userInfo, flightDetails } = location.state;

    return (
        <div className="ticket-details-container">
            <div className="background"></div> 
            <div className="container mt-5">
                <div className="row mb-4">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Personal Information</h5>
                                <p className="card-text">User ID: {userInfo.userId}</p>
                                <p className="card-text">Title: {userInfo.title}</p>
                                <p className="card-text">First Name: {userInfo.firstName}</p>
                                <p className="card-text">Middle Name: {userInfo.middleName}</p>
                                <p className="card-text">Last Name: {userInfo.lastName}</p>
                                <p className="card-text">Phone Number: {userInfo.phoneNumber}</p>
                                <p className="card-text">Email: {userInfo.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Flight Details</h5>
                                <p className="card-text">Ticket Number: {flightDetails.ticketNumber}</p>
                                <p className="card-text">Price: {flightDetails.price}</p>
                                <p className="card-text">Total Flight Time: {flightDetails.totalFlightTime}</p>
                                {flightDetails.flights && flightDetails.flights.length > 0 && (
                                    <div>
                                        <h6 className="card-subtitle mb-2">Flights:</h6>
                                        <ul className="list-group list-group-flush">
                                            {flightDetails.flights.map((flight, index) => (
                                                <li className="list-group-item" key={index}>
                                                    <p>Flight Number: {flight.flight_number}</p>
                                                    <p>Departure Airport: {flight.departure_airport.name} ({flight.departure_airport.id})</p>
                                                    <p>Departure Time: {new Date(flight.departure_airport.time).toLocaleString()}</p>
                                                    <p>Arrival Airport: {flight.arrival_airport.name} ({flight.arrival_airport.id})</p>
                                                    <p>Arrival Time: {new Date(flight.arrival_airport.time).toLocaleString()}</p>
                                                    <p>Duration: {flight.duration} minutes</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketDetails;
