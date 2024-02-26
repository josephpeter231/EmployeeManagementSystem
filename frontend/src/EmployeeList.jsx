import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiAlignJustify, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
          const response = await axios.get('https://employeemanagementsystem-xojx.onrender.com/employees');
          setEmployees(response.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
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
                    <li><button className="left" onClick={handleApplyLeaveClick}>Apply for Leave</button></li>
                    <li><button className="left" onClick={() => navigate('/viewemployee')}>View Employees</button></li>
                    <li><button className="left" onClick={() => navigate('/hrdash')}>HR Dashboard</button></li>
                 
                </ul>
            </div>
            <div className="content">
                <div className="container mt-4">
                    <h2>Employee List</h2>
                    <ul className="list-group">
                        {employees.map((employee) => (
                            <li key={employee.id} className="list-group-item">
                                {employee.name} - {employee.dept} - {employee.desig} - {employee.dob} - {employee.gender} - {employee.salary}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default EmployeeList;
