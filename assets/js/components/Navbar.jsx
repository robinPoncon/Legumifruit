import React from 'react';
import { NavLink } from 'react-router-dom';
import {logout} from "../services/authApi";

const Navbar = (props) => {

    const handleLogout = () => {
        return logout();
    }

    return ( 
        <nav className="d-flex st-navbarContainer">
            <div className="st-navigation">
                <ul>
                    <li><NavLink to="/">Légumifruit</NavLink></li>
                    <li><NavLink to="/vegetables">Légumes</NavLink></li>
                    <li><NavLink to="/fruits">Fruits</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
            </div>
            <div>
                <NavLink to="/registration">Registration</NavLink>
                <NavLink to="/login">Login</NavLink>
                <button type="button" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
     );
}
 
export default Navbar;