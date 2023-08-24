import React, { useState, useEffect } from 'react'; // Import React and hooks
import './App.css';
import { ThemeContext } from './ThemeContext';
import Home from './Home'; // Import Home component
import LoginForm from './LoginForm'; // Import LoginForm component
import SignUpForm from './SignUpForm'; // Import SignUpForm component
import BuildingConfiguration from './BuildingConfiguration'; // Import BuildingConfiguration component

function App() {
    const [theme, setTheme] = useState('light'); 
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

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
                <Home 
                    onLoginClick={() => setShowLogin(true)} 
                    onSignUpClick={() => setShowSignUp(true)}
                />
                {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
                {showSignUp && <SignUpForm onClose={() => setShowSignUp(false)} />}
                
                <BuildingConfiguration /> {/* Add BuildingConfiguration component */}
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
