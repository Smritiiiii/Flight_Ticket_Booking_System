import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './components/landingPage/landing';
import Homepage from './components/homepage/homepage';
import FlightList from './components/Flightlist/flightlist';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import UserInfo from './components/userInfo/userinfo';
import AdminDashboard from './components/adminDashboard/dashboard';
import TicketDetails from './components/adminDashboard/ticketdetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" exact Component={LandingPage}/>
        <Route path ="/homepage" exact Component={Homepage}/>
        <Route path = "/flightlist" exact Component={FlightList}/>
        <Route path = "/signup" Component={Signup}/>
        <Route path = "/login" Component={Login}/>
        <Route path = "/userinfo" Component={UserInfo}/>
        <Route path = "/admin" Component={AdminDashboard}/>
        <Route path = "/ticket" Component={TicketDetails}/>
      </Routes>
    </Router>
    
  );
}

export default App;
 