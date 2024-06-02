// src/Profile.js
import React from 'react';

const Dashboard = () => {
    const name = localStorage.getItem('name');

    return (
        <div>
            <h2>Profile</h2>
            <p>Welcome, {name}</p>
        </div>
    );
};

export default Dashboard;
