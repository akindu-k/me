import React, { useState } from 'react'
import './Experience.css'
import { FiBriefcase, FiBookOpen, FiUsers, FiPlus } from 'react-icons/fi'
import Scroller from '../Scroller/Scroller'
import { useReveal } from '../../motion'

const professional = [
    {
        role: "Associate Software Engineer",
        org: "Jaseci Labs",
        type: "Part-time",
        period: "Jul 2026 – Present",
        duration: "3 mos",
        location: null,
        desc: "Continuing on the jac-scale team, building the systems that deploy and scale Jac applications in the open-source Jaseci ecosystem."
    },
    {
        role: "AI Intern",
        org: "Jaseci Labs",
        type: "Full-time",
        period: "Nov 2025 – Jun 2026",
        duration: "8 mos",
        location: "On-site",
        desc: "Worked on jac-scale across the memory hierarchy and server layers: MongoDB persistence, L1/L2 and Redis caching, data integrity and recovery, JWT auth and SSO, and REST APIs."
    },
    {
        role: "Research Assistant",
        org: "Khalifa University",
        type: "Part-time",
        period: "Nov 2025 – May 2026",
        duration: "7 mos",
        location: "Remote",
        desc: "Conducted research in AI and intelligent systems as part of Khalifa University's research initiatives."
    },
    {
        role: "Chief Technical Officer",
        org: "Tapro Media",
        type: "Part-time",
        period: "Oct 2025 – Sep 2026",
        duration: "1 yr",
        location: null,
        desc: "Led technical strategy and engineering direction at Tapro Media."
    }
]

const PRO_FIELDS = [
    ['Type', 'type'],
    ['Period', 'period'],
    ['Duration', 'duration'],
    ['Location', 'location'],
]

const education = [
    {
        school: "University of Moratuwa",
        program: "Department of Electrical Engineering",
        sub: "Full-time · 3 yrs 8 mos",
        roles: [
            { role: "Undergraduate", period: "May 2026 – Present", duration: "5 mos" },
            { role: "Department Representative", period: "Jan 2025 – May 2026", duration: "1 yr 5 mos" },
            { role: "Undergraduate", period: "Feb 2023 – Jan 2025", duration: "2 yrs", location: "Moratuwa, Western Province, Sri Lanka" },
        ],
    },
    {
        school: "CIMA",
        program: "CGMA Operational Level, Management Accounting",
        sub: "May 2026 – Present · Grade 106/150",
        desc: "Passed the CGMA Operational Case Study Exam in August 2026 with 106 out of 150. The level covers management accounting, costing, budgeting, financial analysis, decision-making, financial reporting, corporate governance, taxation and working capital management.",
    },
    {
        school: "Royal College Colombo",
        program: "Advanced Level, Mathematics",
        sub: "2008 – 2021",
        activities: [
            "Cricket – Captain, Under 15",
            "Royal College Air Cadet Wing – Herman Loos Platoon 2019",
            "Table Tennis",
            "Junior Steward",
            "Sinhala Oratory and Debating Society – Vice President",
        ],
    },
]

const involvement = [
    {
        org: "Leo District 306 D2, Sri Lanka",
        total: "3 mos",
        roles: [
            { title: "District Director – Fundraising & Partnerships", period: "Jul 2026 – Present" }
        ]
    },
    {
        org: "Electrical Engineering Society – EESoc",
        total: "2 yrs 9 mos",
        roles: [
            { title: "Vice President", period: "Jul 2026 – Present" },
            { title: "Executive Committee Member", period: "Jan 2025 – Jun 2026" },
            { title: "Member", period: "Jan 2024 – Dec 2024" }
        ]
    },
    {
        org: "Leo Club of University of Moratuwa",
        total: "2 yrs 6 mos",
        roles: [
            { title: "Treasurer", period: "Jul 2025 – May 2026", desc: "Oversaw the finances of projects worth over LKR 50 million, introduced three audits a year and a sponsorship-led fundraising approach. Received the Most Outstanding Club Treasurer Award at D2 CON." },
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
            { title: "Member", period: "Apr 2024 – Dec 2024" },
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
    },
    {
        org: "National Cadet Corps – Sri Lanka",
        total: "2 yrs 11 mos",
        roles: [
            { title: "Third Year Senior Cadet", period: "Jan 2019 – Nov 2021", desc: "Annual Air Assessment Camp at Rantambe, Guard of Honor to Admiral Ravindra Wijegunarathna at Royal College, and the Annual Hermanloos Challenge Trophy (2019)." }
        ]
    }
]

const InvolvementCard = ({ item }) => {
    const [open, setOpen] = useState(false)
    const hasDetails = item.roles.some((role) => role.desc)

    return (
        <article className={`involvement-card card ${open ? 'open' : ''}`}>
            <div className="involvement-header">
                <span className="involvement-icon"><FiUsers /></span>
                <h3 className="involvement-org-name">{item.org}</h3>
                <p className="involvement-meta">
                    {item.total && <span className="involvement-total">{item.total}</span>}
                    <span className="involvement-count">{item.roles.length} role{item.roles.length > 1 ? 's' : ''}</span>
                </p>
            </div>
            <div className="involvement-roles">
                {item.roles.map((role, i) => (
                    <div className="involvement-role" key={i}>
                        <p className="role-title">{role.title}</p>
                        <p className="role-period">{role.period}</p>
                        {role.desc && <p className="role-desc">{role.desc}</p>}
                    </div>
                ))}
            </div>
            {hasDetails && (
                <button
                    className="involvement-toggle"
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                    aria-label={open ? `Hide details for ${item.org}` : `Show details for ${item.org}`}
                >
                    <FiPlus />
                </button>
            )}
        </article>
    )
}

const tabs = [
    { id: 'professional', label: 'Professional', icon: <FiBriefcase /> },
    { id: 'education', label: 'Education', icon: <FiBookOpen /> },
    { id: 'involvement', label: 'Leadership & Volunteering', icon: <FiUsers /> },
]

const Experience = () => {
    const [activeTab, setActiveTab] = useState('professional')
    const ref = useReveal()

    return (
        <section id="experience" className="experience section section--gray" ref={ref}>
            <div className="container section-header">
                <h1 className="headline reveal">Experience</h1>
            </div>

            <div className="container experience-tabs-wrap reveal">
                <div className="experience-tabs" role="tablist">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            className={`exp-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'professional' && (
                <>
                <div className="container compare-wrap">
                    <div className="compare" role="table" aria-label="Professional experience" style={{ '--cols': professional.length }}>
                        <div className="compare-row compare-row--head" role="row">
                            {professional.map((item, i) => (
                                <div className="compare-cell compare-head reveal" role="columnheader" key={i} style={{ '--reveal-delay': `${0.08 * i}s` }}>
                                    <span className="compare-icon"><FiBriefcase /></span>
                                    <h3 className="pro-role">{item.role}</h3>
                                    <p className="pro-org">{item.org}</p>
                                    <p className="pro-desc">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        {PRO_FIELDS.map(([label, key]) => (
                            <div className="compare-row reveal" role="row" key={key}>
                                {professional.map((item, i) => (
                                    <div className="compare-cell" role="cell" key={i}>
                                        <span className="compare-label">{label}</span>
                                        <span className={`compare-value ${item[key] ? '' : 'compare-value--empty'}`}>{item[key] || '—'}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Below desktop width the table becomes a row of swipeable cards */}
                <div className="pro-cards reveal">
                    <Scroller label="Professional experience">
                        {professional.map((item) => (
                            <article className="pro-card card" key={`${item.role}-${item.org}`}>
                                <span className="compare-icon"><FiBriefcase /></span>
                                <h3 className="pro-role">{item.role}</h3>
                                <p className="pro-org">{item.org}</p>
                                <p className="pro-desc">{item.desc}</p>
                                <dl className="pro-facts">
                                    {PRO_FIELDS.map(([label, key]) => (
                                        <div key={key}>
                                            <dt>{label}</dt>
                                            <dd className={item[key] ? '' : 'compare-value--empty'}>{item[key] || '—'}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </article>
                        ))}
                    </Scroller>
                </div>
                </>
            )}

            {activeTab === 'education' && (
                <div className="container education-grid">
                    {education.map((item, i) => (
                        <div className={`academic-card card reveal ${i === 0 ? 'academic-card--wide' : ''}`} key={item.school} style={{ '--reveal-delay': `${0.08 * i}s` }}>
                            <div className="academic-header">
                                <span className="academic-icon"><FiBookOpen /></span>
                                <div>
                                    <h3>{item.program}</h3>
                                    <p className="academic-uni">{item.school}</p>
                                    <p className="academic-sub">{item.sub}</p>
                                </div>
                            </div>
                            {item.roles && (
                                <div className="academic-timeline">
                                    {item.roles.map((role, ri) => (
                                        <div className="academic-role" key={ri}>
                                            <span className="academic-dot" />
                                            <div>
                                                <p className="academic-role-title">{role.role}</p>
                                                <p className="academic-role-period">{role.period} · {role.duration}</p>
                                                {role.location && <p className="academic-role-location">{role.location}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {item.desc && <p className="academic-desc">{item.desc}</p>}
                            {item.activities && (
                                <ul className="academic-activities">
                                    {item.activities.map((activity) => <li key={activity}>{activity}</li>)}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'involvement' && (
                <div className="involvement-list reveal">
                    <Scroller label="Leadership and volunteering">
                        {involvement.map((item, i) => (
                            <InvolvementCard item={item} key={i} />
                        ))}
                    </Scroller>
                </div>
            )}
        </section>
    )
}

export default Experience
