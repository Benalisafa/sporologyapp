import React , {useState}from 'react'
import { Link } from "react-router-dom"
import UserService from '../../../../Services/userService'
import toast, { Toaster } from 'react-hot-toast';



const DropdownUser = (props) => {

    const [open, setOpen] = useState (false)

    const toggleDropdown = () => {
        setOpen(!open);
    };


    const logout = async () => {
        try {
          const response = await UserService.logout();
          console.log("response =>", response);
          toast.success('User logged out');
        } catch (err) {
          console.log(err);
          toast.error('Logout Failed');
        }
      };
   
    return(

        <>
        
            <div className='navbar-profile-image'onClick={toggleDropdown}>
            <Toaster/>

                { 
                    props.user.picture === "" ?(
                    <div className='profile-character'>{ props.user.firstname[0] }</div>):(
                        <h6>s</h6>
                    )
                }

            </div> 

            {open && (
                        <ul className='profile-dropdown'>
                        <li><Link to ="/profile" style={{ textDecoration: 'none' }}>Profile</Link></li> 
                        <li>Settings</li>
                        <li><Link to="/login" onClick={logout}>Logout</Link> </li>
                        </ul>
                    )}


            
        </>

    )

}

export default DropdownUser