import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/auth.reducer';

const PartnerAside = () => {
  const userId = useSelector((state) => state.auth.user?.userId);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <style>
        {`
          .partner-nav-link {
            color: black;
            margin-bottom: 10px;
            text-decoration: none;
            text-align:center; 
            
          }
          .partner-nav-link:hover, .partner-nav-link:focus{
            text-decoration: none;
            color:black;
            background-color:var(--bs-primary);
          }
        `}
      </style>
      <Nav
        className="d-flex flex-column ps-4 pt-4 bg-light"
        style={{
          width: '20%',
          height: '120vh',
          backgroundColor: '#f8f9fa',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Nav.Link as={Link} to="/dashboard/partner" className="partner-nav-link">
          All activities
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard/partner/create" className="partner-nav-link">
          Add Activity
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard/partner/profile" className="partner-nav-link">
          Profile Info
        </Nav.Link>
        <Nav.Link as={Link} to="/about" className="partner-nav-link">
          Bookings
        </Nav.Link>
        <Nav.Link onClick={handleLogout} className="partner-nav-link">
          Logout
        </Nav.Link>
      </Nav>
      
    </>
  );
};

export default PartnerAside;
