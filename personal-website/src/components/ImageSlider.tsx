import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const images = [
  {
    src: '/images/alan.jpg',
    alt: 'Profile picture',
  },
  {
    src: '/images/alan2.jpg',
    alt: 'Profile picture 2',
  },
  {
    src: '/images/alan3.jpg',
    alt: 'Profile picture 3',
  },
  {
    src: '/images/alan4.jpg',
    alt: 'Profile picture 4',
  },
  {
    src: '/images/alan5.jpg',
    alt: 'Profile picture 5',
  },
  {
    src: '/images/alan6.jpg',
    alt: 'Profile picture 6',
  },
  {
    src: '/images/alan7.jpg',
    alt: 'Profile picture 7',
  },
];

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection;
      if (newIndex < 0) return images.length - 1;
      if (newIndex >= images.length) return 0;
      return newIndex;
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const startTimer = () => {
      timer = setInterval(() => {
        paginate(1);
      }, 5000);
    };

    startTimer();

    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  const handleNavigation = (newDirection: number) => {
    // Clear existing timer
    const timers = window.setTimeout(() => {}, 0);
    for (let i = 0; i < timers; i++) {
      window.clearTimeout(i);
    }
    // Start new timer
    setInterval(() => {
      paginate(1);
    }, 5000);
    // Navigate
    paginate(newDirection);
  };

  const handleDotClick = (index: number) => {
    // Clear existing timer
    const timers = window.setTimeout(() => {}, 0);
    for (let i = 0; i < timers; i++) {
      window.clearTimeout(i);
    }
    // Start new timer
    setInterval(() => {
      paginate(1);
    }, 5000);
    // Update index
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg shadow-xl">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              handleNavigation(1);
            } else if (swipe > swipeConfidenceThreshold) {
              handleNavigation(-1);
            }
          }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        onClick={() => handleNavigation(-1)}
      >
        <ChevronLeftIcon className="w-6 h-6 text-white" />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        onClick={() => handleNavigation(1)}
      >
        <ChevronRightIcon className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider; 