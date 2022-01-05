import axios from "axios";
import jwtDecode from "jwt-decode";

function getThemeUser() {
    const userTheme = window.localStorage.getItem("userTheme");
    if (userTheme) {
        setAppTheme(userTheme);
        return userTheme;
    }
    else {
        setAppTheme("light");
        return "light";
    }
}

function setThemeUser(theme) {
    const token = window.localStorage.getItem("authToken");
    let userId;
    window.localStorage.setItem("userTheme", theme);

    if (token) {
        const jwtData = jwtDecode(token);
        userId = jwtData.id;
    }

    if (userId) {
        return axios.put("https://localhost:8000/api/users/" + userId, {colorTheme: theme});   
    }
}

function setAppTheme(theme) {
    const rootElement = document.querySelector("body");
    rootElement.setAttribute("data-theme", theme);
}

export default {
    getThemeUser,
    setThemeUser,
    setAppTheme
}