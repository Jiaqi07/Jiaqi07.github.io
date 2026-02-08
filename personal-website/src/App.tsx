import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="bg-gradient-to-br from-primary-blue via-background-dark to-gray-dark text-text-dark dark:from-primary-blue dark:via-background-dark dark:to-gray-dark dark:text-text-dark">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </AnimatePresence>
    </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
