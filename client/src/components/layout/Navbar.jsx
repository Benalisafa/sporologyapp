import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/auth.reducer';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import RegisterModal from '../modals/registerModal';
import LoginModal from '../modals/loginModal'; 
import { BurgerIcon, ProfileIcon } from '../Icons';
import logo from '../../assets/sporology-logo.svg'

export const Navbarhead = () => {
 
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const isConnected = useSelector(state => state.auth.isConnected);
    const [expanded, setExpanded] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
  
    const handleLogout = () => {
      dispatch(logout());
    };
  
    const handleShowRegisterModal = () => setShowRegisterModal(true);
    const handleCloseRegisterModal = () => setShowRegisterModal(false);
  
    const handleShowLoginModal = () => setShowLoginModal(true);
    const handleCloseLoginModal = () => setShowLoginModal(false);
  
    return (
      <>
        <style>{`
  .dropdown-toggle::after {
    display: none !important;
  }

  .dropdown-toggle.custom-toggle,
  .dropdown-toggle.custom-toggle:focus {
    background-color: transparent; 
    border-color: grey; 
  }
`}</style>
  
        <Navbar bg="light" expand="lg" expanded={expanded}>
          <header className='container'>
          <Navbar.Brand as={Link} to="/" className='d-flex align-items-end'>
            <img src={logo} alt="Logo" className="logo-img" />
            <span className='ms-2 logo-txt' style={{color:''}}>Sporology</span>
        </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-auto" onClick={() => setExpanded(!expanded)} />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                <Nav.Link as={Link} to="/activities/list">Activities</Nav.Link>
                <Nav.Link as={Link} to="/partners">partners</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact us</Nav.Link>
                <Nav.Link as={Link} to="/about">About us</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/partner/login">Add activity</Nav.Link>
              <div className="position-relative">
                {!isConnected ? (
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="custom-toggle" style={{ borderRadius: '20px', display: 'flex', alignItems: 'center' }}>
                      <div className="me-1 mb-1">
                        <BurgerIcon/>
                      </div>
                      <div className=' text-white rounded-circle border border-secondary overflow-hidden ' style={{ width: '30px', height: '30px', backgroundColor: 'grey' }}>
                        <ProfileIcon/>
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      <Dropdown.Item onClick={handleShowRegisterModal}>Sign Up</Dropdown.Item>
                      <Dropdown.Item onClick={handleShowLoginModal}>Log In</Dropdown.Item>
                      
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="custom-toggle" style={{ borderRadius: '20px', display: 'flex', alignItems: 'center' }}>
                      <div className="me-1 mb-1">
                        <BurgerIcon/>
                      </div>
                      <div className=' text-white rounded-circle border border-secondary overflow-hidden  ' style={{ width: '30px', height: '30px', backgroundColor: 'grey' ,fontSize:'18px'}}>
                        {user.email[0] }
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      <Dropdown.Item>Profile</Dropdown.Item>
                      <Dropdown.Item>Settings</Dropdown.Item>
                      <Dropdown.Item>Calendar</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </Nav>
          </header>
        </Navbar>
        <RegisterModal show={showRegisterModal} handleClose={handleCloseRegisterModal} />
        <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} /> {/* Add LoginModal */}
      </>
    );
  };




// export const Navbarhead = () => {
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.auth.user);
//   const isConnected = useSelector(state => state.auth.isConnected);
//   const [expanded, setExpanded] = useState(false);
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   const handleShowRegisterModal = () => setShowRegisterModal(true);
//   const handleCloseRegisterModal = () => setShowRegisterModal(false);

//   const handleShowLoginModal = () => setShowLoginModal(true);
//   const handleCloseLoginModal = () => setShowLoginModal(false);

//   return (
//     <>
//       <style>{`
//         .dropdown-toggle::after {
//           display: none !important;
//         }

//         .dropdown-toggle.custom-toggle,
//         .dropdown-toggle.custom-toggle:focus {
//           background-color: transparent; 
//           border-color: grey; 
//         }
//       `}</style>
//       <Navbar bg="light" expand="lg" expanded={expanded}>
//         <Container>
//           <Navbar.Brand as={Link} to="/">
//             <span className="font-weight-bold fs-3">logo</span>
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-auto" onClick={() => setExpanded(!expanded)} />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="mx-auto">
//               <Nav.Link as={Link} to="/activities/list">Activities</Nav.Link>
//               <Nav.Link as={Link} to="/partners">partners</Nav.Link>
//               <Nav.Link as={Link} to="/contact">Contact us</Nav.Link>
//               <Nav.Link as={Link} to="/about">About us</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//           <Nav className="ml-auto">
//             <Nav.Link as={Link} to="/partner/login">Add activity</Nav.Link>
//             <div className="position-relative">
//               <DropdownMenu
//                 isConnected={isConnected}
//                 user={user}
//                 handleShowRegisterModal={handleShowRegisterModal}
//                 handleShowLoginModal={handleShowLoginModal}
//                 handleLogout={handleLogout}
//               />
//             </div>
//           </Nav>
//         </Container>
//       </Navbar>
//       <RegisterModal show={showRegisterModal} handleClose={handleCloseRegisterModal} />
//       <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />
//     </>
//   );
// };


