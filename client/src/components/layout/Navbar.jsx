

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Nav from 'react-bootstrap/Nav';
import { useSelector,useDispatch } from 'react-redux';
import {logout} from '../../redux/reducers/auth.reducer'
import { Link } from 'react-router-dom';
// import isConnected from "../PrivateRoute"



export const Navbar = () => {
  
  const dispatch = useDispatch()
  const { isConnected } = useSelector((state) => state.auth);
  const Logout=()=>{
    
    dispatch(logout())
  

  }

  return (
 

    <Nav variant="underline" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Logo</Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Link to ={"/list"}>Activities</Link>
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
      {
        !isConnected?(
        <Nav.Item>
          <DropdownButton id="dropdown-basic-button" title="Photo">
          
          <Dropdown.Item >
            <Link to={"/signup"}>
              Sign Up
            </Link>
            </Dropdown.Item>
          
          
          <Dropdown.Item>
            <Link to={"/login"}>
              Log In
            </Link>
          </Dropdown.Item>
          
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
      </Nav.Item>):(
        <Nav.Item>
        <DropdownButton id="dropdown-basic-button" title="User">
        <Dropdown.Item >Profile</Dropdown.Item>
        <Dropdown.Item >Settings</Dropdown.Item>
        <Dropdown.Item >Calendar</Dropdown.Item>
        <Dropdown.Item onClick={Logout} >Logout</Dropdown.Item>
        </DropdownButton>
    </Nav.Item>
      )
      }
    </Nav>
          
    
  



        
            
  


 
)
   
}
