
import { Navbarhead } from './Navbar';
import { Outlet } from 'react-router-dom';


export const Layout = () => {
  return (
    <div>
      
        <Navbarhead/>
        <Outlet/>
        
    </div>
  )
};