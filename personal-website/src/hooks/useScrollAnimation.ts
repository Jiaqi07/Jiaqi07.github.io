import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface ScrollAnimationOptions {
  once?: boolean;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options.once || false,
  });

  return {
    ref,
    isInView,
  };
}; 