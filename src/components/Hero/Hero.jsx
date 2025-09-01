import React from 'react'
import "./Hero.css"
import profile_img from '../../assets/profile_img.svg'
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Hero = () => {
  return (
    <div id='home' className='hero'>
        <img src={profile_img} alt="" />
        <h1><span>I am Akindu Kalhan,</span> electrical engineer based in SL.</h1>
        <p>I specialize in electrical system design and renewable energy solutions, with a passion for sustainable technology. With experience in both industrial and residential projects.</p>
        <div className="hero-action">
            <div className="hero-connect"><AnchorLink className='anchor-link' offset={50} href='#contact'>Connect With Me</AnchorLink></div>
            <div className="hero-resume">Download CV</div>
        </div>
    </div>
  )
}

export default Hero