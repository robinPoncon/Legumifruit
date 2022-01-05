import React, {useContext} from 'react';
import themeColorRequest from "../services/themeColorRequest";
import themeContext from "../contexts/ThemeContext";
import "../../css/components/ThemeColor.scss";

const ThemeColor = () => {

    const {theme, setTheme} = useContext(themeContext);

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
            <p className="st-nameTheme">{theme === "light" ? "Dark Theme" : "Light Theme"}</p>
        </div> 
    );
}
 
export default ThemeColor;