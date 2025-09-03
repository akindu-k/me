import React from 'react'
import './MyWork.css'
// import theme_pattern from "../../assets/theme_pattern.svg"

import project1_img from "../../assets/project_1.svg"
import project2_img from "../../assets/project_2.svg"
import project3_img from "../../assets/project_3.svg"
import project4_img from "../../assets/project_4.svg"
import project5_img from "../../assets/project_5.svg"
import project6_img from "../../assets/project_6.svg"


const mywork_data = [
    {
        w_no: 1,
        w_name: "Smart Grid Integration System",
        w_desc: "Designed and implemented an IoT-based smart grid monitoring system for a commercial building, resulting in 30% energy savings.",
        w_img: project1_img,
        w_tags: ["Electrical Design", "IoT", "Energy Efficiency"]
    },
    {
        w_no: 2,
        w_name: "Solar Power Plant Design",
        w_desc: "Engineered a 500kW rooftop solar installation for a manufacturing facility, providing 40% of their energy requirements.",
        w_img: project2_img,
        w_tags: ["Renewable Energy", "System Design", "Commercial"]
    },
    {
        w_no: 3,
        w_name: "Industrial Automation System",
        w_desc: "Developed a PLC-based automation solution for a food processing plant that increased production efficiency by 25%.",
        w_img: project3_img,
        w_tags: ["Automation", "PLC Programming", "Industrial"]
    },
    {
        w_no: 4,
        w_name: "Energy Audit & Optimization",
        w_desc: "Conducted comprehensive energy audit for a hotel chain, implementing recommendations that reduced consumption by 35%.",
        w_img: project4_img,
        w_tags: ["Energy Consulting", "Audit", "Optimization"]
    },
    {
        w_no: 5,
        w_name: "Wind Energy Feasibility Study",
        w_desc: "Led site assessment and technical feasibility study for a 2MW wind farm project in coastal Sri Lanka.",
        w_img: project5_img,
        w_tags: ["Renewable Energy", "Feasibility", "Wind Power"]
    },
    {
        w_no: 6,
        w_name: "Building Management System",
        w_desc: "Designed and implemented an integrated BMS for a smart office complex, controlling HVAC, lighting, and security systems.",
        w_img: project6_img,
        w_tags: ["BMS", "Smart Buildings", "System Integration"]
    }
];


const MyWork = () => {
  return (
    <div id='work' className='mywork'>
        <div className="mywork-title">
            <h1>My latest work</h1>

        </div>
        <div className="mywork-container">
            {mywork_data.map((work, index) => {
                return <img key={index}src={work.w_img} alt="" />
            })}

        </div>
        <div className="mywork-showmore">
            <p>Show More</p>
        </div>

    </div>
  )
}

export default MyWork