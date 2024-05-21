
import { Navbarhead } from './Navbar';
import { Outlet } from 'react-router-dom';
import { NavPartner } from './NavPartner';
import PartnerAside from './Aside/Aside';
import { useSelector } from 'react-redux';
import AdminAside from './Aside/AdminAside';
import { NavAdmin } from './NavAdmin';



export const NavLayout = () => {
  const user = useSelector(state => state.auth.user).role;

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
      
      <NavAdmin/>
        <div className='d-flex' style={{gap:'5%'}}>
        <AdminAside/>
        <div style={{width:'70%'}}><Outlet /></div>
        
        </div>

        
    </div>
  )
};

export const PartnerLayout = () => {
  return (
    <div>
      
        <NavPartner/>
        <div className='d-flex' style={{gap:'5%'}}>
        <PartnerAside/>
        <div style={{width:'70%'}}><Outlet /></div>
        
        </div>
        
    </div>
  )
};