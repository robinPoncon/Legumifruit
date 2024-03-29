import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LocaleContext from '../contexts/LocaleContext';
import calendarRequest from '../services/calendarRequest';
import "../../css/pages/home/home.scss";

const HomePage = ({history}) => {
    const { t } = useTranslation();
    const {locale} = useContext(LocaleContext);
    const [isLoading, setIsLoading] = useState(false);
    const [actifMonth, setActifMonth] = useState("January");
    const [allMonths, setAllMonths] = useState([]);
    const [fruitsAndVegetablesPerMonth, setFruitsAndVegetablesPerMonth] = useState({
        "January": [],
        "February": [],
        "March": [],
        "April": [],
        "May": [],
        "June": [],
        "July": [],
        "August": [],
        "September": [],
        "October": [],
        "November": [],
        "December": [],
    });
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
        setActifMonth(todayMonth);
    }, [locale]);

    useEffect(() => {
        if (allMonths) {
            let copyfruitsAndVegetables = {...fruitsAndVegetablesPerMonth};
            for (let month of allMonths) {
                copyfruitsAndVegetables[month.nameEN] = {fruits: month.fruits, vegetables: month.vegetables};
            }
            setFruitsAndVegetablesPerMonth(copyfruitsAndVegetables);
            setIsLoading(true);
        }
    }, [allMonths]);

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
        setActifMonth(month);
    }

    const handleSelectFruit = (fruitId) => {
        history.push("/fruits/" + fruitId);
    }

    const handleSelectVegetable = (vegetableId) => {
        history.push("/legumes/" + vegetableId);
    }
    
    return ( 
        <article className="st-blocHome">
            <h1 className="mb20">{t("homePage.welcome")}</h1> 
            <h2 className="mb50">{t("homePage.find-all-items")}</h2>

            <div className="d-flex flex-wrap justify-content-between">
                {allMonths.map(month => (
                    <p key={month.id}
                        className={"st-monthsHome mb30 " + (arrayMonths[month.nameEN] ? "active" : "")} 
                        onClick={() => handleSelectMonth(month.nameEN, month.fruits)}>{locale === "en" ? month.nameEN : month.nameFR}
                    </p>
                ))}
            </div>
            <div>
                <p className="st-fruitPerMonth">{t("nav.fruits")} :</p>
                <ul>
                    {fruitsAndVegetablesPerMonth[actifMonth]?.fruits?.sort((a, b) => (locale === "en" ? (a.nameEN > b.nameEN ? 1 : -1) : (a.nameFR > b.nameFR ? 1 : -1))).map((fruit, index) => (
                        <li className="st-fruitOrVegetableName" key={index} onClick={() => handleSelectFruit(fruit.id)}>{locale === "en" ? fruit.nameEN : fruit.nameFR}</li>
                    ))}
                </ul>
                <p className="st-vegetablePerMonth">{t("nav.vegetables")} :</p>
                <ul>
                    {fruitsAndVegetablesPerMonth[actifMonth]?.vegetables?.sort((a, b) => (locale === "en" ? (a.nameEN > b.nameEN ? 1 : -1) : (a.nameFR > b.nameFR ? 1 : -1))).map((vegetable, index) => (
                        <li className="st-fruitOrVegetableName" key={index} onClick={() => handleSelectVegetable(vegetable.id)}>{locale === "en" ? vegetable.nameEN : vegetable.nameFR}</li>
                    ))}
                </ul>
            </div>
        </article>
    );
}
 
export default HomePage;