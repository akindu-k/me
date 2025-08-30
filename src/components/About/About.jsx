import React from 'react'
import "./About.css"
// import theme_pattern from "../../assets/theme_pattern.svg"
import profile_img from "../../assets/about_profile.svg"

const About = () => {
  return (
    <div className='about'>
        <div className="about-title">
            <h1>About me</h1>
            {/* <img src={theme_pattern} alt='Theme pattern'/> */}
        </div>
        <div className="about-sections">
            <div className="about-left">
                <img src={profile_img} alt='Profile'/>
            </div>
            <div className="about-right">
                <div className="about-para">
                    <p>Hello I am Akindu Kalhan. In my free time, I enjoy exploring new technologies and working on personal projects.</p>
                    <p>I am a software developer with a passion for creating innovative solutions.</p>
                </div>
                <div className="about-skills">
                    <div className="about-skill"><p>HTML & CSS</p> <hr style={{width: "50%"}}/></div>
                    <div className="about-skill"><p>Java</p> <hr style={{width: "70%"}}/></div>
                    <div className="about-skill"><p>ReactJS</p> <hr style={{width: "60%"}}/></div>
                    <div className="about-skill"><p>C++</p> <hr style={{width: "50%"}}/></div>
                </div>
            </div>

        </div>
        <div className="about-achievements">
            <div className="about-achievement">
                <h1>10+</h1>
                <p>YEARS OF EXPERIENCE</p>
            </div>
            <hr/>
            <div className="about-achievement">
                <h1>90+</h1>
                <p>PROJECTS COMPLETED</p>
            </div>
            <hr/>
            <div className="about-achievement">
                <h1>15+</h1>
                <p>HAPPY CLIENTS</p>
            </div>

        </div>
    </div>
  )
}

export default About
