import axios from "axios";
import jwtDecode from "jwt-decode";

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function login(credentials) {
    return axios
    .post("https://localhost:8000/api/login_check", credentials)
    .then(response => response.data.token)
    .then(token => {
        window.localStorage.setItem("authToken", token);
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
            console.log("conexxion reussi");
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