import axios from "axios";

function create(userDatas) {
    return axios
    .post("https://localhost:8000/api/users", userDatas)
    .then(response => console.log(response));
}

export default {
    create
};