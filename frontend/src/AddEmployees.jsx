import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling 
import { FiAlignJustify, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [dept, setDept] = useState('');
    const [desig, setDesig] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [salary, setSalary] = useState('');
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
            // Provide feedback to the user if fetching data fails
            // For example, you can set an error state or display a message to the user
        }
    };

    const addEmployee = async () => {
        try {
            await axios.post('http://localhost:5000/employees', {
                name,
                dept,
                desig,
                dob,
                gender,
                salary
            });
            fetchEmployees();
            // Clear input fields after adding an employee
            setName('');
            setDept('');
            setDesig('');
            setDob('');
            setGender('');
            setSalary('');
        } catch (error) {
            console.error('Error adding employee:', error);
            // Provide feedback to the user if adding an employee fails
            // For example, you can set an error state or display a message to the user
        }
    };

    const handleApplyLeaveClick = () => {
        navigate('/applyleave');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler d-lg-none"
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
                    <li><button className="left" onClick={handleApplyLeaveClick}>Apply for Leave</button></li>
                    <li><button className="left" onClick={() => navigate('/viewemployee')}>View Employees</button></li>
                    <li><button className="left" onClick={() => navigate('/hrdash')}>HR Dashboard</button></li>
                 
                </ul>
            </div>
            <div className="content">
                <div className="container mt-4">
                    <h2>Add Employee</h2>
                    <div className="row g-3">
                        <div className="col-md-12">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Department"
                                value={dept}
                                onChange={(e) => setDept(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Designation"
                                value={desig}
                                onChange={(e) => setDesig(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Date of Birth"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Salary"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <button className="btn btn-primary" onClick={addEmployee}>Add Employee</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
