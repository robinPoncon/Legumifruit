import React, {useState} from 'react';
import axios from "axios";

const LoginPage = (props) => {

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
        console.log(credentials);

        try {
            await axios.post("https://localhost:8000/api/login_check", credentials)
                .then(response => console.log(response));
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