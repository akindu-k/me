import React from 'react'
import "./About.css"
import profile_img from "../../assets/about_profile.svg"
import { useReveal } from '../../motion'

const skills = [
    { name: "Python", level: 80 },
    { name: "MATLAB", level: 75 },
    { name: "Open CV", level: 70 },
    { name: "LabView", level: 75 },
    { name: "ReactJS", level: 60 },
    { name: "Jac", level: 60 },
    { name: "C++", level: 60 },
    { name: "Java", level: 60 },
]

const achievements = [
    { value: "3+", label: "YEARS IN ACADEMIA", area: "a" },
    { value: "15+", label: "PROJECTS COMPLETED", area: "b" },
    { value: "20+", label: "LEADERSHIP ROLES", area: "c" },
]

const About = () => {
  const ref = useReveal()

  return (
    <section id='about' className='about section section--white' ref={ref}>
        <div className="container section-header">
            <h1 className="headline reveal">About me</h1>
        </div>
        <div className="container container--wide">
            <div className="about-bento">
                <div className="about-tile about-intro card reveal">
                    <img src={profile_img} alt='Profile' className="about-icon"/>
                    <p className="about-lead">I am Akindu Kalhan, an Associate Software Engineer at Jaseci Labs and an Electrical Engineering undergraduate at the University of Moratuwa, with a strong passion for AI, computer vision, robotics, and embedded systems. I enjoy applying my technical skills to develop innovative solutions that bridge hardware and software, from intelligent electrical systems to autonomous robots.</p>
                    <p className="about-body">Beyond academics, I have hands-on experience in interdisciplinary projects, research, and leadership roles in clubs and volunteering initiatives. I am eager to contribute to challenging projects in cutting-edge technology fields and continuously learn to push the boundaries of what intelligent systems can achieve.</p>
                </div>

                {achievements.map((item, i) => (
                    <div className={`about-tile about-achievement about-achievement--${item.area} card reveal`} key={item.label} style={{ '--reveal-delay': `${0.08 * (i + 1)}s` }}>
                        <h2>{item.value}</h2>
                        <p>{item.label}</p>
                    </div>
                ))}

                <div className="about-tile about-skills card reveal" style={{ '--reveal-delay': '0.16s' }}>
                    {skills.map((skill) => (
                        <div className="about-skill" key={skill.name}>
                            <p>{skill.name}</p>
                            <div className="about-skill-track"><span style={{ width: `${skill.level}%` }} /></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}

export default About
