import React from 'react'
import logo from '../../assets/sporology-logo .svg'
import image from '../../assets/Fitness Class Participation.jpg'
import { Container } from 'react-bootstrap';


function AboutUs() {
  return (
    <Container>
    <div className='d-flex flex-column align-items-center mt-4 '>
        <div>
            <img src={logo} className='logo' alt="logo" />
        </div>
    <h3>About Us</h3>
    </div>

    <div className='d-flex align-items-center justify-content-between mt-4'>
        
        <div style={{width:'600px', textAlign:'justify'}}>
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
    </Container>
  )
}

export default AboutUs