import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";


function Signup(){
    const [name , setName] = useState()
    const [email , setEmail] = useState()
    const [password , setPassword] = useState()
    const Navigate= useNavigate()
    const location= useLocation()
    const { ticketNumber } = location.state || {};

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3001/flights/register', { name, email, password })

        .then(result =>
            {console.log(result)
            console.log(ticketNumber);
        Navigate('/login',{ state: { ticketNumber } })})
        
        .catch(err=> console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-5 rounded w-50">
            <h2 className="mb-4 text-center">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label"><strong>Name</strong></label>
                    <input 
                        type="text"
                        placeholder="Enter Name"
                        autoComplete="off"
                        name="name"
                        className="form-control rounded-0"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                    <input 
                        type="email"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-0"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                    <input 
                        type="password"
                        placeholder="Enter password"
                        autoComplete="off"
                        name="password"
                        className="form-control rounded-0"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100 rounded-0">
                    Register
                </button>
            </form>
            <div className="mt-3 text-center">
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    </div>
    );
}

export default Signup;