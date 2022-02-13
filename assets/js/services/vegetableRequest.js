import axios from "axios";

function getVegetable(id) {
    return axios
    .get("https://localhost:8000/api/vegetables/" + id);
}

function getAllVegetables() {
    return axios
    .get("https://localhost:8000/api/vegetables")
    .then(response => response.data);
}

function addVegetable(vegetableDatas) {
    return axios
    .post("https://localhost:8000/api/vegetables", vegetableDatas)
    .then(response => response.data.id);
}

function updateVegetable(idVegetable, vegetableDatas) {
    return axios
    .put("https://localhost:8000/api/vegetables/" + idVegetable, vegetableDatas)
    .then(response => console.log("work"));
}

function updateImgVegetable(idVegetable, img) {
    let formData = new FormData();
    formData.append("file", img);

    const config = {
        headers: { 
            "Content-Type": "multipart/form-data" 
        }
    }
    return axios
    .post("https://localhost:8000/api/vegetables/" + idVegetable + "/image", formData, config)
    .then(response => console.log(response));
}

function deleteVegetable(idVegetable) {
    return axios
    .delete("https://localhost:8000/api/vegetables/" + idVegetable);
}

export default {
    getVegetable,
    getAllVegetables,
    addVegetable,
    updateVegetable, 
    updateImgVegetable,
    deleteVegetable
};