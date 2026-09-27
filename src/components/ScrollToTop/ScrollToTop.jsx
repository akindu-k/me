import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';
import { FiArrowUp } from 'react-icons/fi';
import { smoothScrollTo } from '../../scroll';

const ScrollToTop = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => smoothScrollTo(0);

  return (
    <button 
      className={`scroll-to-top ${showScrollButton ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <FiArrowUp />
    </button>
  );
};

export default ScrollToTop;