import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import './App.css';


function Home({ onLoginClick, onSignUpClick }) {
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
        <button className="custom-button" onClick={onLoginClick}>Login</button>
        <button className="custom-button" onClick={onSignUpClick}>Sign Up</button>

      </div>
    </div>
  );
}

export default Home;
