import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeContext } from './ThemeContext';
import Home from './Home';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import BuildingConfiguration from './BuildingConfiguration';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; // Import Router components

function App() {
    const [theme, setTheme] = useState('light'); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Add isLoggedIn state

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
                    <Switch>
                        <Route path="/login">
                            {isLoggedIn ? <Redirect to="/building-configuration" /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
                        </Route>
                        <Route path="/sign-up">
                            {isLoggedIn ? <Redirect to="/building-configuration" /> : <SignUpForm />}
                        </Route>
                        <Route path="/building-configuration">
                            {isLoggedIn ? <BuildingConfiguration /> : <Redirect to="/login" />}
                        </Route>
                        <Route path="/">
                            <Home setIsLoggedIn={setIsLoggedIn} />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ThemeContext.Provider>
    );
}

export default App;
