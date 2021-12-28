import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import authAPI from "../services/authAPI";
import userRequest from "../services/userRequest";
import themeContext from "../contexts/ThemeContext";
import authContext from "../contexts/AuthContext";

const Navbar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(authContext);
    const {theme, setTheme} = useContext(themeContext);

    const handleLogout = () => {
        authAPI.logout();
        setTheme("light");
        userRequest.setAppTheme("light");
        setIsAuthenticated(false);
        history.push("/login");
    }

    const switchTheme = async() => {
        if (theme === "light") {
            try {
                await userRequest.setThemeUser("dark");
                setTheme("dark");
            }
            catch(error) {
                console.log(error);
            }
        }
        else {
            try {
                await userRequest.setThemeUser("light");
                setTheme("light");
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    return ( 
        <nav className="d-flex st-navbarContainer" data-theme={theme}>
            <div className="st-navigation">
                <ul>
                    <li><NavLink to="/">Légumifruit</NavLink></li>
                    <li><NavLink to="/vegetables">Légumes</NavLink></li>
                    <li><NavLink to="/fruits">Fruits</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
            </div>
            <div>
                <button onClick={switchTheme}>{theme === "light" ? "DarkMode" : "LightMode"}</button>
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