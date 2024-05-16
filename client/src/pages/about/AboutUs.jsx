import React from 'react'

import image from '../../assets/Fitness Class Participation.jpg'
import background from '../../assets/about.jpg'
import { Container } from 'react-bootstrap';


function AboutUs() {
  return (
    <div style={{backgroundImage: `url(${background})`}}>
      <div className='container'>
    <div className='d-flex flex-column align-items-center pt-4'>
        
    <h3>About Us</h3>
    </div>

    <div className='d-flex align-items-center justify-content-between mt-4' style={{gap:'5%'}}>
        
        <div style={{ textAlign:'justify'}}>
        Sporology is a comprehensive online directory or database dedicated to showcase the wide range  of sports professionals available in the UAE. Our platform aims to simplify the process of finding specific sports activities by providing a user-friendly interface that allows individuals to search and discover various sports professionals and activities in their erea.
        <br/>
        <br/>
        Furthermore, we highlight that Sporology serves as a valuable tool for professionals in the sports industry, enabling them to expand their customer base and reach a broader audience. By being listed on this platform, sports professionals can enhance their visibility and accessibility, thereby facilitating easier connections with potential clients and customers seeking their services
        <br/>
        <br/>
        Sporology acts as a centralized hub for both consumers and sports professionals in the UAE, fostering a dynamic and mutually beneficial environment that promotes the growth and accessibility of sports-related activities in the region.
        </div>

        <div >
        <img src={image} className='image' alt="image" />
        </div>

    </div>
    </div>
    </div>
  )
}

export default AboutUs