import React, {useContext, useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import { Language } from './enums/Language';
import localeRequest from "../services/localeRequest";
import LocaleContext from "../contexts/LocaleContext";
import flagFR from "../../images/other/flagFR.jpg";
import flagEN from "../../images/other/flagEN.jpg";
 
const SwitchLang = () => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState(localeRequest.getLocaleUser());
    const {locale, setLocale} = useContext(LocaleContext);

    let changeLanguage = (language) => {
        //let language = event.target.value;
 
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

    console.log("locale est en " + locale);
 
    return (
        <div className="mtb-auto">
            {locale === "fr" ? 
                <img className="cpointer" src={flagEN} alt="flag EN" onClick={() => changeLanguage(Language.EN)} width="40px" height="30px"/>
            :
                <img className="cpointer" src={flagFR} alt="flag FR" onClick={() => changeLanguage(Language.FR)} width="40px" height="30px"/>
            }
        </div>
    )
}
 
export default SwitchLang;