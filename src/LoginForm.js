import React, { useContext, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import './App.css';
import axios from 'axios'; // Import Axios
import { Link, Redirect } from 'react-router-dom'; // Import Link and Redirect components

function LoginForm({ setIsLoggedIn }) {
    const { theme } = useContext(ThemeContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loginMessage, setLoginMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://pathneonapi20230824160910.azurewebsites.net/api/UserAuth/login', {
                username,
                password
            });
            // Handle successful login
            setLoginMessage('Login successful!'); // Update login message state
            setError(null); // Clear any previous error message
            setIsLoggedIn(true); // Set isLoggedIn to true on successful login
            console.log(response.data);
        } catch (error) {
            setError('Invalid credentials. Please try again.'); // Update error state
            setLoginMessage(''); // Clear any previous login message
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
            {/* Use Link to navigate back to the home page */}
            <Link to="/" className="login-button">Close</Link>
        </div>
    );
}

export default LoginForm;
