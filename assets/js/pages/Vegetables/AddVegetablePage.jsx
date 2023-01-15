import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import checkAllInputs from '../../components/FormErrorManagement/checkAllInputs';
import ShowingError from '../../components/FormErrorManagement/ShowingError';
import verificationsFront from '../../components/FormErrorManagement/verificationsFront';
import LocaleContext from '../../contexts/LocaleContext';
import calendarRequest from '../../services/calendarRequest';
import vegetableRequest from '../../services/vegetableRequest';

const AddVegetablePage = ({history}) => {

    const {t} = useTranslation();
    const [errorMessage, setErrorMessage] = useState(null);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [isSubmited, setIsSubmited] = useState(false);
    const {locale} = useContext(LocaleContext);
    const [verifInputs, setVerifInputs] = useState({});
    const [allMonths, setAllMonths] = useState([]);
    const [fileToSent, setFileToSent] = useState(null);

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
        calendarRequest.getAllCalendars()
        .then(response => {
            setAllMonths(response.data);
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
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsSubmited(true);

        let targetLang = locale === "en" ? "FR" : "EN"; 
        
        try {
            //await localeRequest.translateDeepL(targetLang, allInputs.nameFR);
            let idVegetable = await vegetableRequest.addVegetable(allInputs);
            if (fileToSent) {
                await vegetableRequest.updateImgVegetable(idVegetable, fileToSent);
            }
            history.push("/legumes/");
        } catch (error) {
            let errorMessage = error.response.data.title;
            if (errorMessage === "An error occurred") {
                errorMessage = t("error-message.vegetable-name");
            }
            setErrorMessage(errorMessage);
            setIsSubmited(false);
            window.scrollTo(0, 0);
        }
    }

    return ( 
        <div>
            <h1>{t("vegetablesPage.add-vegetable")}</h1>

            {errorMessage && <ShowingError message={errorMessage}/>}

            <form onSubmit={handleSubmit}>
                {locale === "en" ? 
                <>
                    <div className={"form-group mb20 " + (!errorMessage ? "mt20" : "")}>
                        <label className="required mb10">{t("vegetablesPage.vegetable-name")}</label>
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
                        <label className="required mb10">{t("vegetablesPage.vegetable-description")}</label>
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
                        <label className="required mb10">{t("vegetablesPage.vegetable-name")}</label>
                        <input 
                            type="text" 
                            value={allInputs.nameFR}
                            placeholder="Courgette" 
                            name="nameFR" 
                            className="form-control"
                            onChange={handleChange}
                            data-verif="verif-empty"
                        />
                    </div>

                    <div className={"form-group mb20"}>
                        <label className="required mb10">{t("vegetablesPage.vegetable-description")}</label>
                        <textarea 
                            value={allInputs.descriptionFR}
                            placeholder="La courgette est une plante herbacée de la famille des Cucurbitaceae, c'est aussi le fruit comestible de la plante du même nom." 
                            name="descriptionFR" 
                            className="form-control"
                            onChange={handleChange}
                            data-verif="verif-empty"
                        />
                    </div>
                </>
                }

                <div className={"form-group mb20 " + (!errorMessage ? "mt20" : "")}>
                    <label className="required mb10" htmlFor="fileVegetable">{t("vegetablesPage.vegetable-image")}</label>
                    <input 
                        type="file" 
                        value={allInputs.file}
                        name="file" 
                        className="form-control st-fileInput"
                        onChange={handleChangeFile}
                        accept="image/jpeg, image/png"
                        id="fileVegetable"
                    />
                </div>

                {allMonths.map(month => (
                    <div key={month.id} className="d-flex">
                        <input 
                            id={month.id} 
                            type="checkbox" 
                            className="cpointer"
                            onChange={onChangeCheckbox} 
                            defaultChecked={false}
                        />
                        <label className="ml20 cpointer" htmlFor={month.id}>{locale === "en" ? month.nameEN : month.nameFR}</label>
                    </div>
                ))}
                
                <div className="form-group mt30">
                    <button className={"st-actionBtn2 " + (disabledBtn ? "disabled" : "")}>{t("nav.add")}</button>
                </div>
            </form>
        </div> 
    );
}
 
export default AddVegetablePage;