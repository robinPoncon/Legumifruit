import React, { ChangeEvent, useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Language from "./enums/Language";
import localeRequest from "../services/localeRequest";

const Lang = () => {
    const { i18n } = useTranslation();
    const [locale, setLocale] = useState(i18n.language);
    console.log(i18n);
    useEffect(() => {
        // if{
        //     getUserInfos(state.loginCookie, state.idUser).then(res => {
        //         let locale = res.data.locale.toLowerCase();
        //         if (locale === "es") {
        //             i18n.changeLanguage(Language.ES);
        //             setLang(Language.ES);
        //         }
        //         else {
        //             i18n.changeLanguage(Language.FR);
        //             setLang(Language.FR);
        //         }
        //     }).catch(err => console.log(err));
        // }
        let locale = localeRequest.getLocaleUser();
        if (locale === "en") {
            i18n.changeLanguage(Language.EN);
            setLocale(Language.EN);
        }
        else {
            i18n.changeLanguage(Language.FR);
            setLocale(Language.FR);
        }
    },);

    // const changeLanguage = (event) => {
    //     let language = event.target.value;
    //     setLocale(language);
    // }

    return (
        <div>
            <div>
                <select value={locale} name="language" className="selectLanguage" onChange={changeLanguage}>
                    <option value={Language.FR}>FR</option>
                    <option value={Language.EN}>EN</option>
                </select>
            </div>
        </div>
    )
}

export default Lang;