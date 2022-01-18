import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LocaleContext from '../contexts/LocaleContext';
import calendarRequest from '../services/calendarRequest';
import "../../css/pages/home/home.scss";

const HomePage = (props) => {
    const { t } = useTranslation();
    const {locale} = useContext(LocaleContext);
    const [allMonths, setAllMonths] = useState([]);
    const [arrayMonths, setArrayMonths] = useState({
        "January": false,
        "February": false,
        "March": false,
        "April": false,
        "May": false,
        "June": false,
        "July": false,
        "August": false,
        "September": false,
        "October": false,
        "November": false,
        "December": false,
    })

    useEffect(() => {
        calendarRequest.getAllCalendars()
        .then(response => {
            setAllMonths(response.data);
        })
        .catch(error => console.log(error));

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let todayMonth = monthNames[new Date().getMonth()];
        setArrayMonths({...arrayMonths, [todayMonth]: true});
    }, [])

    const handleSelectMonth = (month) => {
        let newObject = arrayMonths;
        for (let i in newObject) {
            if (i === month) {
                newObject[i] = true;
            }
            else {
                newObject[i] = false;
            }
        }
        setArrayMonths({...arrayMonths, newObject});
    }
    
    return ( 
        <article className="st-blocHome">
            <h1 className="mb30">{t("homePage.welcome")}</h1> 
            <h2 className="mb50">{t("homePage.find-all-items")}</h2>

            <div className="d-flex flex-wrap justify-content-between mt30">
                {allMonths.map(month => (
                    <p key={month.id}
                        className={"st-months mb30 " + (arrayMonths[month.nameEN] ? "active" : "")} 
                        onClick={() => handleSelectMonth(month.nameEN)}>{locale === "en" ? month.nameEN : month.nameFR}
                    </p>
                ))}
            </div>
        </article>
    );
}
 
export default HomePage;