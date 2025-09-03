import React, { useState, useEffect } from 'react'
import "./Hero.css"
import profile_img from '../../assets/profile_img.jpeg'
import resumePDF from '../../assets/Akindu_Kalhan.pdf' 
import AnchorLink from 'react-anchor-link-smooth-scroll';
// Import React icons
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

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

  return (
    <div id='home' className='hero'>
        <div className="hero-content">
            <img src={profile_img} alt="Akindu Kalhan" className="profile-image" />
            <div className="hero-text">
                <h1>Hi, I'm Akindu Kalhan</h1>
                <h2>Electrical Engineering Undergraduate at University of Moratuwa</h2>
                <p>Passionate about <TypewriterAnimation phrases={typingPhrases} /></p>
                
                <div className="social-icons">
                    <a href="https://github.com/akindu-k" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/akindu-kalhan/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn />
                    </a>
                </div>
                
                <div className="hero-action">
                    <AnchorLink className='anchor-link' offset={50} href='#contact'>
                        <div className="hero-connect">Connect With Me</div>
                    </AnchorLink>
                    <div className="hero-resume" onClick={handleDownload}>Download CV</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero