import { useCallback } from 'react';
import { Variants } from 'framer-motion';

interface AnimationConfig {
  initial?: object;
  animate?: object;
  exit?: object;
  transition?: object;
}

export const useAnimation = () => {
  const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const slideUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const slideDown: Variants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const slideLeft: Variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const slideRight: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  const scale: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const createAnimation = useCallback((config: AnimationConfig) => {
    return {
      initial: config.initial || { opacity: 0 },
      animate: config.animate || { opacity: 1 },
      exit: config.exit || { opacity: 0 },
      transition: config.transition || { duration: 0.3 },
    };
  }, []);

  const defaultTransition = {
    duration: 0.3,
    ease: 'easeInOut',
  };

  return {
    fadeIn,
    slideUp,
    slideDown,
    slideLeft,
    slideRight,
    scale,
    createAnimation,
    defaultTransition,
  };
}; 