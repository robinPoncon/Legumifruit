import axios from "axios";
import jwtDecode from "jwt-decode";

// const DEEPL_APIKEY="bc763c77-88e6-2693-03b9-9c8d3c92e45b%3Afx";

function getLocaleUser() {
    const userLocale = window.localStorage.getItem("userLocale");
    if (userLocale) {
        setAppLocale(userLocale);
        return userLocale;
    }
    else {
        setAppLocale("fr");
        return "fr";
    }
}

function setLocaleUser(locale) {
    const token = window.localStorage.getItem("authToken");
    let userId;
    window.localStorage.setItem("userLocale", locale);

    if (token) {
        const jwtData = jwtDecode(token);
        userId = jwtData.id;
    }

    if (userId) {
        return axios.put("https://localhost:8000/api/users/" + userId, {locale: locale});   
    }
}

function setAppLocale(locale) {
    const rootElement = document.querySelector("body");
    rootElement.setAttribute("data-locale", locale);
}

function translateDeepL(targetLang, text) {
//     const config = {
//         headers: {
//             "Access-Control-Allow-Origin": "*"
//         }
//     }
//     return axios
//     .get("https://api-free.deepl.com/v2/translate?auth_key=" + DEEPL_APIKEY + "&text=" + text + "&target_lang=" + targetLang, config)
//     .then(response => console.log(response));
}

export default {
    getLocaleUser,
    setLocaleUser,
    setAppLocale,
    translateDeepL
}