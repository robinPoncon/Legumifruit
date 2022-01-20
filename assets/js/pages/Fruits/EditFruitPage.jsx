import React, {useContext, useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import checkAllInputs from '../../components/FormErrorManagement/checkAllInputs';
import ShowingError from '../../components/FormErrorManagement/ShowingError';
import verificationsFront from '../../components/FormErrorManagement/verificationsFront';
import LocaleContext from '../../contexts/LocaleContext';
import calendarRequest from '../../services/calendarRequest';
import fruitRequest from '../../services/fruitRequest';
import localeRequest from '../../services/localeRequest';

const EditFruitPage = ({history}) => {

    const [nameFruit, setNameFruit] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [isSubmited, setIsSubmited] = useState(false);
    const { t } = useTranslation();
    const {id} = useParams();
    const {locale} = useContext(LocaleContext);
    const [urlImg, setUrlImg] = useState(null);
    const [fileToSent, setFileToSent] = useState(null);

    const [verifInputs, setVerifInputs] = useState({});
    const [allMonths, setAllMonths] = useState([]);
    const [monthsExist, setMonthsExist] = useState([]);

    // if (locale === "en") {
    //     setVerifInputs({
    //         nameEN: "",
    //         descriptionEN: ""
    //     });
    // }
    // else {
    //     setVerifInputs({
    //         nameFR: "",
    //         descriptionFR: ""
    //     });
    // }

    const [allInputs, setAllInputs] = useState({
        nameEN: "",
        descriptionEN: "",
        nameFR: "",
        descriptionFR: "",
        calendar: []
    });

    useEffect(() => {
        if (isSubmited) {
            setDisabledBtn(true);
        }
        else {
            let isDisabledBtn = checkAllInputs(verifInputs);
            setDisabledBtn(isDisabledBtn);
        }   
    }, [verifInputs, isSubmited, disabledBtn]);

    useEffect(() => {
        fruitRequest.getFruit(id)
        .then(response => {
            let data = response.data;
            setAllInputs({...allInputs, 
                nameEN: data.nameEN,
                descriptionEN: data.descriptionEN,
                nameFR: data.nameFR,
                descriptionFR: data.descriptionFR,
                calendar: data.calendar
            });
            setUrlImg(data.fileUrl);
            if (locale === "en") {
                setNameFruit(response.data.nameEN);
            }
            else {
                setNameFruit(response.data.nameFR);
            }
            let arrayCalendar = data.calendar;
            let newCalendar = [];
            console.log(arrayCalendar);
            arrayCalendar.forEach(month => {
                newCalendar.push(Number(month.match(/\d+/)[0]));
            })
            setMonthsExist(newCalendar);

            calendarRequest.getAllCalendars()
            .then(response => {
                setAllMonths(response.data);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));

    }, []);

    const handleChange = (event) => {
        let nameInput = event.currentTarget.name;
        let value = event.currentTarget.value;

        setAllInputs({...allInputs, [nameInput]: value});

        let returnVerif = verificationsFront(event, t);
        setErrorMessage(returnVerif[0]);

        if (returnVerif[0] === null && value !== "") {
            setVerifInputs({...verifInputs, [nameInput]: value});
        }
        else {
            setVerifInputs({...verifInputs, [nameInput]: ""});
        }
    }

    const handleChangeFile = (event) => {
        let fileUpload = event.currentTarget.files[0];
        setFileToSent(fileUpload);
        console.log(fileUpload);
    }

    const onChangeCheckbox = (event) => {
        let isChecked = event.currentTarget.checked;
        let id = event.currentTarget.id;
        if (isChecked) {
            let arrayMonth = allInputs.calendar;
            arrayMonth.push("/api/calendars/" + id);
            setAllInputs({...allInputs, calendar: arrayMonth});
        }
        else {
            let newArray = allInputs.calendar;
            let index = newArray.indexOf("/api/calendars/" + id);
            if (index !== -1) {
                newArray.splice(index, 1);
            }
            setAllInputs({...allInputs, calendar: newArray});
        }
        console.log(allInputs.calendar);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsSubmited(true);
        console.log("test");

        let targetLang = locale === "en" ? "FR" : "EN"; 
        
        try {
            //await localeRequest.translateDeepL(targetLang, allInputs.nameFR);
            await fruitRequest.updateFruit(id, allInputs);
            await fruitRequest.updateImgFruit(id, fileToSent);
            history.push("/fruits/");
        } catch (error) {
            let errorMessage = error.response.data.title;
            if (errorMessage === "An error occurred") {
                errorMessage = t("error-message.fruit-name");
            }
            setErrorMessage(errorMessage);
            setIsSubmited(false);
            window.scrollTo(0, 0);
        }
    }

    return ( 
        <div className="st-fruitsEdit">

            <h1>{t("nav.update") + " " + t("fruitsPage.the-fruit") + " - " + nameFruit}</h1>

            {errorMessage && <ShowingError message={errorMessage}/>}

            <form onSubmit={handleSubmit}>
                {locale === "en" ? 
                <>
                    <div className={"form-group mb20 " + (!errorMessage ? "mt20" : "")}>
                        <label className="required mb10">{t("fruitsPage.fruit-name")}</label>
                        <input 
                            type="text" 
                            value={allInputs.nameEN}
                            placeholder="pineapple" 
                            name="nameEN" 
                            className="form-control"
                            onChange={handleChange}
                            data-verif="verif-empty"
                        />
                    </div>

                    <div className={"form-group mb20"}>
                        <label className="required mb10">{t("fruitsPage.fruit-description")}</label>
                        <textarea 
                            value={allInputs.descriptionEN}
                            placeholder="The pineapple is a species of xerophytic plant, native to South America..." 
                            name="descriptionEN" 
                            className="form-control"
                            onChange={handleChange}
                            data-verif="verif-empty"
                        />
                    </div>
                </>
                :
                <>
                    <div className={"form-group mb20 " + (!errorMessage ? "mt20" : "")}>
                        <label className="required mb10">{t("fruitsPage.fruit-name")}</label>
                        <input 
                            type="text" 
                            value={allInputs.nameFR}
                            placeholder="Ananas" 
                            name="nameFR" 
                            className="form-control"
                            onChange={handleChange}
                            data-verif="verif-empty"
                        />
                    </div>

                    <div className={"form-group mb20"}>
                        <label className="required mb10">{t("fruitsPage.fruit-description")}</label>
                        <textarea 
                            value={allInputs.descriptionFR}
                            placeholder="L'ananas est une espèce de plantes xérophytes, originaire d'Amérique du Sud..." 
                            name="descriptionFR" 
                            className="form-control"
                            onChange={handleChange}
                            data-verif="verif-empty"
                        />
                    </div>
                </>
                }

                <div className={"form-group mb20 " + (!errorMessage ? "mt20" : "")}>
                    <label className="required mb10" htmlFor="fileFruit">{t("fruitsPage.fruit-image")}</label>
                    <p>{urlImg && <img src={urlImg} alt={t("fruitsPage.fruit-image")} width="250px" height="200px"></img>}</p>
                    <input 
                        type="file" 
                        value={allInputs.file}
                        name="file" 
                        className="form-control st-fileInput"
                        onChange={handleChangeFile}
                        accept="image/jpeg, image/png"
                        id="fileFruit"
                    />
                </div>

                {allMonths.map(month => (
                    <div key={month.id} className="d-flex">
                        <input 
                            id={month.id} 
                            type="checkbox" 
                            className="cpointer"
                            onChange={onChangeCheckbox} 
                            defaultChecked={
                                monthsExist.indexOf(month.id) === -1 ? false : true
                            }
                        />
                        <label className="ml20 cpointer" htmlFor={month.id}>{locale === "en" ? month.nameEN : month.nameFR}</label>
                    </div>
                ))}
                
                <div className="form-group mt30">
                    <button className={"st-actionBtn2 " + (disabledBtn ? "disabled" : "")}>{t("nav.update")}</button>
                </div>
            </form>
        </div> 
    );
}
 
export default EditFruitPage;