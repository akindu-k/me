import React from 'react'
import './Certifications.css'
import { FiAward, FiCheckCircle, FiBookOpen } from 'react-icons/fi'
import Scroller from '../Scroller/Scroller'
import { useReveal } from '../../motion'

const LINKEDIN_CERTS = "https://www.linkedin.com/in/akindu-kalhan/details/certifications/"

// Mirrors the order on LinkedIn.
const certifications = [
    { name: "Club Treasurer – Devthon 3.0", issuer: "Leo Club of University of Moratuwa", date: "Apr 2026", id: "CRD-SZ6LV7SY" },
    { name: "Intro to Programming", issuer: "Kaggle", date: "Jun 2025" },
    { name: "Prompt Design in Vertex AI Skill Badge", issuer: "Google", date: "Apr 2025" },
    { name: "Co-lead – Logistics Management Committee", issuer: "IEEE Student Branch University of Moratuwa", date: "Mar 2025" },
    { name: "Membership Growth Award", issuer: "Lions Clubs International", date: "Oct 2024" },
    { name: "GenAI 101 with Pieces", issuer: "Pieces", date: "Nov 2024" },
    { name: "Postman API Fundamentals Student Expert", issuer: "Postman", date: "Nov 2024" },
    { name: "Create a Voice Assistant with OpenAI's GPT-3 and IBM Watson", issuer: "Cognitive Class", date: "Nov 2024" },
    { name: "Artificial Intelligence in Embedded Systems", issuer: "Electronic and Telecom. Engineering, University of Moratuwa", date: "Oct 2024" },
    { name: "PHP for Beginners", issuer: "Great Learning", date: "Sep 2024" },
    { name: "FREE TensorFlow-Keras Bootcamp", issuer: "OpenCV University", date: "Sep 2024" },
    { name: "OpenCV Bootcamp", issuer: "OpenCV University", date: "Sep 2024" },
    { name: "Premio Formalita 2024 – SOS", issuer: "Rotaract Club of University of Moratuwa", date: "Aug 2024" },
    { name: "Premio Formalita 2024 – Active Membership", issuer: "Rotaract Club of University of Moratuwa", date: "Jul 2024" },
    { name: "Advanced Learning Algorithms", issuer: "DeepLearning.AI", date: "Nov 2023" },
    { name: "Web Development", issuer: "Sololearn", date: "Oct 2023" },
    { name: "Wireless Communications", issuer: "Yonsei University", date: "Oct 2023" },
    { name: "Supervised Machine Learning", issuer: "DeepLearning.AI", date: "Oct 2023" },
    { name: "Python Programming", issuer: "University of Moratuwa", date: "Oct 2023" },
    { name: "C for Everyone: Programming Fundamentals", issuer: "University of California, Santa Cruz", date: "Sep 2023" },
    { name: "Foundations of Project Management", issuer: "Google", date: "Feb 2023" },
    { name: "Introduction to Electronics", issuer: "Georgia Institute of Technology", date: "Jan 2023" },
    { name: "Differential Equations for Engineers", issuer: "The Hong Kong University of Science and Technology", date: "Jan 2023" },
    { name: "Python for Beginners", issuer: "University of Moratuwa", date: "Dec 2022" },
    { name: "MATLAB Certified", issuer: "MATLAB Coding", date: "Aug 2022" },
]

const Certifications = () => {
    const ref = useReveal()

    return (
        <section id="certifications" className="certifications section section--white" ref={ref}>
            <div className="container section-header">
                <h1 className="headline reveal">Certifications & Awards</h1>
            </div>

            <div className="container container--wide certs-bento">
                <div className="cert-feature cert-feature--cima card reveal">
                    <span className="cert-feature-icon"><FiBookOpen /></span>
                    <p className="cert-feature-eyebrow">CIMA</p>
                    <h2>CGMA Operational Level</h2>
                    <p className="cert-feature-body">Management Accounting. Passed the Operational Case Study Exam in August 2026.</p>
                    <p className="cert-feature-score"><span>106</span>/150</p>
                </div>

                <div className="cert-feature card reveal" style={{ '--reveal-delay': '0.08s' }}>
                    <span className="cert-feature-icon"><FiAward /></span>
                    <p className="cert-feature-eyebrow">Leo District 306 D2 · D2 CON</p>
                    <h2>Most Outstanding Club Treasurer Award</h2>
                    <p className="cert-feature-body">For the 2025/26 term as Treasurer of the Leo Club of University of Moratuwa.</p>
                </div>

                <a className="cert-feature cert-count card card--hover reveal" style={{ '--reveal-delay': '0.16s' }} href={LINKEDIN_CERTS} target="_blank" rel="noopener noreferrer">
                    <p className="cert-count-value">{certifications.length}</p>
                    <p className="cert-feature-eyebrow">licenses & certifications</p>
                    <span className="link-chevron">See all on LinkedIn</span>
                </a>
            </div>

            <div className="certs-row reveal">
                <Scroller label="Licenses and certifications">
                    {certifications.map((cert) => (
                        <article className="cert-card card" key={`${cert.name}-${cert.date}`}>
                            <FiCheckCircle className="cert-card-icon" aria-hidden="true" />
                            <h3>{cert.name}</h3>
                            <p className="cert-card-issuer">{cert.issuer}</p>
                            <p className="cert-card-date">Issued {cert.date}</p>
                        </article>
                    ))}
                </Scroller>
            </div>
        </section>
    )
}

export default Certifications
