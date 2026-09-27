import React, { useState } from 'react'
import './Experience.css'
import { FiBriefcase, FiBookOpen, FiUsers, FiPlus } from 'react-icons/fi'
import Scroller from '../Scroller/Scroller'
import { useReveal } from '../../motion'

const professional = [
    {
        role: "AI Intern",
        org: "Jaseci Labs",
        type: "Full-time",
        period: "Nov 2025 – Present",
        duration: "7 mos",
        location: "On-site",
        desc: "Working on AI and language technology research and development at Jaseci Labs, contributing to the open-source Jaseci ecosystem."
    },
    {
        role: "Research Assistant",
        org: "Khalifa University",
        type: "Part-time",
        period: "Nov 2025 – Present",
        duration: "7 mos",
        location: "Remote",
        desc: "Conducting research in AI and intelligent systems as part of Khalifa University's research initiatives."
    },
    {
        role: "Chief Technical Officer",
        org: "CORTE X",
        type: "Part-time",
        period: "Oct 2025 – Present",
        duration: "8 mos",
        location: null,
        desc: "Leading technical strategy and engineering direction at CORTE X."
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
    { id: 'academic', label: 'Academic', icon: <FiBookOpen /> },
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
                <div className="container compare-wrap">
                    <div className="compare" role="table" aria-label="Professional experience">
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
                        {[
                            ['Type', 'type'],
                            ['Period', 'period'],
                            ['Duration', 'duration'],
                            ['Location', 'location'],
                        ].map(([label, key]) => (
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
            )}

            {activeTab === 'academic' && (
                <div className="container academic-section">
                    <div className="academic-card card reveal">
                        <div className="academic-header">
                            <span className="academic-icon"><FiBookOpen /></span>
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
