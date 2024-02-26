import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiAlignJustify, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [leaveDays, setLeaveDays] = useState('');
    const [leaveReason, setLeaveReason] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleLeaveApplication = async () => {
        try {
            await axios.put(`http://localhost:5000/leave-application/${employeeId}`, {
                leave_reason: leaveReason,
                leave_days: leaveDays
            });
            console.log('Leave application updated successfully');
        } catch (error) {
            console.error('Error updating leave application:', error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <FiX /> : <FiAlignJustify />}
                    </button>
                    <span className="navbar-brand marg mb-0 h1 p-8">Employee Management System</span>
                </div>
            </nav>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <ul>
                    <li><button className="left" onClick={() => navigate('/')}>Home</button></li>
                    <li><button className="left" onClick={()=>navigate('/applyleave')}>Apply for Leave</button></li>
                    <li><button className="left" onClick={() => navigate('/viewemployee')}>View Employees</button></li>
                    <li><button className="left" onClick={() => navigate('/hrdash')}>HR Dashboard</button></li>
                 
                </ul>
            </div>
            <div className="content">
                <div className="container mt-4">
                    <h2>Apply for Leave</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="employeeId">Employee ID:</label>
                                <input
                                    type="text"
                                    id="employeeId"
                                    className="form-control"
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="leaveDays">Number of Days:</label>
                                <input
                                    type="number"
                                    id="leaveDays"
                                    className="form-control"
                                    value={leaveDays}
                                    onChange={(e) => setLeaveDays(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="leaveReason">Reason:</label>
                                <input
                                    type="text"
                                    id="leaveReason"
                                    className="form-control"
                                    value={leaveReason}
                                    onChange={(e) => setLeaveReason(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary mt-2" onClick={handleLeaveApplication}>Apply</button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeList;
