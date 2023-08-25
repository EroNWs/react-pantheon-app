import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './App.css';

import { ThemeContext } from './ThemeContext';

const API_URL = process.env.REACT_APP_API_URL;

function SignUpForm() {
    const navigate = useNavigate();

    const { theme } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignUp = async () => {
        try {
            // const response = await axios.post(`${API_URL}/api/ApplicationUser`, {
            //     username,
            //     password,
            //     email
            // });
            setSuccessMessage('Registration successful!');
            setError(null); // Clear any previous error message
            // console.log(response.data);
            navigate('/login');
        } catch (error) {
            setError('An error occurred during registration.');
            setSuccessMessage(''); // Clear any previous success message
        }
    };

    return (
        <div className={`login-form ${theme}`}>
            <h2>Sign Up</h2>
            <input type="email" placeholder="Email" className="login-input" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="text" placeholder="Username" className="login-input" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" className="login-input" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" className="login-input" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button className="login-button" onClick={handleSignUp}>Sign Up</button>
            <button className="login-button" onClick={() => { navigate('/') }}>Close</button>
        </div>
    );
}

export default SignUpForm;
