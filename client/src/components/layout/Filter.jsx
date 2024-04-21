
import { Nav, Button } from 'react-bootstrap'
import { SearchIcon } from '../Icons'

function Filter() {
  return (
     
 
    <div className="d-flex justify-content-center align-items-center ">
    <Nav className="d-inline-flex border border-gray-300 rounded-pill py-2 px-4 shadow shadow-sm " style={{ gap: '50px'}}>
      <Nav.Link className="flex-grow-1" style={{ color: 'black', borderRight: '1px solid #ccc' }} href="#">Activity</Nav.Link>
      <Nav.Link className="flex-grow-1" style={{ color: 'black', borderRight: '1px solid #ccc' }} href="#">Where</Nav.Link>
      <Nav.Link className="flex-grow-1" style={{ color: 'black' }} href="#">When</Nav.Link>
      <Button style={{ borderRadius: '20px' }}>
        <SearchIcon/>
      </Button>
    </Nav>
  </div>
  )
}

export default Filter