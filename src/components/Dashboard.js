import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  // Redirect user to their respective dashboard based on their role
  useEffect(() => {
    if (userRole === 'admin') {
      navigate('/admin-dashboard');
    } else if (userRole === 'district_incharge') {
      navigate('/district-dashboard');
    } else if (userRole === 'state_incharge') {
      navigate('/state-dashboard');
    }
  }, [userRole, navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {userRole}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
