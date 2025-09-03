import React from 'react'
import "./About.css"
import profile_img from "../../assets/about_profile.svg"

const About = () => {
  return (
    <div id='about' className='about'>
        <div className="about-title">
            <h1>About me</h1>
        </div>
        <div className="about-sections">
            <div className="about-left">
                <img src={profile_img} alt='Profile'/>
            </div>
            <div className="about-right">
                <div className="about-para">
                    <p>I am Akindu Kalhan, an Electrical Engineering undergraduate from the University of Moratuwa with a strong passion for AI, computer vision, robotics, and embedded systems. I enjoy applying my technical skills to develop innovative solutions that bridge hardware and software, from intelligent electrical systems to autonomous robots.</p>
                    <p>Beyond academics, I have hands-on experience in interdisciplinary projects, research, and leadership roles in clubs and volunteering initiatives. I am eager to contribute to challenging projects in cutting-edge technology fields and continuously learn to push the boundaries of what intelligent systems can achieve.</p>
                </div>
                <div className="about-skills">
                    <div className="about-skill"><p>Python</p> <hr style={{width: "80%"}}/></div>
                    <div className="about-skill"><p>MATLAB</p> <hr style={{width: "75%"}}/></div>
                    <div className="about-skill"><p>Open CV</p> <hr style={{width: "70%"}}/></div>
                    <div className="about-skill"><p>LabView</p> <hr style={{width: "75%"}}/></div>
                    <div className="about-skill"><p>ReactJS</p> <hr style={{width: "60%"}}/></div>
                    <div className="about-skill"><p>Jac</p> <hr style={{width: "60%"}}/></div>
                    <div className="about-skill"><p>C++</p> <hr style={{width: "60%"}}/></div>
                    <div className="about-skill"><p>Java</p> <hr style={{width: "60%"}}/></div>
                </div>
            </div>
        </div>
        <div className="about-achievements">
            <div className="about-achievement">
                <h1>3+</h1>
                <p>YEARS IN ACADEMIA</p>
            </div>
            <hr/>
            <div className="about-achievement">
                <h1>10+</h1>
                <p>PROJECTS COMPLETED</p>
            </div>
            <hr/>
            <div className="about-achievement">
                <h1>15+</h1>
                <p>LEADERSHIP ROLES</p>
            </div>
        </div>
    </div>
  )
}

export default About