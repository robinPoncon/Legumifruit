import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
    const {t} = useTranslation();

    return ( <h1>{t("notFoundPage.error404")}</h1> );
}
 
export default NotFoundPage;