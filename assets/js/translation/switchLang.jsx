import React, {useContext, useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import { Language } from './enums/Language';
import localeRequest from "../services/localeRequest";
import LocaleContext from "../contexts/LocaleContext";
 
const SwitchLang = () => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState(localeRequest.getLocaleUser());
    const {setLocale} = useContext(LocaleContext);

    let changeLanguage = (event) => {
        let language = event.target.value;
 
        switch (language) {
            case Language.EN:
                setLang(Language.EN);
                setLocale(Language.EN);
                i18n.changeLanguage(Language.EN);
                break;
            case Language.FR:
            default:
                setLang(Language.FR);
                setLocale(Language.FR);
                i18n.changeLanguage(Language.FR);
                break;
        }
        localeRequest.setLocaleUser(language);
    }

    useEffect(() => {
        if (lang === "en") {
            i18n.changeLanguage(Language.EN);
        }
    }, [lang]);
 
    return (
        <div>
            <div>
                <select value={lang} name="language" onChange={changeLanguage}>
                    <option value={Language.FR}>FR</option>
                    <option value={Language.EN}>EN</option>
                </select>
            </div>
        </div>
    )
}
 
export default SwitchLang;