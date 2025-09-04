// import React from 'react'
import './MyWork.css'
import React, { useState } from 'react'
// import theme_pattern from "../../assets/theme_pattern.svg"

import project1_img from "../../assets/project_1.svg"
import project2_img from "../../assets/project_2.svg"
import project3_img from "../../assets/project_3.svg"
import project4_img from "../../assets/project_4.svg"
import project5_img from "../../assets/project_5.svg"
import project6_img from "../../assets/project_6.svg"

import { FaGithub, FaTimes } from 'react-icons/fa'; // Added FaTimes import



const mywork_data = [
    {
        w_no: 1,
        w_name: "Vision-Based Object Sorting Robot Arm",
        w_desc: "Built a robotic arm that detects and sorts colored objects using webcam-based vision, a custom color sensor, and ultrasonic sensing. Integrated inverse kinematics, LabVIEW control, and an ensemble ML approach for accurate real-time classification.",
        w_img: project1_img,
        w_tags: ["Computer Vision", "Robotics", "Instrumentation"],
        w_github: "https://github.com/akindu-k/robo-arm"
    },
    {
        w_no: 2,
        w_name: "Smart Energy Integration and Automation Network (SEIAN)",
        w_desc: "Developed an intelligent solar inverter system capable of seamless power sharing, microgrid creation, and grid stabilization. SEIAN integrates AI-driven control and IoT-based monitoring to optimize energy utilization, enhance reliability, and scale from household to industrial applications.",
        w_img: project2_img,
        w_tags: ["Smart Grid", "IoT", "Renewable Energy"],
        w_github: "https://github.com/OshadhaPathirana/Smart-Energy-Automation-and-Integration-Network-2025.git"
    },
    {
        w_no: 3,
        w_name: "TaskMate",
        w_desc: "Built an AI-powered task management system that automates task assignment based on employee skills and availability. Integrated frontend and backend using Ballerina middleware, leveraging the Gemini-1.5-Flash AI model for intelligent task allocation and enabling third-party integrations",
        w_img: project3_img,
        w_tags: ["AI", "Task Automation", "Middleware Integration"],
        w_github: "https://github.com/akindu-k/iwb013-team-tricannu"
    },
    {
        w_no: 4,
        w_name: "Smart Email Automation Assistant",
        w_desc: "Created an AI-powered assistant that reads and sends emails directly through a Telegram bot. Integrated Gmail API for automation, Gemini 1.5 Flash for intelligent responses, and n8n for workflow orchestration, demonstrating how AI and automation can streamline daily communication.",
        w_img: project4_img,
        w_tags: ["AI Automation", "Workflow Orchestration", "Productivity"],
        w_github: "https://github.com/akindu-k/ai-telegram-gmail-bot"
    },
    {
        w_no: 5,
        w_name: "TripMate",
        w_desc: "Developed a web application that helps users plan budget-efficient trips by integrating cost estimation, itinerary planning, and trip optimization. Built with React for the frontend and Spring Boot for the backend, ensuring a scalable and user-friendly travel planning experience.",
        w_img: project5_img,
        w_tags: ["ReactJS", "Spring Boot", "Full-Stack Development"],
        w_github: "https://github.com/Company-B-MSD/tripmate"
    },
    {
        w_no: 6,
        w_name: "Codebase Genius",
        w_desc: "Built an AI documentation agent that ingests GitHub repos and automatically generates clear, structured, and visual documentation using specialized agents for mapping, code analysis, and generation.",
        w_img: project6_img,
        w_tags: ["AI Agents", "Automation", "Developer Tools"],
        w_github: "https://github.com/RavimalRanathunga/Team-Nova-Codebase-Genius"
    }
];




const MyWork = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    
    // Function to open the modal with project details
    const openProjectModal = (project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };
    
    // Function to close the modal
    const closeProjectModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    return (
      <div id='work' className='mywork'>
          <div className="mywork-title">
              <h1>My latest work</h1>
          </div>
          <div className="mywork-container">
              {mywork_data.map((work, index) => {
                  return (
                      <div className="project-card" key={index} onClick={() => openProjectModal(work)}>
                          <div className="project-card-inner">
                              <div className="project-image-container">
                                  <img src={work.w_img} alt={work.w_name} />
                              </div>
                              <div className="project-info">
                                  <h3>{work.w_name}</h3>
                                  <p>{work.w_desc}</p>
                                  <div className="project-footer">
                                      <div className="project-tags">
                                          {work.w_tags.map((tag, tagIndex) => (
                                              <span key={tagIndex} className="tag">{tag}</span>
                                          ))}
                                      </div>
                                      <a 
                                          href={work.w_github} 
                                          target="_blank" 
                                          rel="noopener noreferrer" 
                                          className="github-link" 
                                          title="View on GitHub"
                                          onClick={(e) => {
                                              e.stopPropagation();  // Prevent card click event
                                              e.preventDefault();   // Prevent default link behavior
                                              window.open(work.w_github, '_blank'); // Open in new tab
                                          }}
                                      >
                                          <FaGithub />
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )
              })}
          </div>
          
          {/* Project Modal */}
          {selectedProject && (
              <div className="project-modal-overlay" onClick={closeProjectModal}>
                  <div className="project-modal" onClick={(e) => e.stopPropagation()}>
                      <button className="modal-close-btn" onClick={closeProjectModal}>
                          <FaTimes />
                      </button>
                      <div className="modal-image-container">
                          <img src={selectedProject.w_img} alt={selectedProject.w_name} />
                      </div>
                      <div className="modal-content">
                          <h2>{selectedProject.w_name}</h2>
                          <p className="modal-description">{selectedProject.w_desc}</p>
                          <div className="modal-tags">
                              {selectedProject.w_tags.map((tag, index) => (
                                  <span key={index} className="modal-tag">{tag}</span>
                              ))}
                          </div>
                          <a 
                              href={selectedProject.w_github} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="modal-github-link"
                          >
                              <FaGithub /> View on GitHub
                          </a>
                      </div>
                  </div>
              </div>
          )}
      </div>
    )
}

export default MyWork