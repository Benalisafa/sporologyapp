
import { Navbarhead } from './Navbar';
import { Outlet } from 'react-router-dom';
import { NavPartner } from './NavPartner';

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

export const PartnerLayout = () => {
  return (
    <div>
      
        <NavPartner/>
        <Outlet/>
        
    </div>
  )
};