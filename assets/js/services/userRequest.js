import axios from "axios";

function create(userDatas) {
    return axios
    .post("https://localhost:8000/api/users", userDatas)
    .then(response => console.log(response));
}

function getRoleUser() {
    const roleUser = window.localStorage.getItem("roleUser");
    if (roleUser) {
        if (roleUser.includes("ROLE_ADMIN"))
        {
            return "ADMIN";
        }
        else {
            return "USER";
        }
    }
    else {
        return "USER"
    }
}

export default {
    create,
    getRoleUser
};