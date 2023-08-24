import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: 'light', // varsayılan tema
  toggleTheme: () => {} // temayı değiştirmek için boş bir fonksiyon
});
