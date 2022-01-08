import axios from "axios";

function getFruit(id) {
    return axios
    .get("https://localhost:8000/api/fruits/" + id);
}

function getAllFruits() {
    return axios
    .get("https://localhost:8000/api/fruits")
    .then(response => response.data);
}

function addFruit(fruitDatas) {
    return axios
    .post("https://localhost:8000/api/fruits", fruitDatas)
    .then(response => console.log(response));
}

export default {
    getFruit,
    getAllFruits,
    addFruit
};