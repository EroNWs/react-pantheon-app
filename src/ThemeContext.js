import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: 'light', // default theme
  toggleTheme: () => {} // function for change theme 
});
