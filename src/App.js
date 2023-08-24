import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeContext } from './ThemeContext';
import Home from './Home';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import BuildingConfiguration from './BuildingConfiguration';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom'; // Import Redirect

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
                        <Route exact path='/'>
                            <Home 
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        </Route>
                        <Route path='/login'>
                            <LoginForm 
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        </Route>
                        <Route path='/sign-up'>
                            <SignUpForm 
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        </Route>
                        <Route path='/building-configuration'>
                            {isLoggedIn ? <BuildingConfiguration /> : <Redirect to='/' />}
                        </Route>
                    </Routes>
                </div>
            </Router>
        </ThemeContext.Provider>
    );
}

export default App;
