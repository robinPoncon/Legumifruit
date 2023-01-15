import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import LocaleContext from '../../contexts/LocaleContext';
import "../../../css/pages/fruits/fruits.scss";
import calendarRequest from '../../services/calendarRequest';
import userRequest from '../../services/userRequest';
import vegetableRequest from '../../services/vegetableRequest';

const VegetablePage = ({history}) => {
    
    const {locale} = useContext(LocaleContext);

    const {id} = useParams();
    const [vegetable, setVegetable] = useState("");
    const roleUser = useState(userRequest.getRoleUser());
    const [months, setMonths] = useState([]);

    useEffect(() => {
        vegetableRequest.getVegetable(id)
        .then(response => {
            setVegetable(response.data);
            let calendarArray = response.data.calendar;
            calendarArray.forEach(calendar => {
                let newArray = calendar.split("/");
                let calendarId = newArray.at(-1);
                setMonths([]);
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
    }, [locale]);

    const handleClick = () => {
        history.push("/legumes/" + id + "/modifier");
    }

    const handleDelete = async() => {
        await vegetableRequest.deleteVegetable(id);
        history.replace("/legumes");
    }

    return ( 
        <div className="st-fruits">
            <div className="d-flex justify-content-center">
                <h1>{locale === "en" ? vegetable.nameEN : vegetable.nameFR}</h1>
                {roleUser[0] === "ADMIN" && 
                    <>
                        <p className="st-iconEdit" onClick={handleClick}></p>
                        <p className="st-iconDelete ml10" onClick={handleDelete}></p>
                    </>
                }
            </div>
            <div className="d-flex justify-content-center st-blocFruitDetail">
                {vegetable.fileUrl && <img src={vegetable.fileUrl} alt={"image " + vegetable.nameFR}/>}
                <div className="ml50 st-describeFruit">
                    <p>{locale === "en" ? vegetable.descriptionEN : vegetable.descriptionFR}</p>
                    <div className="mt50 d-flex st-showMonths">
                        <p className="fw700 fs16">Mois de consommation:</p> 
                        <p className="fs14 ml10 fw600 st-months">{months.map((month, i, array) => <span key={i} className="italic">{month}{i !== (array.length-1) ? ", " : ""}</span>)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default VegetablePage;