
import { Navbarhead } from './Navbar';
import { Outlet } from 'react-router-dom';


export const NavLayout = () => {
  return (
    <div>
      
        <Navbarhead/>
        <Outlet/>
        
    </div>
  )
};

export const AdminLayout = () => {
  return (
    <div>
      
        <Navbarhead/>
        <Outlet/>
        
    </div>
  )
};