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
import './navStyle.css'; // Move your styles to this file

export const Navbarhead = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isConnected = useSelector((state) => state.auth.isConnected);
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (isConnected && user?.userId) {
      axiosInstance.get(`users/user/${user.userId}`)
      
        .then((response) => {
          console.log(response.data.picture)
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
            <Nav.Link as={Link} to="/partner/login">Add activity</Nav.Link>
            <div className="position-relative">
              {!isConnected ? (
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
              ) : (
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
              )}
            </div>
          </Nav>
        </div>
      </Navbar>
      <RegisterModal show={showModal} handleClose={handleCloseModal} />
      <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} /> {/* Add LoginModal */}
    </>
  );
};

