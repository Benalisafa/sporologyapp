// import React from 'react';
// import { Dropdown } from 'react-bootstrap';
// import { BurgerIcon, ProfileIcon } from '../Icons';

// const DropdownMenu = ({ isConnected, user, handleShowRegisterModal, handleShowLoginModal, handleLogout }) => {
//   return (
//     <Dropdown>
//       <Dropdown.Toggle id="dropdown-basic" className="custom-toggle" style={{ borderRadius: '20px', display: 'flex', alignItems: 'center' }}>
//         <div className="me-1 mb-1">
//           <BurgerIcon/>
//         </div>
//         <div className=' text-white rounded-circle border border-secondary overflow-hidden ' style={{ width: '30px', height: '30px', backgroundColor: 'grey' }}>
//           {isConnected ? <ProfileIcon/> : user.email[0]}
//         </div>
//       </Dropdown.Toggle>
//       <Dropdown.Menu align="end">
//         {isConnected ? (
//           <>
//             <Dropdown.Item onClick={handleShowRegisterModal}>Sign Up</Dropdown.Item>
//             <Dropdown.Item onClick={handleShowLoginModal}>Log In</Dropdown.Item>
//           </>
//         ) : (
//           <>
//             <Dropdown.Item>Profile</Dropdown.Item>
//             <Dropdown.Item>Settings</Dropdown.Item>
//             <Dropdown.Item>Calendar</Dropdown.Item>
//             <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//           </>
//         )}
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// };

// export default DropdownMenu;
