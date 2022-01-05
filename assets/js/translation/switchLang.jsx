import React, {useState} from "react";
import { useTranslation } from 'react-i18next';
import { Language } from './enums/Language';
import localeRequest from "../services/localeRequest";
 
const SwitchLang = () => {
    const { i18n } = useTranslation();
    const [locale, setLocale] = useState(localeRequest.getLocaleUser());

    let changeLanguage = (event) => {
        let language = event.target.value;
 
        switch (language) {
            case Language.EN:
                setLocale(Language.EN);
                i18n.changeLanguage(Language.EN);
                break;
            case Language.FR:
            default:
                setLocale(Language.FR);
                i18n.changeLanguage(Language.FR);
                break;
        }
        localeRequest.setLocaleUser(language);
    }
 
    return (
        <div>
            <div>
                <select value={locale} name="language" onChange={changeLanguage}>
                    <option value={Language.FR}>FR</option>
                    <option value={Language.EN}>EN</option>
                </select>
            </div>
        </div>
    )
}
 
export default SwitchLang;