import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { ticketNumber } = location.state || {};

  const handleSubmit = (e) => {
    e.preventDefault()
    
    axios.post('http://localhost:3001/flights/login', { email, password })
      .then(result => {

       const token = result.data.token;

        if (token) {

            localStorage.setItem('token', token)

          if (email === 'admin@gmail.com') {
            navigate('/admin');
          } else {
          navigate('/userinfo', { state: { ticketNumber } });
         
        }
    }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-5 rounded w-50" style={{ overflow: 'hidden', position: 'relative' }}>
                <h2 className="text-center mb-4" style={{ color: '#07315B' }}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            style={{ height: '50px', fontSize: '16px' }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            style={{ height: '50px', fontSize: '16px' }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-center"> 
                        <button type="submit" className="btn btn-primary w-100 rounded-0" style={{ height: '50px', fontSize: '16px' }}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
  );
}

export default Login;
