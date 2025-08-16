import { useEffect, useState } from 'react';

type Theme = 'dark'; // Only dark mode

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return 'dark'; // Always return dark
  });

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('theme', theme);
    // Update document class
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Removed toggleTheme function

  return { theme }; // Removed toggleTheme from return
}; 