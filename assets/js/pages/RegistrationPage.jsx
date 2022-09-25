import React, {useState, useContext, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import checkAllInputs from '../components/FormErrorManagement/checkAllInputs';
import ShowingError from '../components/FormErrorManagement/ShowingError';
import verificationsFront from '../components/FormErrorManagement/verificationsFront';
import LocaleContext from '../contexts/LocaleContext';
import ThemeContext from '../contexts/ThemeContext';
import localeRequest from '../services/localeRequest';
import themeColorRequest from '../services/themeColorRequest';
import userRequest from '../services/userRequest';

const RegistrationPage = ({history}) => {

    const {locale} = useContext(LocaleContext);
    const {theme} = useContext(ThemeContext);
    const [errorMessage, setErrorMessage] = useState(null);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [isSubmited, setIsSubmited] = useState(false);
    const [verifInputs, setVerifInputs] = useState({
        email: "",
        password: "",
        pseudonyme: ""
    });
    const [dataToSend, setDataToSend] = useState({
        email: "",
        password: "",
        pseudonyme: "",
        firstName: "",
        lastName: "",
        locale: locale,
        colorTheme: theme
    });

    const {t} = useTranslation();

    useEffect(() => {
        if (isSubmited) {
            setDisabledBtn(true);
        }
        else {
            let isDisabledBtn = checkAllInputs(verifInputs);
            setDisabledBtn(isDisabledBtn);
        }   
        setDataToSend({...dataToSend, locale: locale, colorTheme: theme});
    }, [verifInputs, dataToSend, isSubmited]);

    const handleChange = (event) => {
        let nameInput = event.currentTarget.name;
        let value = event.currentTarget.value;
        setDataToSend({...dataToSend, [nameInput]: value});

        let returnVerif = verificationsFront(event, t);
        setErrorMessage(returnVerif[0]);

        if (returnVerif[0] === null && value !== "") {
            setVerifInputs({...verifInputs, [nameInput]: value});
        }
        else {
            setVerifInputs({...verifInputs, [nameInput]: ""});
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsSubmited(true);
        
        try {
            await userRequest.create(dataToSend);
            history.replace("/login");
        }
        catch(error) {
            let errorMessage;
            let errorResponse = error.response.data.violations[0].message;
            if (errorResponse === "The email address you entered is already in use.") {
                errorMessage = t("error-message.already-email");
            }
            else if (errorResponse === "The pseudonyme you entered already exists.") {
                errorMessage = t("error-message.already-pseudo");
            }
            setErrorMessage(errorMessage);
            setIsSubmited(false);
        }
    }

    return ( 
        <>
        <h1>{t("nav.registration")}</h1>

        {errorMessage && <ShowingError message={errorMessage}/>}

        <form onSubmit={handleSubmit}>
            <div className={"form-group mb10 " + (!errorMessage ? "mt20" : "")}>
                <label className="required">{t("loginPage.mail-address")}</label>
                <input 
                    type="email" 
                    value={dataToSend.username}
                    placeholder="test@gmail.com" 
                    name="email" 
                    className="form-control"
                    onChange={handleChange}
                    data-verif="verif-email"
                />
            </div>
            <div className="form-group mb10">
                <label className="required">{t("loginPage.password")}</label>
                <input 
                    type="password" 
                    value={dataToSend.password}
                    placeholder={t("loginPage.password")} 
                    name="password" 
                    className="form-control"
                    onChange={handleChange}
                    data-verif="verif-empty"
                />
            </div>
            <div className="form-group mb10">
                <label className="required">Pseudonyme</label>
                <input 
                    type="text" 
                    value={dataToSend.pseudonyme}
                    placeholder="artur33" 
                    name="pseudonyme"
                    className="form-control"
                    onChange={handleChange}
                    data-verif="verif-empty"
                />
            </div>
            <div className="form-group mb10">
                <label>{t("registrationPage.first-name")}</label>
                <input 
                    type="text" 
                    value={dataToSend.firstName}
                    placeholder="Perceval" 
                    name="firstName" 
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mb10">
                <label>{t("registrationPage.last-name")}</label>
                <input 
                    type="password" 
                    value={dataToSend.lastName}
                    placeholder="De Galles"
                    name="lastName" 
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mt30">
                <button className={"st-actionBtn2 " + (disabledBtn ? "disabled" : "")}>{t("nav.registration")}</button>
            </div>
        </form>
        </>
    );
}
 
export default RegistrationPage;