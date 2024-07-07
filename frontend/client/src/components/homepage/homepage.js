// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './homepage.css'

// function Homepage() {
//   const [origin, setOrigin] = useState('');
//   const [destination, setDestination] = useState('');
//   const [date, setDate] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const [flights, setflights] = useState([]); // Add flights state

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const formattedDate = new Date(date).toISOString().split('T')[0]; 
//       const response = await axios.get(`http://localhost:3001/flights?origin=${origin}&destination=${destination}&date=${formattedDate}`);
    
//       setflights(response);
//       setError('');
       
//       console.log(response)

//       navigate('/flightlist', {state :{ flights: response.data }});
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.message) {
//         setError(err.response.data.message);
//       } else {
//         setError('Error fetching flights. Please try again.');
//       }
//     }
//     setLoading(false);
//   };

//   return (
//     <div className='homepage-body'>
//       <div className="navbar">
//         Airline
//       </div>
//       <div className="container">
//         <h1>Flight Search</h1>
//         <form onSubmit={handleSubmit}>
//           <label className="form-label">
//             Origin:
//             <input className="input-field" type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
//           </label>
//           <label className="form-label">
//             Destination:
//             <input className="input-field" type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
//           </label>
//           <label className="form-label">
//             Date:
//             <input className="input-field" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//           </label>
//           <button className="submit-button" type="submit" disabled={loading}>Search</button>
//         </form>
//         {loading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//       </div>
//     </div>
//   );
// }

// export default Homepage;




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './homepage.css';

function Homepage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]); // Update flights state name

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formattedDate = new Date(date).toISOString().split('T')[0]; 
      const response = await axios.get(`http://localhost:3001/flights?origin=${origin}&destination=${destination}&date=${formattedDate}`);
    
      setFlights(response.data); // Update state with response.data
      setError('');
       
      navigate('/flightlist', { state: { flights: response.data }});
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error fetching flights. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <div className='homepage-body'>
      <nav className="navbar navbar-expand-lg navbar-light">
        <span className="navbar-brand">Airline</span>
      </nav>
      <div className="container mt-7">
        <h1>Flight Search</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Origin:</label>
            <input className="form-control" type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Destination:</label>
            <input className="form-control" type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Date:</label>
            <input className="form-control" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>Search</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Homepage;
