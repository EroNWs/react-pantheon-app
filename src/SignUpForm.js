import React, { useContext, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import './App.css';
import axios from 'axios'; // Import Axios

function SignUpForm({ onClose }) {
    const { theme } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async () => {
        try {
            const response = await axios.post('https://pathneonapi20230824160910.azurewebsites.net/api/ApplicationUser', {
                email,
                username,
                password,
                confirmPassword
            });
            // Handle successful registration, e.g., show a success message
            console.log(response.data);
        } catch (error) {
            setError('An error occurred during registration.'); // Update error state
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
            <button className="login-button" onClick={handleSignUp}>Sign Up</button>
            <button className="login-button" onClick={onClose}>Close</button>
        </div>
    );
}

export default SignUpForm;
