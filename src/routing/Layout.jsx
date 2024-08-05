import { NavLink, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FaTruckArrowRight } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsFillCalculatorFill } from "react-icons/bs";
import Style from '../routing/layout.module.css'
const Layout = () => {
  return (
    <>
      <Toaster />
      <main className={Style.sidebar}>
        <div className={Style.layout}>
          <ul>
            <li>
              <NavLink to='/mymoves' className={({ isActive }) => isActive ? Style.active : ''}>
                <FaTruckArrowRight /> My Moves
              </NavLink>
            </li>
            <li>
              <NavLink to='/myprofile' className={({ isActive }) => isActive ? Style.active : ''}>
                <FaUserAlt /> My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to='/getquotes' className={({ isActive }) => isActive ? Style.active : ''}>
                <BsFillCalculatorFill /> Get Quotes
              </NavLink>
            </li>
            <li>
              <NavLink to='/' className={({ isActive }) => isActive ? Style.active : ''}>
                <RiLogoutCircleLine /> Logout
              </NavLink>
            </li>
          </ul>
        </div>

        <Outlet />
      </main>
    </>
  );
}

export default Layout;
