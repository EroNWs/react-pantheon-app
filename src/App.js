import React, { useState, useEffect } from 'react'; // Import React and hooks
import './App.css';
import { ThemeContext } from './ThemeContext';
import Home from './Home'; // Import Home component
import LoginForm from './LoginForm'; // Import LoginForm component
import SignUpForm from './SignUpForm'; // Import SignUpForm component
import BuildingConfiguration from './BuildingConfiguration'; // Import BuildingConfiguration component
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import Router, Route, and Switch

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
            <Router> {/* Wrap the app with Router */}
                <div className={`App ${theme}`}>
                    {/* Render the components based on the route */}
                    <Switch>
                        <Route exact path="/">
                            <Home 
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        </Route>
                        <Route path="/login">
                            <LoginForm 
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        </Route>
                        <Route path="/sign-up">
                            <SignUpForm 
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        </Route>
                        <Route path="/building-configuration">
                            {isLoggedIn ? <BuildingConfiguration /> : <Redirect to="/" />}
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ThemeContext.Provider>
    );
}

export default App;
