import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import LocaleContext from '../../contexts/LocaleContext';
import fruitRequest from '../../services/fruitRequest';
import "../../../css/pages/fruits/fruits.scss";
import calendarRequest from '../../services/calendarRequest';
import userRequest from '../../services/userRequest';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const FruitPage = ({history}) => {
    
    const {locale} = useContext(LocaleContext);
    const {t} = useTranslation();
    const {id} = useParams();
    const [fruit, setFruit] = useState("");
    const roleUser = useState(userRequest.getRoleUser());
    const [months, setMonths] = useState([]);

    useEffect(() => {
        fruitRequest.getFruit(id)
        .then(response => {
            setFruit(response.data);
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
        history.push("/fruits/" + id + "/modifier");
    }

    const handleDelete = async() => {
        await fruitRequest.deleteFruit(id);
        toast.success(t("flash-message.delete-fruit"));
        history.replace("/fruits");
    }

    return ( 
        <div className="st-fruits">
            <div className="d-flex justify-content-center">
                <h1>{locale === "en" ? fruit.nameEN : fruit.nameFR}</h1>
                {roleUser[0] === "ADMIN" && 
                    <>
                        <p className="st-iconEdit" onClick={handleClick}></p>
                        <p className="st-iconDelete ml10" onClick={handleDelete}></p>
                    </>
                }
            </div>
            <div className="d-flex justify-content-center st-blocFruitDetail">
                {fruit.fileUrl && <img src={fruit.fileUrl} alt={"image " + fruit.nameFR}/>}
                <div className="ml50 st-describeFruit">
                    <p>{locale === "en" ? fruit.descriptionEN : fruit.descriptionFR}</p>
                    <div className="mt50 d-flex st-showMonths">
                        <p className="fw700 fs16">Mois de consommation:</p> 
                        <p className="fs14 ml10 fw600 st-months">{months.map((month, i, array) => <span key={i} className="italic">{month}{i !== (array.length-1) ? ", " : ""}</span>)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default FruitPage;