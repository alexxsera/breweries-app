// Login.js
import React, { useState } from 'react';
import axios from './lib/axios';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await axios.get('/sanctum/csrf-cookie');

            const response = await axios.post('http://localhost:8000/api/auth/login', {
                name,
                password,
            });

            console.log('Login successful:', response.data);
            // salva il token in local storage o context
            localStorage.setItem('auth_token', response.data.access_token);
            localStorage.setItem('name', name);
            // reindirizza l'utente alla pagina successiva
            navigate('/breweries');
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError('Please enter your username and password');
            }
            if (err.response && err.response.status === 401) {
                setError('Invalid username or password');
            }
            console.error('Error logging in:', err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-wrapper">
                <h2>Login</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">User</label>
                        <input
                            type="text"
                            id="username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
