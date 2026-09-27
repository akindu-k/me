import React, { useState, useEffect } from 'react'
import "./Hero.css"
import resumePDF from '../../assets/Akindu_Kalhan.pdf' 
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { RiMediumLine } from 'react-icons/ri';
import { useParallax, useReveal } from '../../motion';
import HeroBackground from './HeroBackground';

const TypewriterAnimation = ({ phrases }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    // Set typing and deleting speeds
    const typingSpeed = 50; // milliseconds per character
    const deletingSpeed = 25; // milliseconds per character
    const pauseBeforeDelete = 1500; // pause before starting to delete
    
    let timeout;
    
    if (!isDeleting && displayText === currentPhrase) {
      // Pause at the end of typing before deleting
      timeout = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
    } else if (isDeleting && displayText === '') {
      // Move to next phrase after deleting
      setIsDeleting(false);
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    } else {
      // Handle typing and deleting
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, isDeleting 
          ? displayText.length - 1 
          : displayText.length + 1));
      }, speed);
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhraseIndex, phrases]);
  
  return <span className="typing-text">{displayText}<span className="cursor">|</span></span>;
};

const Hero = () => {
  const typingPhrases = [
    "AI",
    "Computer Vision",
    "Robotics",
    "Embedded Systems"
  ];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Akindu_Kalhan.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const revealRef = useReveal();
  const textRef = useParallax(0.2);

  return (
    <section id='home' className='hero section section--dark' ref={revealRef}>
        <HeroBackground />
        <div className="container hero-text parallax" ref={textRef}>
            <h1 className="headline headline--xl reveal">Hi, I'm Akindu Kalhan</h1>
            <h2 className="subhead hero-subhead reveal" style={{ '--reveal-delay': '0.1s' }}>
                <span>Associate Software Engineer at Jaseci Labs</span>
                <span className="hero-subhead-secondary">Electrical Engineering Undergraduate at University of Moratuwa</span>
            </h2>
            <p className="hero-passion reveal" style={{ '--reveal-delay': '0.2s' }}>Passionate about <TypewriterAnimation phrases={typingPhrases} /></p>

            <div className="hero-action reveal" style={{ '--reveal-delay': '0.3s' }}>
                <AnchorLink className='btn btn--primary' offset={48} href='#contact'>Connect With Me</AnchorLink>
                <button type="button" className="link-chevron" onClick={handleDownload}>Download CV</button>
            </div>

            <div className="social-icons reveal" style={{ '--reveal-delay': '0.4s' }}>
                <a href="https://github.com/akindu-k" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FiGithub />
                </a>
                <a href="https://www.linkedin.com/in/akindu-kalhan/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FiLinkedin />
                </a>
                <a href="https://medium.com/@akinduk619" target="_blank" rel="noopener noreferrer" aria-label="Medium">
                    <RiMediumLine />
                </a>
            </div>
        </div>

    </section>
  )
}

export default Hero