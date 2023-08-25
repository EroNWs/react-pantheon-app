import { createContext } from 'react';

const REACT_APP_THEME = process.env.REACT_APP_THEME;

export const ThemeContext = createContext({
  theme: REACT_APP_THEME, // default theme
  toggleTheme: () => {} // function for change theme 
});
