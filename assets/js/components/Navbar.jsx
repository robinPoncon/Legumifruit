import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';

const Navbar = (props) => {
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
                <Button classButton="" content="Logout"></Button>
            </div>
        </nav>
     );
}
 
export default Navbar;