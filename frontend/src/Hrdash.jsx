import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiAlignJustify, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HrDashboard = () => {
    const navigate = useNavigate();
    const [leaveApplications, setLeaveApplications] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetchLeaveApplications();
    }, []);

    const fetchLeaveApplications = async () => {
        try {
            const response = await axios.get('https://employeemanagementsystem-xojx.onrender.com/employees');
            setLeaveApplications(response.data);
        } catch (error) {
            console.error('Error fetching leave applications:', error);
        }
    };

    const handleApproveLeave = async (employeeId, leaveReason, leaveDays,salary) => {
        try {
            const salaryReduction = leaveDays * 100;
            const newsalary = salary-salaryReduction;
            // Update leave application status to 'Approved' in the backend
            await axios.put(`https://employeemanagementsystem-xojx.onrender.com/leave-application/reduction/${employeeId}`, {
                leave_reason: leaveReason,
                leave_days: 0,
                salary :newsalary
            });

            // Reduce salary based on leave days * 100
            // Here, you might want to implement more robust logic to update the salary
            // This is just a basic example
        
            console.log(`Salary reduced by ${salaryReduction} for leave days: ${leaveDays}`);

            // Fetch updated leave applications
            fetchLeaveApplications();
        } catch (error) {
            console.error('Error approving leave application:', error);
        }
    };

    const handleDisapproveLeave = async (employeeId) => {
        try {
            // Update leave application status to 'Disapproved' in the backend
            await axios.put(`https://employeemanagementsystem-xojx.onrender.com/leave-application/${employeeId}`, {
                leave_reason: '',
                leave_days: 0
            });

            // Fetch updated leave applications
            fetchLeaveApplications();
        } catch (error) {
            console.error('Error disapproving leave application:', error);
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
                    <span className="navbar-brand marg mb-0 h1 p-8">HR Dashboard</span>
                </div>
            </nav>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <ul>
                    <li><button className="left" onClick={() => navigate('/')}>Home</button></li>
                    <li><button className="left" onClick={() => navigate('/applyleave')}>Apply for Leave</button></li>
                    <li><button className="left" onClick={() => navigate('/viewemployee')}>View Employees</button></li>
                    <li><button className="left" onClick={() => navigate('/hrdash')}>HR Dashboard</button></li>
                 
                </ul>
            </div>
            <div className="content">
                <div className="container mt-4">
                    <h2>Leave Applications</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Leave Days</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveApplications.map(application => (
                                <tr key={application.id}>
                                    <td>{application.id}</td>
                                    <td>{application.leave_days}</td>
                                    <td>{application.leave_reason}</td>
                                    <td>{application.status}</td>
                                    <td>
                                        {application.leave_days>0 && (
                                            <>
                                                <button className="btn btn-success mr-2" onClick={() => handleApproveLeave(application.id, application.leave_reason, application.leave_days,application.salary)}>Approve</button>
                                                <button className="btn btn-danger" onClick={() => handleDisapproveLeave(application.id)}>Disapprove</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default HrDashboard;
