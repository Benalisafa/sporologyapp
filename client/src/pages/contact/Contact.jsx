import React from 'react';
import Calendar from '../../components/calendar/calendar';
import ContactForm from '../../components/forms/contactForm';







function ContactUs() {
   
    
    return (
        <div className='d-flex flex-column align-items-center mt-4'>
            <h3>Contact Us</h3>
            {/* <Calendar/> */}
            <ContactForm/>
            
        </div>
    );
}

export default ContactUs;
