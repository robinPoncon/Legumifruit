import React, {useContext, useState} from 'react';
import { NavLink } from 'react-router-dom';
import authAPI from "../services/authAPI";
import themeColorRequest from "../services/themeColorRequest";
import authContext from "../contexts/AuthContext";
import SwitchLang from "../translation/SwitchLang";
import { useTranslation } from 'react-i18next';

const Navbar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(authContext);
    const {t} = useTranslation();
    const [breakpoint] = useState(window.innerWidth);
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const handleLogout = () => {
        authAPI.logout();
        themeColorRequest.setAppTheme("light");
        setIsAuthenticated(false);
        history.push("/login");
    }

    const handleShowMenu = () => {
        isOpenMenu ? setIsOpenMenu(false) : setIsOpenMenu(true);
    }

    console.log(breakpoint);

    return ( 
        <nav className={"d-flex st-navbarContainer" + (breakpoint <= 768 ? " flex-column" : "")}>
            {breakpoint > 768 &&
            <>
                <div className="st-navigationLeft">
                    <ul>
                        <li className="fs30"><NavLink to="/">Légumifruit</NavLink></li>
                        <li className="fs18"><NavLink to="/legumes">{t("nav.vegetables")}</NavLink></li>
                        <li className="fs18"><NavLink to="/fruits">{t("nav.fruits")}</NavLink></li>
                        <li className="fs18"><NavLink to="/blog">{t("nav.blog")}</NavLink></li>
                    </ul>
                </div>
                <div className="st-navigationRight d-flex">
                    <SwitchLang/>
                    {!isAuthenticated ? 
                        <>
                            <NavLink to="/registration">{t("nav.registration")}</NavLink>
                            <NavLink to="/login">{t("nav.login")}</NavLink>
                        </>
                    :  
                        <button type="button" onClick={handleLogout}>{t("nav.logout")}</button>
                    }
                </div>
            </>
            }
            {isOpenMenu && breakpoint <= 768 &&
            <div className="st-blocMenuMobile">
                <div className="st-navigationLeftMobile">
                    <ul>
                        <li className="fs18"><NavLink to="/legumes" onClick={() => setIsOpenMenu(false)}>{t("nav.vegetables")}</NavLink></li>
                        <li className="fs18"><NavLink to="/fruits" onClick={() => setIsOpenMenu(false)}>{t("nav.fruits")}</NavLink></li>
                        <li className="fs18"><NavLink to="/blog" onClick={() => setIsOpenMenu(false)}>{t("nav.blog")}</NavLink></li>
                    </ul>
                </div>
                <div className="st-navigationRightMobile">
                    {!isAuthenticated ? 
                        <>
                            <NavLink to="/registration" onClick={() => setIsOpenMenu(false)}>{t("nav.registration")}</NavLink>
                            <NavLink to="/login">{t("nav.login")}</NavLink>
                        </>
                    :  
                        <button type="button" onClick={handleLogout}>{t("nav.logout")}</button>
                    }
                </div>
                <SwitchLang/>
            </div>
            }
            {breakpoint <= 768 && 
                <>
                    <p className="fs30"><NavLink to="/">Légumifruit</NavLink></p>
                    <div className="st-blocMenu" onClick={handleShowMenu}>
                        <p className={isOpenMenu ? "st-closeMenu" : "st-openMenu"}/>
                    </div> 
                </>
            }
        </nav>
     );
}
 
export default Navbar;