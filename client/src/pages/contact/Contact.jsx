import React from 'react'
import logo from'../../assets/sporology-logo .svg'

function ContactUs() {
  return (
    <div className='d-flex flex-column align-items-center mt-4 '>
        <div>
            <img src={logo} className='logo' alt="logo" />
        </div>
    <h3>Contact Us</h3>
    </div>
  )
}

export default ContactUs