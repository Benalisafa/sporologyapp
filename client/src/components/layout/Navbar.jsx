import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/auth.reducer';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import RegisterModal from '../modals/registerModal';
import LoginModal from '../modals/loginModal';
import { BurgerIcon, ProfileIcon, MailIcon, HeartIcon, PhoneIcon } from '../Icons';
import logo from '../../assets/sporology-logo.svg';
import { axiosInstance } from '../../lib/axios';
import './navStyle.css';

export const Navbarhead = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isConnected = useSelector((state) => state.auth.isConnected);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [expanded, setExpanded] = useState(false); // State for controlling navbar collapse

  useEffect(() => {
    if (isConnected && user?.userId) {
      axiosInstance.get(`users/user/${user.userId}`)
        .then((response) => {
          if (response.data.picture) {
            setProfileImage(`http://localhost:4000/profile/${response.data.picture}`);
          }
        })
        .catch((error) => {
          console.error('Error fetching profile image:', error);
        });
    }
  }, [isConnected, user?.userId]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="light" expand="lg" fixed="top" expanded={expanded}>
        <div className="container">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-end">
            <img src={logo} alt="Logo" className="logo-img" />
            <span className="ms-2 logo-txt">Sporology</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)}>
            <BurgerIcon />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/activities/list">Activities</Nav.Link>
              <Nav.Link as={Link} to="/partners">Partners</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact us</Nav.Link>
              <Nav.Link as={Link} to="/about">About us</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/partner/login">Add activity</Nav.Link>
              {isConnected ? (
                <div className="position-relative d-none d-lg-block">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="custom-toggle d-flex rounded-pill">
                      <div className="me-1 mb-1">
                        <BurgerIcon />
                      </div>
                      <div>
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="profile-img" />
                        ) : (
                          <div className="profile-placeholder">
                            {user.email[0]}
                          </div>
                        )}
                      </div>
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
                <div className="d-none d-lg-block">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="custom-toggle d-flex rounded-pill">
                      <div className="me-1 mb-1">
                        <BurgerIcon />
                      </div>
                      <div className="profile-icon-wrapper">
                        <ProfileIcon />
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      <Dropdown.Item onClick={handleOpenModal}>Sign Up</Dropdown.Item>
                      <Dropdown.Item onClick={handleShowLoginModal}>Log In</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      {/* Bottom Navbar for Small Screens */}
      <div className="bottom-navbar d-lg-none fixed-bottom">
        <Nav className="w-100 d-flex justify-content-around">
          <Nav.Link as={Link} to="/">
            <MailIcon />
          </Nav.Link>
          <Nav.Link as={Link} to="/activities/list">
            <HeartIcon />
          </Nav.Link>
          {isConnected ? (
            <>
              <Nav.Link as={Link} to="/calendar">
                <PhoneIcon />
              </Nav.Link>
              
              <Nav.Link onClick={handleLogout}>
                <ProfileIcon />
              </Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={handleShowLoginModal}>
              <ProfileIcon />
            </Nav.Link>
          )}
        </Nav>
      </div>

      <RegisterModal show={showModal} handleClose={handleCloseModal} />
      <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />
    </>
  );
};


