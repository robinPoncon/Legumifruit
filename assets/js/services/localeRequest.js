import axios from "axios";
import jwtDecode from "jwt-decode";

function getLocaleUser() {
    const userLocale = window.localStorage.getItem("userLocale");
    if (userLocale) {
        setAppLocale(userLocale);
        return userLocale;
    }
    else {
        setAppLocale("fr");
        return "fr";
    }
}

function setLocaleUser(locale) {
    const token = window.localStorage.getItem("authToken");
    let userId;
    window.localStorage.setItem("userLocale", locale);

    if (token) {
        const jwtData = jwtDecode(token);
        userId = jwtData.id;
    }

    if (userId) {
        return axios.put("https://localhost:8000/api/users/" + userId, {locale: locale});   
    }
}

function setAppLocale(locale) {
    const rootElement = document.querySelector("body");
    rootElement.setAttribute("data-locale", locale);
}

export default {
    getLocaleUser,
    setLocaleUser,
    setAppLocale
}