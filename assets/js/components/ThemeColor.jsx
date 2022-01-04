import React, {useContext} from 'react';
import userRequest from "../services/userRequest";
import themeContext from "../contexts/ThemeContext";
import "../../css/components/ThemeColor.scss";

const ThemeColor = () => {

    const {theme, setTheme} = useContext(themeContext);

    const switchTheme = async() => {
        if (theme === "light") {
            try {
                await userRequest.setThemeUser("dark");
                setTheme("dark");
            }
            catch(error) {
                console.log(error);
            }
        }
        else {
            try {
                await userRequest.setThemeUser("light");
                setTheme("light");
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    return ( 
        <div className="d-flex cpointer st-blocTheme" onClick={switchTheme}>
            <p className="st-iconSun" title="sun icon" data-theme={theme}/>
            <p className="st-nameTheme">{theme === "light" ? "Dark Theme" : "Light Theme"}</p>
        </div> 
    );
}
 
export default ThemeColor;