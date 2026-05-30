import React, { useState } from 'react'
import './Experience.css'
import { FaBriefcase, FaUniversity, FaUsers, FaChevronDown, FaChevronUp, FaExternalLinkAlt } from 'react-icons/fa'

const professional = [
    {
        role: "AI Intern",
        org: "Jaseci Labs",
        type: "Full-time",
        period: "Nov 2025 – Present",
        duration: "7 mos",
        location: "On-site",
        desc: "Working on AI and language technology research and development at Jaseci Labs, contributing to the open-source Jaseci ecosystem.",
        color: "#ff00ff"
    },
    {
        role: "Research Assistant",
        org: "Khalifa University",
        type: "Part-time",
        period: "Nov 2025 – Present",
        duration: "7 mos",
        location: "Remote",
        desc: "Conducting research in AI and intelligent systems as part of Khalifa University's research initiatives.",
        color: "#00cfff"
    },
    {
        role: "Chief Technical Officer",
        org: "CORTE X",
        type: "Part-time",
        period: "Oct 2025 – Present",
        duration: "8 mos",
        location: null,
        desc: "Leading technical strategy and engineering direction at CORTE X.",
        color: "#ff6600"
    }
]

const academic = [
    {
        role: "Department Representative",
        period: "Jan 2025 – May 2026",
        duration: "1 yr 5 mos",
    },
    {
        role: "Undergraduate",
        period: "Feb 2023 – Present",
        duration: "3+ yrs",
        location: "Moratuwa, Western Province, Sri Lanka"
    }
]

const involvement = [
    {
        org: "Leo Club of University of Moratuwa",
        total: "2 yrs 6 mos",
        roles: [
            { title: "Treasurer", period: "Jul 2025 – May 2026" },
            { title: "Assistant Treasurer", period: "Jun 2024 – Jun 2025" },
            { title: "Project Chairperson – Tharka-Mahesh Abeywickrama Memorial Debating Competition", period: "Feb 2024 – May 2024", desc: "Led a 4-month initiative spanning 62 schools and 380+ students (grades 6–11) across Sri Lanka." },
            { title: "Project Chairperson – Renovate '24", period: "Jan 2024 – Feb 2024", desc: "Led renovation of the Hingurupathala Junction Bus Halt to improve accessibility for local residents." },
            { title: "Project Secretary – Nonimi Sewaneli", period: "Dec 2023 – Jan 2024", desc: "Collaborative initiative honouring those lost in the 2004 Tsunami." },
            { title: "Instructor – Codextalgia", period: "Dec 2023", desc: "Taught coding to A/L students at Piliyandala Central College and Prince of Wales College." }
        ]
    },
    {
        org: "Gavel Club of University of Moratuwa",
        total: "2 yrs 5 mos",
        roles: [
            { title: "Event Coordinator", period: "Feb 2025 – Mar 2026" },
            { title: "Co-Chairperson – Speech Olympiad XVII", period: "Dec 2024 – Feb 2025" },
            { title: "Co-Chairperson – Gavel Awurudu", period: "Mar 2024 – Apr 2024" },
            { title: "Member", period: "Nov 2023 – Mar 2024" }
        ]
    },
    {
        org: "Rotaract Club of University of Moratuwa",
        total: "2 yrs 7 mos",
        roles: [
            { title: "Director IT Avenue", period: "Jun 2024 – Jul 2025" },
            { title: "Project Co-Chairperson – Colours", period: "May 2024", desc: "Brought joy to children battling cancer at Apeksha Hospital through art and fundraising." },
            { title: "Project Co-Chairperson – Revelation 23.0", period: "May 2024", desc: "Platform for innovative thinkers to share and develop impactful community ideas." },
            { title: "Project Co-Chairperson – PressiCraft", period: "Feb 2024 – May 2024", desc: "Taught WordPress through a 6-session online course with video tutorials and quizzes." },
            { title: "IT Under Secretary General – SLRMUN 24", period: "Jan 2024 – Feb 2024", desc: "Co-managed content updates and developed a web app for conference management." },
            { title: "Member", period: "Jan 2023 – Jan 2024" }
        ]
    },
    {
        org: "Rotaract in RID 3220 – Sri Lanka & Maldives",
        total: "9 mos",
        roles: [
            { title: "Director of Digital Services", period: "Jul 2024 – Mar 2025" }
        ]
    },
    {
        org: "IEEE Student Branch – University of Moratuwa",
        total: "",
        roles: [
            { title: "Logistics Committee Lead – Mora Foresight 2.0", period: "Apr 2024 – Oct 2024" },
            { title: "Logistics Committee Member – JamborIEEE", period: "Dec 2023 – Jan 2024" }
        ]
    },
    {
        org: "IEEE PES Student Branch Chapter – University of Moratuwa",
        total: "",
        roles: [
            { title: "Project Chairperson – Power and Energy Society Awareness Sessions", period: "Apr 2024", desc: "Organized virtual Zoom sessions educating students on key power and energy topics." }
        ]
    },
    {
        org: "Mathematics Society of University of Moratuwa",
        total: "",
        roles: [
            { title: "Logistics & Digital Infrastructure Lead – Enigma'24 Crack the Code", period: "Jan 2024 – Apr 2024", desc: "Led logistics for 7 workshops and built a digital framework for online contests on HackerRank." }
        ]
    },
    {
        org: "Old Royalists Engineering Professionals' Association (OREPA)",
        total: "1 yr 1 mo",
        roles: [
            { title: "Marketing Team Member – Caption Writing & Flyer Design", period: "Jun 2024 – Jun 2025" }
        ]
    }
]

const InvolvementCard = ({ item }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className={`involvement-card ${open ? 'open' : ''}`}>
            <button className="involvement-header" onClick={() => setOpen(!open)}>
                <div className="involvement-org-info">
                    <span className="involvement-org-name">{item.org}</span>
                    {item.total && <span className="involvement-total">{item.total}</span>}
                </div>
                <span className="involvement-count">{item.roles.length} role{item.roles.length > 1 ? 's' : ''}</span>
                <span className="involvement-chevron">{open ? <FaChevronUp /> : <FaChevronDown />}</span>
            </button>
            {open && (
                <div className="involvement-roles">
                    {item.roles.map((role, i) => (
                        <div className="involvement-role" key={i}>
                            <div className="role-header">
                                <span className="role-dot" />
                                <div>
                                    <p className="role-title">{role.title}</p>
                                    <p className="role-period">{role.period}</p>
                                    {role.desc && <p className="role-desc">{role.desc}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const Experience = () => {
    const [activeTab, setActiveTab] = useState('professional')

    return (
        <div id="experience" className="experience">
            <div className="experience-title">
                <h1>Experience</h1>
            </div>

            <div className="experience-tabs">
                <button
                    className={`exp-tab ${activeTab === 'professional' ? 'active' : ''}`}
                    onClick={() => setActiveTab('professional')}
                >
                    <FaBriefcase /> Professional
                </button>
                <button
                    className={`exp-tab ${activeTab === 'academic' ? 'active' : ''}`}
                    onClick={() => setActiveTab('academic')}
                >
                    <FaUniversity /> Academic
                </button>
                <button
                    className={`exp-tab ${activeTab === 'involvement' ? 'active' : ''}`}
                    onClick={() => setActiveTab('involvement')}
                >
                    <FaUsers /> Leadership & Volunteering
                </button>
            </div>

            {activeTab === 'professional' && (
                <div className="professional-grid">
                    {professional.map((item, i) => (
                        <div className="pro-card" key={i} style={{ '--accent': item.color }}>
                            <div className="pro-card-top">
                                <div className="pro-role-badge">
                                    <FaBriefcase />
                                </div>
                                <div>
                                    <h3 className="pro-role">{item.role}</h3>
                                    <p className="pro-org">{item.org}</p>
                                </div>
                            </div>
                            <p className="pro-desc">{item.desc}</p>
                            <div className="pro-meta">
                                <span className="pro-type">{item.type}</span>
                                <span className="pro-period">{item.period}</span>
                                {item.location && <span className="pro-location">{item.location}</span>}
                            </div>
                            <div className="pro-duration">{item.duration}</div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'academic' && (
                <div className="academic-section">
                    <div className="academic-card">
                        <div className="academic-header">
                            <FaUniversity className="academic-icon" />
                            <div>
                                <h3>Department of Electrical Engineering</h3>
                                <p className="academic-uni">University of Moratuwa</p>
                                <p className="academic-sub">Full-time · 3 yrs 4 mos</p>
                            </div>
                        </div>
                        <div className="academic-timeline">
                            {academic.map((item, i) => (
                                <div className="academic-role" key={i}>
                                    <span className="academic-dot" />
                                    <div>
                                        <p className="academic-role-title">{item.role}</p>
                                        <p className="academic-role-period">{item.period} · {item.duration}</p>
                                        {item.location && <p className="academic-role-location">{item.location}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'involvement' && (
                <div className="involvement-list">
                    {involvement.map((item, i) => (
                        <InvolvementCard item={item} key={i} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Experience
