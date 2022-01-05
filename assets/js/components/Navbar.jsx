import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import authAPI from "../services/authAPI";
import themeColorRequest from "../services/themeColorRequest";
import authContext from "../contexts/AuthContext";
import SwitchLang from "../translation/SwitchLang";
import { useTranslation } from 'react-i18next';

const Navbar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(authContext);
    const {t} = useTranslation();

    const handleLogout = () => {
        authAPI.logout();
        themeColorRequest.setAppTheme("light");
        setIsAuthenticated(false);
        history.push("/login");
    }

    return ( 
        <nav className="d-flex st-navbarContainer">
            <div className="st-navigationLeft">
                <ul>
                    <li className="fs30"><NavLink to="/">Légumifruit</NavLink></li>
                    <li className="fs18"><NavLink to="/vegetables">{t("nav.vegetables")}</NavLink></li>
                    <li className="fs18"><NavLink to="/fruits">{t("nav.fruits")}</NavLink></li>
                    <li className="fs18"><NavLink to="/blog">{t("nav.blog")}</NavLink></li>
                </ul>
            </div>
            <SwitchLang/>
            <div className="st-navigationRight">
                {!isAuthenticated ? 
                    <>
                        <NavLink to="/registration">{t("nav.registration")}</NavLink>
                        <NavLink to="/login">{t("nav.login")}</NavLink>
                    </>
                :  
                    <button type="button" onClick={handleLogout}>{t("nav.logout")}</button>
                }
            </div>
        </nav>
     );
}
 
export default Navbar;