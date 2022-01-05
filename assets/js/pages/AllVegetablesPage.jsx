import React from 'react';
import { useTranslation } from 'react-i18next';

const AllVegetablesPage = (props) => {
    const {t} = useTranslation();

    return ( <h1>{t("vegetablesPage.allVegetables")}</h1> );
}
 
export default AllVegetablesPage;