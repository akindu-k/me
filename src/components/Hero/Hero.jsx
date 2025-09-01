import React from 'react'
import "./Hero.css"
import profile_img from '../../assets/profile_img.jpeg'
import resumePDF from '../../assets/Akindu_Kalhan.pdf' 
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Hero = () => {
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
        <img src={profile_img} alt="" />
        <h1><span>I am Akindu Kalhan,</span> an Electrical Engineering undergrad from UoM.</h1>
        <p>I am interested in working at the intersection of AI, computer vision, robotics, and embedded systems to build innovative and sustainable solutions.</p>
        <div className="hero-action">
        <AnchorLink className='anchor-link' offset={50} href='#contact'><div className="hero-connect">Connect With Me</div></AnchorLink>
            <div className="hero-resume" onClick={handleDownload}>Download CV</div>
        </div>
    </div>
  )
}

export default Hero