import React, {useContext} from 'react';
import themeColorRequest from "../services/themeColorRequest";
import themeContext from "../contexts/ThemeContext";
import "../../css/components/ThemeColor.scss";
import { useTranslation } from 'react-i18next';

const ThemeColor = () => {

    const {theme, setTheme} = useContext(themeContext);
    const {t} = useTranslation();

    const switchTheme = async() => {
        if (theme === "light") {
            try {
                await themeColorRequest.setThemeUser("dark");
                setTheme("dark");
            }
            catch(error) {
                console.log(error);
            }
        }
        else {
            try {
                await themeColorRequest.setThemeUser("light");
                setTheme("light");
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    return ( 
        <div className="d-flex cpointer st-blocTheme" onClick={switchTheme}>
            <p className="st-iconSun" data-theme={theme}/>
            <p className="st-nameTheme">{theme === "light" ? t("nav.dark-theme") : t("nav.light-theme")}</p>
        </div> 
    );
}
 
export default ThemeColor;