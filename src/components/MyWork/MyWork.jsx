// import React from 'react'
import './MyWork.css'
import React, { useEffect, useRef, useState } from 'react'
// import theme_pattern from "../../assets/theme_pattern.svg"

import project1_img from "../../assets/project_1.svg"
import project2_img from "../../assets/project_2.svg"
import project3_img from "../../assets/project_3.svg"
import project4_img from "../../assets/project_4.svg"
import project5_img from "../../assets/project_5.svg"
import project6_img from "../../assets/project_6.svg"
import project_cutflow from "../../assets/project_cutflow.svg"
import project_festival_card from "../../assets/project_festival_card.svg"
import project_leo_rag from "../../assets/project_leo_rag.svg"
import project_batch_voting from "../../assets/project_batch_voting.svg"
import project_alii from "../../assets/project_alii.svg"
import project_voice_assistant from "../../assets/project_voice_assistant.svg"
import project_audio_visualizer from "../../assets/project_audio_visualizer.svg"
import project_calculator from "../../assets/project_calculator.svg"

import { FiArrowUpRight, FiChevronDown, FiChevronUp, FiGithub, FiX } from 'react-icons/fi';
import { useReveal } from '../../motion'



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
    },
    {
        w_no: 7,
        w_name: "CutFlow",
        w_desc: "A digital real-time Kanban board replacing physical whiteboards in garment factory cutting rooms. Features drag-and-drop across 8 production stages, Socket.IO live sync, priority classification with KPI dashboards, and dark/light theme support.",
        w_img: project_cutflow,
        w_tags: ["React", "Socket.IO", "Express.js", "Kanban"],
        w_github: "https://github.com/akindu-k/CutFlow"
    },
    {
        w_no: 8,
        w_name: "Festival Card Creator",
        w_desc: "A web application for generating and downloading custom festival greeting cards. Users can personalize cards for various occasions and share them instantly.",
        w_img: project_festival_card,
        w_tags: ["TypeScript", "React", "Vercel"],
        w_github: "https://github.com/akindu-k/festival-card-creator"
    },
    {
        w_no: 9,
        w_name: "Leo RAG System",
        w_desc: "A production-grade RAG chatbot that answers questions exclusively from uploaded documents with full citations and real-time token streaming. Built with FastAPI, Qdrant vector store, and OpenAI embeddings, featuring hybrid retrieval and per-user access control.",
        w_img: project_leo_rag,
        w_tags: ["FastAPI", "RAG", "OpenAI", "Qdrant"],
        w_github: "https://github.com/akindu-k/leo-rag-system"
    },
    {
        w_no: 10,
        w_name: "Live Voting Dashboard",
        w_desc: "A real-time voting results dashboard integrating Google Forms and Sheets with a React frontend. Features secure serverless architecture keeping credentials server-side, auto-refreshing charts, animated winner reveals with confetti, and configurable vote weighting.",
        w_img: project_batch_voting,
        w_tags: ["React", "Google Sheets API", "Vercel", "Chart.js"],
        w_github: "https://github.com/akindu-k/batch-rep-voting"
    },
    {
        w_no: 11,
        w_name: "Advanced Light Intensity Indicator (ALII)",
        w_desc: "A smart module built for the EE3024 Digital Signal Processing course that senses light with an LDR and shows the level from 0 to 7 on a seven-segment display. An adjustable stabilization period (30–300 s) ignores sudden fluctuations, and it can show the average intensity over 300–900 s, with a path to solar-powered operation for smart-city energy management.",
        w_img: project_alii,
        w_tags: ["Digital Signal Processing", "Sensor Integration", "Circuit Design"]
    },
    {
        w_no: 12,
        w_name: "Voice Assistant with GPT-3 and IBM Watson",
        w_desc: "A voice-powered assistant that captures speech with speech-to-text, answers with OpenAI's GPT-3 and replies through text-to-speech. Built as a full-stack web app with a Python Flask backend and an HTML, CSS and JavaScript frontend.",
        w_img: project_voice_assistant,
        w_tags: ["NLP", "Python Flask", "OpenAI"],
        w_github: "https://github.com/akindu-k/chatapp-with-voice-and-openai-outline"
    },
    {
        w_no: 13,
        w_name: "Audio Frequency Visualization",
        w_desc: "An audio visualizer that syncs visual effects to the frequencies in a track, separating treble from bass. Uses FFT (scipy.fftpack) and numpy for analysis, pydub for audio processing and pygame for rendering and playback.",
        w_img: project_audio_visualizer,
        w_tags: ["Python", "Digital Signal Processing", "Pygame"],
        w_link: "https://bit.ly/AudioFrequencyVisualizationDemo",
        w_link_label: "Watch the demo"
    },
    {
        w_no: 14,
        w_name: "Akindu's Calculator",
        w_desc: "A calculator inspired by the iOS calculator's UI, built with HTML, CSS and JavaScript. Supports the four basic operations, full keyboard input, a context-aware clear button and a delete key for precise edits.",
        w_img: project_calculator,
        w_tags: ["HTML", "CSS", "JavaScript"]
    }
];

// Where a project card links to: its repo, else a demo/live link, else nothing.
const projectLink = (work) =>
    work.w_github
        ? { href: work.w_github, label: "View on GitHub", github: true }
        : work.w_link
            ? { href: work.w_link, label: work.w_link_label || "View project", github: false }
            : null;




// Bento layout: these tiles span two columns, chosen so every row of the 3-column grid is full.
const wideTiles = new Set([0, 6, 11, 13])
// Tiles shown before "Show all": three full rows of the desktop grid.
const INITIAL_COUNT = 7

const MyWork = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const ref = useReveal();
    const modalRef = useRef(null);
    const visible = showAll ? mywork_data : mywork_data.slice(0, INITIAL_COUNT);
    // On the 2-column tablet grid the first tile spans both columns; the last
    // one does too when the tiles in between would otherwise leave a gap.
    const lastSpansTablet = (visible.length - 1) % 2 === 1;

    const toggleShowAll = () => {
        if (showAll) ref.current?.scrollIntoView({ behavior: 'smooth' });
        setShowAll(!showAll);
    };

    // Function to open the modal with project details
    const openProjectModal = (project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };

    // Function to close the modal
    const closeProjectModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = ''; // Re-enable scrolling
    };

    useEffect(() => {
        if (!selectedProject) return
        modalRef.current?.focus()
        const onKey = (e) => { if (e.key === 'Escape') closeProjectModal() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [selectedProject]);

    return (
      <section id='work' className='mywork section section--dark' ref={ref}>
          <div className="container section-header">
              <h1 className="headline reveal">My latest work</h1>
          </div>
          <div className="container container--wide">
              <div className="mywork-container">
                  {visible.map((work, index) => {
                      return (
                          <article
                              className={`project-card card card--hover reveal ${wideTiles.has(index) ? 'project-card--wide' : ''} ${index === 0 || (lastSpansTablet && index === visible.length - 1) ? 'project-card--tablet-wide' : ''}`}
                              key={index}
                              style={{ '--reveal-delay': `${(index % 3) * 0.08}s` }}
                              onClick={() => openProjectModal(work)}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProjectModal(work) } }}
                              role="button"
                              tabIndex={0}
                              aria-label={`${work.w_name}, view details`}
                          >
                              <div className="project-info">
                                  <div className="project-tags">
                                      {work.w_tags.map((tag, tagIndex) => (
                                          <span key={tagIndex} className="tag">{tag}</span>
                                      ))}
                                  </div>
                                  <h3>{work.w_name}</h3>
                                  <p>{work.w_desc}</p>
                                  {projectLink(work) && (
                                      <a
                                          href={projectLink(work).href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="link-chevron github-link"
                                          onClick={(e) => e.stopPropagation()}
                                          onKeyDown={(e) => e.stopPropagation()}
                                      >
                                          {projectLink(work).label}
                                      </a>
                                  )}
                              </div>
                              <div className="project-image-container">
                                  <img src={work.w_img} alt={work.w_name} loading="lazy" />
                              </div>
                          </article>
                      )
                  })}
              </div>
              {mywork_data.length > INITIAL_COUNT && (
                  <div className="mywork-more">
                      <button className="mywork-more-btn" onClick={toggleShowAll} aria-expanded={showAll}>
                          {showAll ? <>Show fewer projects <FiChevronUp /></> : <>Show all {mywork_data.length} projects <FiChevronDown /></>}
                      </button>
                  </div>
              )}
          </div>

          {/* Project Modal */}
          {selectedProject && (
              <div className="project-modal-overlay" onClick={closeProjectModal}>
                  <div className="project-modal" ref={modalRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label={selectedProject.w_name} onClick={(e) => e.stopPropagation()}>
                      <button className="modal-close-btn" onClick={closeProjectModal} aria-label="Close">
                          <FiX />
                      </button>
                      <div className="modal-content">
                          <div className="modal-tags">
                              {selectedProject.w_tags.map((tag, index) => (
                                  <span key={index} className="modal-tag">{tag}</span>
                              ))}
                          </div>
                          <h2>{selectedProject.w_name}</h2>
                          <p className="modal-description">{selectedProject.w_desc}</p>
                          {projectLink(selectedProject) && (
                              <a
                                  href={projectLink(selectedProject).href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn--primary modal-github-link"
                              >
                                  {projectLink(selectedProject).github ? <FiGithub /> : <FiArrowUpRight />} {projectLink(selectedProject).label}
                              </a>
                          )}
                      </div>
                      <div className="modal-image-container">
                          <img src={selectedProject.w_img} alt={selectedProject.w_name} />
                      </div>
                  </div>
              </div>
          )}
      </section>
    )
}

export default MyWork
