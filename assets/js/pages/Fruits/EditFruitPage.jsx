import React, {useContext, useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import checkAllInputs from '../../components/FormErrorManagement/checkAllInputs';
import ShowingError from '../../components/FormErrorManagement/ShowingError';
import verificationsFront from '../../components/FormErrorManagement/verificationsFront';
import LocaleContext from '../../contexts/LocaleContext';
import fruitRequest from '../../services/fruitRequest';

const EditFruitPage = (props) => {

    const [nameFruit, setNameFruit] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [isSubmited, setIsSubmited] = useState(false);
    const { t } = useTranslation();
    const {id} = useParams();
    const {locale} = useContext(LocaleContext);

    const [verifInputs, setVerifInputs] = useState({});

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
        file: ""
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
                nameEn: data.nameEN,
                descriptionEN: data.descriptionEN,
                nameFR: data.descriptionFR,
                descriptionFR: data.descriptionFR
            });
            if (locale === "en") {
                setNameFruit(response.data.nameEN);
            }
            else {
                setNameFruit(response.data.nameFR);
            }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setAllInputs({...allInputs, nameEN: "test"});
        console.log(allInputs);
    }

    return ( 
        <>

            <h1>{t("nav.update") + " " + t("fruitsPage.the-fruit") + " - " + nameFruit}</h1>

            {errorMessage && <ShowingError message={errorMessage}/>}

            <form onSubmit={handleSubmit}>
                {locale === "en" ? 
                <>
                    <div className={"form-group mb10 " + (!errorMessage ? "mt20" : "")}>
                        <label className="required">{t("fruitsPage.fruit-name")}</label>
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

                    <div className={"form-group mb10"}>
                        <label className="required">{t("fruitsPage.fruit-description")}</label>
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
                    <div className={"form-group mb10 " + (!errorMessage ? "mt20" : "")}>
                        <label className="required">{t("fruitsPage.fruit-name")}</label>
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

                    <div className={"form-group mb10"}>
                        <label className="required">{t("fruitsPage.fruit-description")}</label>
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

                <div className={"form-group mb10 " + (!errorMessage ? "mt20" : "")}>
                    <label className="required">{t("fruitsPage.fruit-image")}</label>
                    <input 
                        type="file" 
                        value={allInputs.file}
                        name="file" 
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                
                <div className="form-group mt30">
                    <button className={"st-actionBtn2 " + (disabledBtn ? "disabled" : "")}>{t("nav.update")}</button>
                </div>
            </form>
        </> 
    );
}
 
export default EditFruitPage;