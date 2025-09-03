import React from 'react'
import "./Services.css"
// import theme_pattern from "../../assets/theme_pattern.svg"
// import arrow_icon from "../../assets/arrow_icon.svg"


const Services_Data = [
  {
    s_no: "01",
    s_name: "Electrical  Design",
    s_desc: "Comprehensive design of electrical systems for residential, commercial, and industrial applications with focus on efficiency and safety."
  },
  {
    s_no: "02",
    s_name: "Renewable  Solutions",
    s_desc: "Design and implementation of solar, wind, and other renewable energy systems tailored to your specific needs and location."
  },
  {
    s_no: "03",
    s_name: "Energy  Consulting",
    s_desc: "Assessment and recommendations to optimize energy usage and reduce costs across your facilities and operations."
  },
  {
    s_no: "04",
    s_name: "Electronic Design",
    s_desc: "Comprehensive design of electrical systems for residential, commercial, and industrial applications with focus on efficiency and safety."
  },
  {
    s_no: "05",
    s_name: "Energy Solutions",
    s_desc: "Design and implementation of solar, wind, and other renewable energy systems tailored to your specific needs and location."
  },
  {
    s_no: "06",
    s_name: "Consulting",
    s_desc: "Assessment and recommendations to optimize energy usage and reduce costs across your facilities and operations."
  }
];

const Services = () => {
  return (
    <div id='services' className='services'>
      <div className='services-title'>
        <h1>My Services</h1>
        {/* <img src={theme_pattern} alt="" /> */}
      </div>

      <div className='services-container'>
        {Services_Data.map((service, index) => {
          return <div key={index} className='services-format'>
            <h3>{service.s_no}</h3>
            <h2>{service.s_name}</h2>
            <p>{service.s_desc}</p>
            <div className='services-readmore'>
              <p>Read More</p>
              {/* <img src={arrow_icon} alt="" /> */}
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default Services