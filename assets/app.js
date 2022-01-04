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
import "./css/styleManagement.scss";

// start the Stimulus application
import './bootstrap';
import Navbar from './js/components/Navbar';
import HomePage from './js/pages/HomePage';
import {Switch, Route, BrowserRouter, withRouter} from "react-router-dom";
import AllFruitsPage from './js/pages/Fruits/AllFruitsPage';
import NotFoundPage from './js/pages/NotFoundPage';
import AllVegetablesPage from './js/pages/AllVegetablesPage';
import ContactPage from './js/pages/ContactPage';
import RegistrationPage from './js/pages/RegistrationPage';
import LoginPage from './js/pages/LoginPage';
import authAPI from "./js/services/authAPI";
import AuthContext from "./js/contexts/AuthContext";
import ThemeContext from './js/contexts/ThemeContext';
import userRequest from './js/services/userRequest';
import ThemeColor from './js/components/ThemeColor';

authAPI.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());
    const [theme, setTheme] = useState(userRequest.getThemeUser());

    const NavbarWithRouter = withRouter(Navbar);

    const contextValue = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated
    }

    const contextThemeValue = {
        theme: theme,
        setTheme: setTheme
    }

    // const switchTheme = () => {
    //     if (theme === "light") {
    //         setTheme("dark");
    //     }
    //     else {
    //         setTheme("light");
    //     }
    // }

    console.log(theme);

    return (
        <ThemeContext.Provider value={contextThemeValue}>
            <AuthContext.Provider value={contextValue}>
                <BrowserRouter> 
                    <NavbarWithRouter/>
                    <ThemeColor/>
                    <main className="st-principalContainer" data-theme={theme}>
                        <Switch>
                            <Route exact path="/fruits" component={AllFruitsPage}></Route>
                            <Route exact path="/vegetables" component={AllVegetablesPage}></Route>
                            <Route exact path="/contact" component={ContactPage}></Route>
                            <Route exact path="/registration" component={RegistrationPage}></Route>
                            <Route exact path="/login" component={LoginPage}/>
                            <Route exact path="/" component={HomePage}></Route>
                            <Route path="*" component={NotFoundPage}></Route>
                        </Switch>
                    </main>
                </BrowserRouter>
            </AuthContext.Provider>
        </ThemeContext.Provider>
    )
}

const rootElement = document.querySelector("#app");
ReactDOM.render(<App></App>, rootElement);