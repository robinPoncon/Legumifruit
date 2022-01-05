import React, {useContext, useState} from 'react';
import authAPI from "../services/authAPI";
import authContext from "../contexts/AuthContext";
import themeContext from "../contexts/ThemeContext";
import localeContext from "../contexts/LocaleContext";
import themeColorRequest from '../services/themeColorRequest';
import ShowingError from '../components/FormErrorManagement/ShowingError';
import localeRequest from '../services/localeRequest';

const LoginPage = ({history}) => {

    const {setIsAuthenticated} = useContext(authContext);
    const {setTheme} = useContext(themeContext);
    const {setLocale} = useContext(localeContext);
    const [errorMessage, setErrorMessage] = useState(null);
    const [disabledBtn, setDisabledBtn] = useState(true);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    function handleChange(event) {
        let nameInput = event.currentTarget.name;
        let value = event.currentTarget.value;

        setCredentials({...credentials, [nameInput]: value});

        // let returnVerif = verificationsFront(event, t);
        // setErrorMessage(returnVerif[0]);
        // if (returnVerif[0] === null && value !== "") {
        //     setCredentials({...credentials, [nameInput]: value});
        // }
        // else {
        //     setCredentials({...credentials, [nameInput]: null});
        // }
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            await authAPI.login(credentials);
            const theme = await themeColorRequest.getThemeUser();
            const locale = await localeRequest.getLocaleUser();
            setTheme(theme);
            setLocale(locale);
            themeColorRequest.setAppTheme(theme);
            localeRequest.setAppLocale(locale);
            setIsAuthenticated(true);
            history.replace("/");
        }
        catch(error) {
            console.log(error.response);
        }
    }

    return ( 
        <>
            <h1>Connexion</h1>
            {errorMessage && <ShowingError message={errorMessage}/>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input 
                        type="email" 
                        value={credentials.username}
                        placeholder="Adresse email de connexion" 
                        name="username" 
                        id="username" 
                        className="form-control"
                        onChange={handleChange}
                        data-verif="verif-email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                        type="password" 
                        value={credentials.password}
                        placeholder="Mot de passe" 
                        name="password" 
                        id="password" 
                        className="form-control"
                        onChange={handleChange}
                        data-verif="verif-empty"
                    />
                </div>
                <div className="form-group">
                    <button>Connexion</button>
                </div>
            </form>
        </>
    );
}
 
export default LoginPage;