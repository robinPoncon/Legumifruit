import axios from "axios";

export const logout = () => {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

export const login = (credentials) => {
    return axios
        .post("https://localhost:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            console.log(token);
            window.localStorage.setItem("authToken", token);
            axios.defaults.headers["Authorization"] = "Bearer " + token;
        });
}