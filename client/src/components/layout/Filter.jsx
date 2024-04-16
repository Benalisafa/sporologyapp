import React from 'react'
import { Nav, Button } from 'react-bootstrap'

function Filter() {
  return (
     
 
    <div className="d-flex justify-content-center align-items-center ">
    <Nav className="d-inline-flex border border-gray-300 rounded-pill py-2 px-4 shadow shadow-sm " style={{ gap: '50px'}}>
      <Nav.Link className="flex-grow-1" style={{ color: 'black', borderRight: '1px solid #ccc' }} href="#">Activity</Nav.Link>
      <Nav.Link className="flex-grow-1" style={{ color: 'black', borderRight: '1px solid #ccc' }} href="#">Where</Nav.Link>
      <Nav.Link className="flex-grow-1" style={{ color: 'black', borderRight: '1px solid #ccc' }} href="#">When</Nav.Link>
      <Button >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </Button>
    </Nav>
  </div>
  )
}

export default Filter