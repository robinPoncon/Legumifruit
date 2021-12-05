/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import React from 'react';
import ReactDOM from "react-dom";

import './styles/app.css';

// start the Stimulus application
import './bootstrap';

console.log("hello maggle");

const App = () => {
    return <h1>Bonjour à tous !</h1>
}

const rootElement = document.querySelector("#app");
ReactDOM.render(<App></App>, rootElement);