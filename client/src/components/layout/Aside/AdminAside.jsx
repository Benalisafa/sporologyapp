import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/auth.reducer';

const AdminAside = () => {
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
        <Nav.Link as={Link} to="/dashboard/admin/members" className="partner-nav-link">
        Participants
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard/admin/partners" className="partner-nav-link">
        Professionals
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard/admin/activities" className="partner-nav-link">
        Activities
        </Nav.Link>
        <Nav.Link as={Link} to="/about" className="partner-nav-link">
        Categories
        </Nav.Link>
        <Nav.Link as={Link} to="/about" className="partner-nav-link">
        Bookings
        </Nav.Link>
        <Nav.Link as={Link} to="/about" className="partner-nav-link">
        Testimonies
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard/admin/stat" className="partner-nav-link">
        Statistics
        </Nav.Link>
        <Nav.Link as={Link} to="/about" className="partner-nav-link">
        Profile 
        </Nav.Link>
        <Nav.Link as={Link} to="/about" className="partner-nav-link">
        Logout
        </Nav.Link>
      </Nav>
      
    </>
  );
};

export default AdminAside;
