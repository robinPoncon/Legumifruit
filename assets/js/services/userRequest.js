import axios from "axios";
import jwtDecode from "jwt-decode";

function getThemeUser() {
    const userTheme = window.localStorage.getItem("userTheme");
    if (userTheme) {
        return userTheme;
    }
    else {
        return "light";
    }
}

function setThemeUser(theme) {
    const token = window.localStorage.getItem("authToken");
    const jwtData = jwtDecode(token);
    const userId = jwtData.id;

    return axios
    .put("https://localhost:8000/api/users/" + userId, {colorTheme: theme})
    .then(userData => {
        let userTheme = userData.data.colorTheme;
        window.localStorage.setItem("userTheme", userTheme);
    });
}

function setAppTheme(theme) {
    const rootElement = document.querySelector("body");
    rootElement.setAttribute("data-theme", theme);
    // problem with body color 
}

export default {
    getThemeUser,
    setThemeUser,
    setAppTheme
}