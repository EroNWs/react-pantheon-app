import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import './App.css';
import { Link } from 'react-router-dom'; // Import Link component

function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);


  return (
    <div className={theme + " buttons-container"}>
      <div className="theme-toggle position-absolute top-0 end-0 mt-2 me-2">
        <label className="switch">
          <input 
            type="checkbox" 
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <span className="switch-label"></span>
        </label>
      </div>

      <div className="button-wrapper">
        {/* Use Link to navigate to the login page */}
        <Link to="/login" className="custom-button">Login</Link>
        {/* Use Link to navigate to the sign-up page */}
        <Link to="/sign-up" className="custom-button">Sign Up</Link>
      </div>
    </div>
  );
}

export default Home;
