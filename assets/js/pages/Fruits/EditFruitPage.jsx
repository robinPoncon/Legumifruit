import React, {useContext, useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import checkAllInputs from '../../components/FormErrorManagement/checkAllInputs';
import ShowingError from '../../components/FormErrorManagement/ShowingError';
import verificationsFront from '../../components/FormErrorManagement/verificationsFront';
import LocaleContext from '../../contexts/LocaleContext';
import fruitRequest from '../../services/fruitRequest';

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
                descriptionFR: data.descriptionFR
            });
            setUrlImg(data.fileUrl);
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

    const handleChangeFile = (event) => {
        let fileUpload = event.currentTarget.files[0];
        setFileToSent(fileUpload);
        console.log(fileUpload);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsSubmited(true);
        
        try {
            await fruitRequest.updateFruit(id, allInputs);
            await fruitRequest.updateImgFruit(id, fileToSent);
            history.push("/fruits/");
        } catch (error) {
            setIsSubmited(false);
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
                
                <div className="form-group mt30">
                    <button className={"st-actionBtn2 " + (disabledBtn ? "disabled" : "")}>{t("nav.update")}</button>
                </div>
            </form>
        </div> 
    );
}
 
export default EditFruitPage;