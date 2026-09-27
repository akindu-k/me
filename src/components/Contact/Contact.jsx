import React, { useState } from 'react'
import "./Contact.css"
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { useReveal } from '../../motion'

const Contact = () => {
    const [formStatus, setFormStatus] = useState({
        submitted: false,
        success: false,
        message: ''
    });
    
    const ref = useReveal();

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        
        setFormStatus({ submitted: true, success: false, message: 'Sending...' });
    
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            }).then((res) => res.json());
        
            if (res.success) {
                setFormStatus({
                    submitted: true,
                    success: true,
                    message: 'Thank you! Your message has been received.'
                });
                event.target.reset();
                
                // Reset form status after 5 seconds
                setTimeout(() => {
                    setFormStatus({ submitted: false, success: false, message: '' });
                }, 5000);
            } else {
                setFormStatus({
                    submitted: true,
                    success: false,
                    message: res.message || 'Something went wrong. Please try again.'
                });
            }
        } catch (e) {
            console.error("Form submission error:", e);
            setFormStatus({
                submitted: true,
                success: false,
                message: 'An error occurred. Please try again later.'
            });
        }
    };
    
    return (
        <section id='contact' className='contact section section--white' ref={ref}>
            <div className="container section-header">
                <h1 className="headline reveal">Get in touch</h1>
            </div>
            <div className="container contact-section">
                <div className="contact-left reveal">
                    <h2 className="subhead">Let's talk</h2>
                    <p>I'm currently open to internship opportunities and projects. Feel free to reach out anytime to discuss ideas or potential collaborations, I'd love to contribute and learn!</p>
                    <div className="contact-details">
                        <a className="contact-detail" href="mailto:akinduk619@gmail.com">
                            <span className="contact-icon"><FiMail /></span><p>akinduk619@gmail.com</p>
                        </a>
                        <a className="contact-detail" href="tel:+94707229859">
                            <span className="contact-icon"><FiPhone /></span><p>+94-70-722-9859</p>
                        </a>
                        <div className="contact-detail">
                            <span className="contact-icon"><FiMapPin /></span><p>Colombo, Sri Lanka</p>
                        </div>
                    </div>
                </div>
                <form onSubmit={onSubmit} className="contact-right card reveal" style={{ '--reveal-delay': '0.1s' }}>
                    {formStatus.submitted && (
                        <div className={`form-status ${formStatus.success ? 'success' : 'error'}`} role="status">
                            {formStatus.message}
                        </div>
                    )}
                    <label htmlFor="contact-name">Your Name</label>
                    <input id="contact-name" type="text" placeholder='Enter your name' name='name' autoComplete="name" required/>
                    <label htmlFor="contact-email">Your Email</label>
                    <input id="contact-email" type="email" placeholder='Enter your email' name='email' autoComplete="email" required/>
                    <label htmlFor="contact-message">Write your message here</label>
                    <textarea id="contact-message" name="message" rows="8" placeholder='Enter your message' required></textarea>
                    <button type="submit" className="btn btn--primary contact-submit" disabled={formStatus.submitted && !formStatus.success}>
                        {formStatus.submitted && !formStatus.success ? 'Sending...' : 'Submit now'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Contact