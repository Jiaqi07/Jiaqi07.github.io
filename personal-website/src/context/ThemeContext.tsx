import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark';

interface ThemeContextType {
  theme: Theme;
  // Removed toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return 'dark'; // Always set to dark
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      
      // Update color scheme
      root.style.colorScheme = theme;
      
      // Update background colors
      if (theme === 'dark') {
        root.style.setProperty('--bg-primary', '#111827');
        root.style.setProperty('--bg-secondary', '#1F2937');
        root.style.setProperty('--text-primary', '#F3F4F6');
        root.style.setProperty('--text-secondary', '#D1D5DB');
      } /* Removed else block for light theme */
    }
  }, [theme]);

  // Removed toggleTheme function

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 