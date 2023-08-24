import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeContext } from './ThemeContext';
import Home from './Home';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import BuildingConfiguration from './BuildingConfiguration';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate

function App() {
    const [theme, setTheme] = useState('light'); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        document.body.className = theme; 
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            document.body.className = newTheme;
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <Router>
                <div className={`App ${theme}`}>
                    <Routes>
                        <Route path='/' element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path='/login' element={<LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path='/sign-up' element={<SignUpForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path='/building-configuration' element={isLoggedIn ? <BuildingConfiguration /> : <Navigate to='/' />} />
                    </Routes>
                </div>
            </Router>
        </ThemeContext.Provider>
    );
}

export default App;
