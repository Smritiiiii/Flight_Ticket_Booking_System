import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
    const [usersWithFlights, setUsersWithFlights] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editableUserId, setEditableUserId] = useState(null); 
    const [updatedData, setUpdatedData] = useState({}); 
    const [ticketNumberInput, setTicketNumberInput] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [flightDetails, setFlightDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const response = await axios.get('http://localhost:3001/admin/admin/dashboard', { headers });
            setUsersWithFlights(response.data.usersWithFlights);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleUpdate = async (userId) => {
        try {
            setEditableUserId(userId); 
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleInputChange = (e) => {
        // Update the updatedData state with the new input value
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleSave = async (userId) => {
        try {
            // Send updated data to backend
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };
            await axios.put(`http://localhost:3001/admin/admin/dashboard/${userId}`, updatedData, { headers });
            console.log('User updated successfully');
            setEditableUserId(null); // Clear editable user id
            fetchData(); // Refresh data after update
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };

            await axios.delete(`http://localhost:3001/admin/admin/dashboard/${userId}`, { headers });
            setUsersWithFlights(usersWithFlights.filter(user => user._id !== userId));
            console.log('User deleted successfully:', userId);

            fetchData(); 
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    
    const filteredUsers = usersWithFlights.filter(user =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchByTicketNumber = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };
            // Fetch user info based on ticket number
            const response = await axios.get(`http://localhost:3001/userinfo/${ticketNumberInput}`, { headers });
            const { userInfo, flightDetails } = response.data;

            setUserInfo(userInfo);
            setFlightDetails(flightDetails);

            navigate('/ticket', { state: { userInfo, flightDetails } })
             // Set user info state
        } catch (error) {
            console.error('Error fetching user info:', error);
            setUserInfo(null); 
            setFlightDetails(null);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2 className="mb-4">Admin Dashboard</h2>
            <div className="row mb-3">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by first name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="col">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter ticket number"
                            value={ticketNumberInput}
                            onChange={(e) => setTicketNumberInput(e.target.value)}
                        />
                        <button 
                            className="btn btn-primary" 
                            onClick={handleSearchByTicketNumber}
                        >
                            Search by Ticket Number
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="table-container">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>User Id</th>
                            <th>Title</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user._id}>
                                <td>{user.userId}</td>
                                <td>{user.title}</td>
                                <td>
                                    {editableUserId === user.userId ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="firstName"
                                            value={updatedData.firstName || user.firstName}
                                            onChange={handleInputChange}
                                        />
                                    ) : user.firstName}
                                </td>
                                <td>
                                    {editableUserId === user.userId ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="middleName"
                                            value={updatedData.middleName || user.middleName}
                                            onChange={handleInputChange}
                                        />
                                    ) : user.middleName}
                                </td>
                                <td>
                                    {editableUserId === user.userId ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lastName"
                                            value={updatedData.lastName || user.lastName}
                                            onChange={handleInputChange}
                                        />
                                    ) : user.lastName}
                                </td>
                                <td>
                                    {editableUserId === user.userId ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phoneNumber"
                                            value={updatedData.phoneNumber || user.phoneNumber}
                                            onChange={handleInputChange}
                                        />
                                    ) : user.phoneNumber}
                                </td>
                                <td>
                                    {editableUserId === user.userId ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={updatedData.email || user.email}
                                            onChange={handleInputChange}
                                        />
                                    ) : user.email}
                                </td>
                                <td>
                                    {editableUserId === user.userId ? (
                                        <button 
                                            className="btn btn-success mr-2"
                                            onClick={() => handleSave(user.userId)}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button 
                                            className="btn btn-primary mr-2"
                                            onClick={() => handleUpdate(user.userId)}
                                        >
                                            Update
                                        </button>
                                    )}
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(user.userId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
