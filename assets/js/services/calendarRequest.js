import axios from "axios";

function getCalendar(id) {
    return axios
    .get("https://localhost:8000/api/calendars/" + id);
}

export default {
    getCalendar
}