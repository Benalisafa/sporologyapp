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

export const NavPartner = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.userId);
  const isConnected = useSelector((state) => state.auth.isConnected);
  const [expanded, setExpanded] = useState(false);
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
            {isConnected ? (
              <div className="position-relative">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" className="custom-toggle d-flex rounded-pill">
                    {partner?.name || 'User'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/calendar">Calendar</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <>
                <Nav.Link onClick={() => setShowLoginModal(true)}>Login</Nav.Link>
                <Nav.Link onClick={() => setShowRegisterModal(true)}>Register</Nav.Link>
              </>
            )}
          </Nav>
        </div>
      </Navbar>

      {/* Modals */}
      <RegisterModal show={showRegisterModal} onHide={() => setShowRegisterModal(false)} />
      <LoginModal show={showLoginModal} onHide={() => setShowLoginModal(false)} />
    </>
  );
};
