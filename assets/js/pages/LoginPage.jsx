import React, {useContext, useState} from 'react';
import authAPI from "../services/authAPI";
import authContext from "../contexts/AuthContext";

const LoginPage = ({history}) => {

    const {setIsAuthenticated} = useContext(authContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            await authAPI.login(credentials);
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