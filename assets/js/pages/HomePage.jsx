import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LocaleContext from '../contexts/LocaleContext';
import calendarRequest from '../services/calendarRequest';
import "../../css/pages/home/home.scss";
import fruitRequest from '../services/fruitRequest';

const HomePage = ({history}) => {
    const { t } = useTranslation();
    const {locale} = useContext(LocaleContext);
    const [isLoading, setIsLoading] = useState(false);
    const [actifMonth, setActifMonth] = useState("January");
    const [allMonths, setAllMonths] = useState([]);
    const [fruitsPerMonth, setFruitsPerMonth] = useState({
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

    let newDataObject = fruitsPerMonth;

    useEffect(() => {
        calendarRequest.getAllCalendars()
        .then(response => {
            setAllMonths(response.data);
            response.data.forEach(dataMonth => {
                let arrayFruitsId = dataMonth.fruits;
                let arrayFruits = [];
                arrayFruitsId.forEach(fruit => {
                    let fruitId = Number(fruit.match(/\d+/)[0]);
                    fruitRequest.getFruit(fruitId).then(res => {
                        arrayFruits.push(res.data);
                    });
                })
                for (let i in newDataObject) {
                    if (i === dataMonth.nameEN) {
                        newDataObject[i] = arrayFruits;
                    }
                }
            })
            setIsLoading(true);
        })
        .catch(error => console.log(error));

        setTimeout(() => {
            setFruitsPerMonth({...fruitsPerMonth, newDataObject});
            console.log("test");
        }, 1500);

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let todayMonth = monthNames[new Date().getMonth()];
        setArrayMonths({...arrayMonths, [todayMonth]: true});
        setActifMonth(todayMonth);
    }, [locale])

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
        history.push("/fruits/" + fruitId)
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
                <ul>
                    {fruitsPerMonth[actifMonth].sort((a, b) => (locale === "en" ? (a.nameEN > b.nameEN ? 1 : -1) : (a.nameFR > b.nameFR ? 1 : -1))).map(fruit => (
                        <li className="st-fruitName" key={fruit.id} onClick={() => handleSelectFruit(fruit.id)}>{locale === "en" ? fruit.nameEN : fruit.nameFR}</li>
                    ))}
                </ul>
            </div>
        </article>
    );
}
 
export default HomePage;