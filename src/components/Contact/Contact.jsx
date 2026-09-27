import React, { useEffect, useState } from 'react'
import "./Contact.css"
import { FiMail, FiPhone, FiMapPin, FiCheckCircle, FiAlertCircle, FiChevronRight } from 'react-icons/fi'
import { useReveal } from '../../motion'

const EMAIL = "akinduk619@gmail.com"
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

const Contact = () => {
    // idle → sending → success | error
    const [status, setStatus] = useState({ state: 'idle', message: '' });

    const ref = useReveal();

    // Let the success note fade after a while so the form is ready again.
    useEffect(() => {
        if (status.state !== 'success') return
        const t = setTimeout(() => setStatus({ state: 'idle', message: '' }), 6000)
        return () => clearTimeout(t)
    }, [status.state]);

    const onSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        if (!ACCESS_KEY) {
            // The site was built without a Web3Forms key; the API would reject the request.
            setStatus({ state: 'error', message: 'The form is unavailable right now.' });
            return;
        }

        const payload = { ...Object.fromEntries(new FormData(form)), access_key: ACCESS_KEY };
        setStatus({ state: 'sending', message: '' });

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(payload)
            }).then((r) => r.json());

            if (res.success) {
                setStatus({ state: 'success', message: "Thanks! Your message has been received. I'll get back to you soon." });
                form.reset();
            } else {
                console.error("Form submission rejected:", res.message);
                setStatus({ state: 'error', message: "Your message couldn't be sent." });
            }
        } catch (e) {
            console.error("Form submission error:", e);
            setStatus({ state: 'error', message: "Your message couldn't be sent. Check your connection and try again." });
        }
    };

    const sending = status.state === 'sending';

    return (
        <section id='contact' className='contact section section--white' ref={ref}>
            <div className="container section-header">
                <h1 className="headline reveal">Get in touch</h1>
            </div>
            <div className="container contact-section">
                <div className="contact-left reveal">
                    <h2 className="subhead">Let's talk</h2>
                    <p>I'm always open to interesting projects and collaborations. Feel free to reach out anytime to discuss ideas, research, or something you're building, I'd love to hear from you!</p>
                    <ul className="contact-list">
                        <li>
                            <a className="contact-row" href={`mailto:${EMAIL}`}>
                                <span className="contact-icon"><FiMail /></span>
                                <span className="contact-row-text"><small>Email</small>{EMAIL}</span>
                                <FiChevronRight className="contact-chevron" aria-hidden="true" />
                            </a>
                        </li>
                        <li>
                            <a className="contact-row" href="tel:+94707229859">
                                <span className="contact-icon"><FiPhone /></span>
                                <span className="contact-row-text"><small>Phone</small>+94-70-722-9859</span>
                                <FiChevronRight className="contact-chevron" aria-hidden="true" />
                            </a>
                        </li>
                        <li>
                            <div className="contact-row">
                                <span className="contact-icon"><FiMapPin /></span>
                                <span className="contact-row-text"><small>Location</small>Colombo, Sri Lanka</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <form onSubmit={onSubmit} className="contact-right card reveal" style={{ '--reveal-delay': '0.1s' }}>
                    <label htmlFor="contact-name">Your Name</label>
                    <input id="contact-name" type="text" placeholder='Enter your name' name='name' autoComplete="name" required/>
                    <label htmlFor="contact-email">Your Email</label>
                    <input id="contact-email" type="email" placeholder='Enter your email' name='email' autoComplete="email" required/>
                    <label htmlFor="contact-message">Write your message here</label>
                    <textarea id="contact-message" name="message" rows="6" placeholder='Enter your message' required></textarea>
                    <div className="contact-actions">
                        <button type="submit" className={`btn btn--primary contact-submit ${sending ? 'is-sending' : ''}`} disabled={sending}>
                            {sending ? <><span className="contact-spinner" aria-hidden="true" /> Sending…</> : 'Submit now'}
                        </button>
                        <p className={`form-status form-status--${status.state}`} role="status" aria-live="polite">
                            {status.state === 'success' && <><FiCheckCircle aria-hidden="true" /> <span>{status.message}</span></>}
                            {status.state === 'error' && (
                                <>
                                    <FiAlertCircle aria-hidden="true" />
                                    <span>{status.message} Please email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</span>
                                </>
                            )}
                        </p>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Contact