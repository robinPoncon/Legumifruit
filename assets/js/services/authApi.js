import axios from "axios";
import jwtDecode from "jwt-decode";

function logout() {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userTheme");
    window.localStorage.removeItem("userLocale");
    window.localStorage.removeItem("userRole");
    delete axios.defaults.headers["Authorization"];
}

function login(credentials) {
    return axios
    .post("https://localhost:8000/api/login_check", credentials)
    .then(response => response.data.token)
    .then(token => {
        let jwtData = jwtDecode(token);
        window.localStorage.setItem("userTheme", jwtData.colorTheme);
        window.localStorage.setItem("userLocale", jwtData.locale);
        window.localStorage.setItem("authToken", token);
        window.localStorage.setItem("roleUser", jwtData.roles);
        setAxiosToken(token);
    });
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup() {
    const token = window.localStorage.getItem("authToken");

    if (token) {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > new Date().getTime()) {
            setAxiosToken(token);
        }
        else {
            logout();
        }
    }
    else {
        logout();
    }
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");

    if (token) {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > new Date().getTime()) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

export default {
    logout, 
    login,
    setup,
    isAuthenticated
}