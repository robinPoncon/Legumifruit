import React from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = (props) => {
    const { t } = useTranslation();
    
    return ( 
        <article>
            <h1>Page d'accueil</h1> 
            <p>{t("home.hello")}</p>
        </article>
    );
}
 
export default HomePage;