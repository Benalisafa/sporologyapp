import React from 'react'

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Nav from 'react-bootstrap/Nav';

export const Navbar = () => {
  return (
 

    <Nav variant="underline" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Logo</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Activities</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Partners</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Contact us</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Add activity</Nav.Link>
      </Nav.Item>
      <Nav.Item>
          <DropdownButton id="dropdown-basic-button" title="Photo">
          <Dropdown.Item href="#/action-1">Sign In</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Log In</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
      </Nav.Item>
    </Nav>
          
    
  



        
            
  


 
)
   
}
