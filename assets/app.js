/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import React, {useState} from 'react';
import ReactDOM from "react-dom";

import './css/app.css';
import "./css/components/Navbar.scss";
import "./css/buttons.scss";
import "./css/tools.scss";
import "./css/fontSizeTemplate.scss";
import "./css/marginTemplate.scss";
import "./css/styleManagement.scss";

// start the Stimulus application
import './bootstrap';
import "./js/translation/i18n";
import Navbar from './js/components/Navbar';
import HomePage from './js/pages/HomePage';
import {Switch, Route, BrowserRouter, withRouter} from "react-router-dom";
import AllFruitsPage from './js/pages/Fruits/AllFruitsPage';
import AllVegetablesPage from "./js/pages/Vegetables/AllVegetablesPage";
import NotFoundPage from './js/pages/NotFoundPage';
import BlogPage from './js/pages/BlogPage';
import RegistrationPage from './js/pages/RegistrationPage';
import LoginPage from './js/pages/LoginPage';
import authAPI from "./js/services/authAPI";
import AuthContext from "./js/contexts/AuthContext";
import ThemeContext from './js/contexts/ThemeContext';
import themeColorRequest from './js/services/themeColorRequest';
import ThemeColor from './js/components/ThemeColor';
import localeRequest from "./js/services/localeRequest";
import LocaleContext from './js/contexts/LocaleContext';
import { useTranslation } from 'react-i18next';
import FruitPage from './js/pages/Fruits/FruitPage';
import EditFruitPage from './js/pages/Fruits/EditFruitPage';
import AddFruitPage from './js/pages/Fruits/AddFruitPage';
import "./css/responsive.scss";
import EditVegetablePage from './js/pages/Vegetables/EditVegetablePage';

authAPI.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());
    const [theme, setTheme] = useState(themeColorRequest.getThemeUser());
    const [locale, setLocale] = useState(localeRequest.getLocaleUser());

    const NavbarWithRouter = withRouter(Navbar);

    const contextValue = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated
    }

    const contextThemeValue = {
        theme: theme,
        setTheme: setTheme
    }

    const contextLocaleValue = {
        locale: locale,
        setLocale: setLocale
    }

    return (
        <LocaleContext.Provider value ={contextLocaleValue}>
            <ThemeContext.Provider value={contextThemeValue}>
                <AuthContext.Provider value={contextValue}>
                    <BrowserRouter> 
                        <NavbarWithRouter/>
                        <ThemeColor/>
                        <main className="st-principalContainer" data-theme={theme}>
                            <Switch>
                                <Route path="/fruits/ajouter" component={AddFruitPage}></Route>
                                <Route path="/fruits/:id/modifier" component={EditFruitPage}></Route>
                                <Route path="/fruits/:id" component={FruitPage}></Route>
                                <Route exact path="/fruits" component={AllFruitsPage}></Route>
                                <Route path="/legumes/:id/modifier" component={EditVegetablePage}></Route>
                                <Route exact path="/legumes" component={AllVegetablesPage}></Route>
                                <Route exact path="/blog" component={BlogPage}></Route>
                                <Route exact path="/registration" component={RegistrationPage}></Route>
                                <Route exact path="/login" component={LoginPage}/>
                                <Route exact path="/" component={HomePage}></Route>
                                <Route path="*" component={NotFoundPage}></Route>
                            </Switch>
                        </main>
                    </BrowserRouter>
                </AuthContext.Provider>
            </ThemeContext.Provider>
        </LocaleContext.Provider>
    )
}

const rootElement = document.querySelector("#app");
ReactDOM.render(<App></App>, rootElement);