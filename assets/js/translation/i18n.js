import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Language from "./enums/Language";
import translationFR from "./i18n/translationFR.json";
import translationEN from "./i18n/translationEN.json";
import i18n from "i18next";

let defaultLanguage = Language.FR;

// The translations

const resources = {
    en: {
        translation: translationEN
    },
    fr: {
        translation: translationFR
    }
};

i18n.use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: defaultLanguage,
        keySeparator: ".", // to support nested translations
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;