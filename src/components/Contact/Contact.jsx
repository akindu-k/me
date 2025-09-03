import React, { useState } from 'react'
import "./Contact.css"
import mail_icon from "../../assets/mail_icon.svg"
import location_icon from "../../assets/location_icon.svg"
import call_icon from "../../assets/call_icon.svg"

const Contact = () => {
    const [formStatus, setFormStatus] = useState({
        submitted: false,
        success: false,
        message: ''
    });
    
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
        <div id='contact' className='contact'>
            <div className="contact-title">
                <h1>Get in touch</h1>
            </div>
            <div className="contact-section">
                <div className="contact-left">
                    <h1>Let's talk</h1>
                    <p>I'm currently open to internship opportunities and projects. Feel free to reach out anytime to discuss ideas or potential collaborations, I'd love to contribute and learn!</p>
                    <div className="contact-details">
                        <div className="contact-detail">
                            <img src={mail_icon} alt="" /><p>akinduk619@gmail.com</p>
                        </div>
                        <div className="contact-detail">
                            <img src={call_icon} alt="" /><p>+94-70-722-9859</p>
                        </div>
                        <div className="contact-detail">
                            <img src={location_icon} alt="" /><p>Colombo, Sri Lanka</p>
                        </div>
                    </div>
                </div>
                <form onSubmit={onSubmit} className="contact-right">
                    {formStatus.submitted && (
                        <div className={`form-status ${formStatus.success ? 'success' : 'error'}`}>
                            {formStatus.message}
                        </div>
                    )}
                    <label htmlFor="">Your Name</label>
                    <input type="text" placeholder='Enter your name' name='name' required/>
                    <label htmlFor="">Your Email</label>
                    <input type="email" placeholder='Enter your email' name='email' required/>
                    <label htmlFor="">Write your message here</label>
                    <textarea name="message" rows="8" placeholder='Enter your message' required></textarea>
                    <button type="submit" className="contact-submit" disabled={formStatus.submitted && !formStatus.success}>
                        {formStatus.submitted && !formStatus.success ? 'Sending...' : 'Submit now'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Contact