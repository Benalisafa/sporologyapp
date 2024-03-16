import React from 'react'
import "./style.css"
import DropdownUser from "./links/user"
import { Link } from "react-router-dom"
import useConnectedUserData from '../../connecteduser';



const Navbar = () => {

    const connectedUser = useConnectedUserData();

    return(

        <>
        <div className='navbar'>
            <div className='navbar-left'>
            <div><Link to ="/home">logo</Link></div>
            </div>
            <div className='navbar-right'>
                    
                
                        <DropdownUser user={ connectedUser } ></DropdownUser>
                    
            </div>
        </div>
        
        </> 
    )
}



export default Navbar



// import React, {useState} from 'react'
// import "./style.css"

// import { Link } from "react-router-dom"
// import useConnectedUserData from '../../connecteduser';
// import UserService from '../../../Services/userService'
// import toast, { Toaster } from 'react-hot-toast';



// const Navbar = (props) => {

//     const connectedUser = useConnectedUserData();

//     const [isLoggedIn, setIsLoggedIn] = useState(false); 
   

//         const [isDropdownOpen, setIsDropdownOpen] = useState (false)
    
//         const toggleDropdown = () => {
//             setIsDropdownOpen(!isDropdownOpen);
//         };

//     const logout = async () => {
//         setIsLoggedIn(false);
//         try {
            
//           const response = await UserService.logout();
//           console.log("response =>", response);
//           toast.success('User logged out');
//         } catch (err) {
//           console.log(err);
//           toast.error('Logout Failed');
//         }
//       };


//     return(

//         <> 
//         <Toaster/>
//         <nav className="navbar">
//       <div className="logo">logo</div>
//       <ul className="nav-links">
//         <li>
//           {/* Add other navbar links here */}
//         </li>
//         <li className="dropdown">
//           <button className='navbar-profile-image'onClick={toggleDropdown}>
//             <h6>s</h6>
//             { 
//                     props.user.picture === "" ?(
//                     <div className='profile-character'>{ props.user.firstname[0] }</div>):(
//                         <h6>s</h6>
//                     )
//                 }
//           </button>
//           {isDropdownOpen && !isLoggedIn && (
//             <ul className='profile-dropdown'>
//               <li>
//               <Link to ="/login">Log In</Link>
//               </li>
//               <li>
//               <Link to ="/signup">Sign Up</Link>
//               </li>
//             </ul>
//           )}
//           {isDropdownOpen && isLoggedIn && (
//             <ul className='profile-dropdown'>
//               <li>
//               <Link to ="/profile">Profile</Link>
//               </li>
//               <li>
//               <Link to ="/settings">Settings</Link>
//               </li>
//               <li>
//                 <button onClick={logout}>Logout</button>
//               </li>
//             </ul>
//           )}
//         </li>
//       </ul>
//     </nav>

//     {/* <div className='navbar'>
//             <div className='navbar-left'>
//             <div><Link to ="/home">logo</Link></div>
//             </div>
//             <div className='navbar-right'>
                    
                
//                         <DropdownUser user={ connectedUser } ></DropdownUser>
                    
//             </div>
//         </div> */}

//         </>
//     )
// }


// export default Navbar