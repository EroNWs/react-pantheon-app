import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { useNavigate } from "react-router-dom"; // useHistory yerine useNavigate
import "./App.css";

function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className={theme + " buttons-container"}>
      <div className="theme-toggle position-absolute top-0 end-0 mt-2 me-2">
        <label className="switch">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="switch-label"></span>
        </label>
      </div>

      <div className="button-wrapper">
        <button className="custom-button" onClick={handleLoginClick}>
          Login
        </button>
        <button className="custom-button" onClick={handleSignUpClick}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Home;
