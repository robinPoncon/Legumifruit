import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import authAPI from "../services/authAPI";
import userRequest from "../services/userRequest";
import authContext from "../contexts/AuthContext";

const Navbar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(authContext);

    const handleLogout = () => {
        authAPI.logout();
        userRequest.setAppTheme("light");
        setIsAuthenticated(false);
        history.push("/login");
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
                {!isAuthenticated ? 
                    <>
                        <NavLink to="/registration">Registration</NavLink>
                        <NavLink to="/login">Login</NavLink>
                    </>
                :  
                    <button type="button" onClick={handleLogout}>Logout</button>
                }
            </div>
        </nav>
     );
}
 
export default Navbar;