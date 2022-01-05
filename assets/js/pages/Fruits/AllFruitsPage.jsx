import React from 'react';
import { useTranslation } from 'react-i18next';

const AllFruitsPage = (props) => {
    const {t} = useTranslation();

    return ( <h1>{t("fruitsPage.allFruits")}</h1> );
}
 
export default AllFruitsPage;