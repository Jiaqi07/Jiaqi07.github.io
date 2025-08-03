import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg border-b border-gray-light dark:border-gray-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl font-heading bg-gradient-to-r from-accent-green to-white bg-clip-text text-transparent"
              >
                AC
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-sans transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-primary-blue dark:text-accent-green'
                    : 'text-text-light dark:text-text-dark hover:text-primary-blue dark:hover:text-accent-green'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-600" />
              )}
            </button> */}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-light dark:bg-gray-dark hover:bg-gray-light dark:hover:bg-gray-dark transition-colors duration-200"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-text-light dark:text-text-dark" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-text-light dark:text-text-dark" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background-light dark:bg-background-dark border-b border-gray-light dark:border-gray-dark"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-sans ${
                  location.pathname === item.path
                    ? 'text-primary-blue dark:text-accent-green bg-gray-light dark:bg-gray-dark'
                    : 'text-text-light dark:text-text-dark hover:text-primary-blue dark:hover:text-accent-green hover:bg-gray-light dark:hover:bg-gray-dark'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="w-full text-left px-3 py-2 rounded-md text-base font-sans text-text-light dark:text-text-dark hover:text-primary-blue dark:hover:text-accent-green hover:bg-gray-light dark:hover:bg-gray-dark"
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 