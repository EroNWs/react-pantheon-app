import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ThemeContext } from './ThemeContext';
const API_URL = process.env.REACT_APP_API_URL;

function LoginForm() {
    const navigate = useNavigate();

    const { theme } = useContext(ThemeContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loginMessage, setLoginMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/UserAuth/login`, {
                username,
                password
            });
            // Handle successful login
            setLoginMessage('Login successful!');
            setError(null); // Clear any previous error message
            console.log(response.data);
            navigate('/building-configuration');
        } catch (error) {
            setError('Invalid credentials. Please try again.');
            setLoginMessage('');
        }
    };

    return (
        <div className={`login-form ${theme}`}>
            <h2>Login</h2>
            <input type="text" placeholder="Username" className="login-input" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" className="login-input" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <p className="error-message">{error}</p>}
            {loginMessage && <p className="success-message">{loginMessage}</p>}
            <button className="login-button" onClick={handleLogin}>Login</button>
            <button className="login-button" onClick={() => { navigate('/') }}>Close</button>
        </div>
    );
}

export default LoginForm;
