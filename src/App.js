import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Route as RouteElement } from 'react-router-dom';
import './App.css';
import { ThemeContext } from './ThemeContext';
import Home from './Home';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import BuildingConfiguration from './BuildingConfiguration';

function App() {
    const [theme, setTheme] = useState('light');

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
            <div className={`App ${theme}`}>
                <Router>
                    <Routes>
                        <RouteElement path="/" element={<Home />} />
                        <RouteElement path="/build-configuration" element={<BuildingConfiguration />} />
                        <RouteElement path="/login" element={< LoginForm />} />
                        <RouteElement path="/signup" element={< SignUpForm />} />
                    </Routes>
                </Router>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
