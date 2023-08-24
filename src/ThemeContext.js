import { createContext } from 'react';
//s
export const ThemeContext = createContext({
  theme: 'light', // varsayılan tema
  toggleTheme: () => {} // temayı değiştirmek için boş bir fonksiyon
});
