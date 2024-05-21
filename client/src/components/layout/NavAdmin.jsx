import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/auth.reducer';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import RegisterModal from '../modals/registerModal';
import LoginModal from '../modals/loginModal';
import { BurgerIcon, ProfileIcon } from '../Icons';
import logo from '../../assets/sporology-logo.svg';
import { axiosInstance } from '../../lib/axios';
import './navStyle.css';

export const NavAdmin = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.userId);
  const isConnected = useSelector((state) => state.auth.isConnected);
  const [expanded, setExpanded] = useState(false);
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (userId) {
      axiosInstance.get(`users/user/${userId}`)
        .then(response => {
          setPartner(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    } else {
      setLoading(false);  // Set loading to false if userId is not available
    }
  }, [userId]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar bg="light" expand="lg" expanded={expanded}>
        <div className="container">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-end">
            <img src={logo} alt="Logo" className="logo-img" />
            <span className="ms-2 logo-txt">Sporology</span>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="mr-auto"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/activities/list">Activities</Nav.Link>
              <Nav.Link as={Link} to="/partners">Partners</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact us</Nav.Link>
              <Nav.Link as={Link} to="/about">About us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav className="ml-auto">
            
              <div className="position-relative">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" className="toggle-primary d-flex rounded-pill " >
                    Admin
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            
          </Nav>
        </div>
      </Navbar>

     
    </>
  );
};
