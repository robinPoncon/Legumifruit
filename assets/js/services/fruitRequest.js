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
    .then(response => response.data.id);
}

function updateFruit(idFruit, fruitDatas) {
    return axios
    .put("https://localhost:8000/api/fruits/" + idFruit, fruitDatas)
    .then(response => console.log("work"));
}

function updateImgFruit(idFruit, img) {
    let formData = new FormData();
    formData.append("file", img);

    const config = {
        headers: { 
            "Content-Type": "multipart/form-data" 
        }
    }
    return axios
    .post("https://localhost:8000/api/fruits/" + idFruit + "/image", formData, config)
    .then(response => console.log("uplaod"));
}

function deleteFruit(idFruit) {
    return axios
    .delete("https://localhost:8000/api/fruits/" + idFruit);
}

export default {
    getFruit,
    getAllFruits,
    addFruit,
    updateFruit, 
    updateImgFruit,
    deleteFruit
};