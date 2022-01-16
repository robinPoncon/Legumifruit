import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import LocaleContext from '../../contexts/LocaleContext';
import fruitRequest from '../../services/fruitRequest';
import "../../../css/pages/fruits/fruits.scss";
import calendarRequest from '../../services/calendarRequest';

const FruitPage = ({history}) => {
    
    const {locale} = useContext(LocaleContext);

    const {id} = useParams();
    const [fruit, setFruit] = useState("");
    const [months, setMonths] = useState([]);

    useEffect(() => {
        fruitRequest.getFruit(id)
        .then(response => {
            setFruit(response.data);
            let calendarArray = response.data.calendar;
            calendarArray.forEach(calendar => {
                let newArray = calendar.split("/");
                let calendarId = newArray.at(-1);
                calendarRequest.getCalendar(calendarId)
                .then(response => {
                    if (locale === "en") {
                        setMonths(months => [...months, response.data.nameEN])
                    }
                    else {
                        setMonths(months => [...months, response.data.nameFR])
                    }
                })
                .catch(error => console.lor(error))
            });
        })
        .catch(error => console.log(error));
    }, []);

    const handleClick = () => {
        console.log(id);
        history.push("/fruits/" + id + "/modifier");
    }

    console.log(months);

    return ( 
        <div className="st-fruits">
            <div className="d-flex justify-content-center">
                <h1>{locale === "en" ? fruit.nameEN : fruit.nameFR}</h1>
                <p className="st-iconEdit" onClick={handleClick}></p>
            </div>
            <div className="d-flex justify-content-center">
                {fruit.fileUrl && <img src={fruit.fileUrl} alt={"image " + fruit.nameFR}/>}
                <div className="ml50 st-describeFruit">
                    <p>{locale === "en" ? fruit.descriptionEN : fruit.descriptionFR}</p>
                    <div className="mt50 d-flex">
                        <p className="fw700 fs16">Mois de consommation:</p> 
                        <p className="fs14 ml10 fw600 st-months">{months.map((month, i, array) => <span key={i} className="italic">{month}{i !== (array.length-1) ? ", " : ""}</span>)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default FruitPage;