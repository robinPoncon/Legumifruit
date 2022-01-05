import React from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = (props) => {
    const { t } = useTranslation();
    
    return ( 
        <article>
            <h1>{t("homePage.home")}</h1> 
        </article>
    );
}
 
export default HomePage;