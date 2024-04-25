
import { Nav, Button } from 'react-bootstrap'
import { SearchIcon } from '../Icons'

function Filter() {
  return (
     
 
    <div className="d-flex justify-content-center align-items-center mt-4">
    <Nav className="d-inline-flex  rounded-pill py-2 px-4  " style={{ gap: '50px', border: 'solid 1px #ccc'}}>
      <Nav.Link className="flex-grow-1" style={{ color: 'black', borderRight: '1px solid #ccc' }} href="#">Activity</Nav.Link>
      <Nav.Link className="flex-grow-1" style={{ color: 'black', borderRight: '1px solid #ccc' }} href="#">Where</Nav.Link>
      <Nav.Link className="flex-grow-1" style={{ color: 'black' }} href="#">When</Nav.Link>
      <Button className='button-circle'>
        <SearchIcon />
      </Button>
    </Nav>
  </div>
  )
}

export default Filter