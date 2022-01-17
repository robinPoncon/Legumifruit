import axios from "axios";

function getCalendar(id) {
    return axios
    .get("https://localhost:8000/api/calendars/" + id);
}

function getAllCalendars() {
    return axios
    .get("https://localhost:8000/api/calendars");
}

export default {
    getCalendar,
    getAllCalendars
}