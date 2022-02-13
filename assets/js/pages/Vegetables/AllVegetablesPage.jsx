import React, {useContext, useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import LocaleContext from '../../contexts/LocaleContext';
import userRequest from '../../services/userRequest';
import vegetableRequest from '../../services/vegetableRequest';

const AllVegetablesPage = ({history}) => {
    const {t} = useTranslation();
    const {locale} = useContext(LocaleContext);
    const roleUser = useState(userRequest.getRoleUser());
    const [vegetablesData, setVegetablesData] = useState([]);

    useEffect(() => {
        vegetableRequest.getAllVegetables()
        .then(data => setVegetablesData(data))
        .catch(error => console.log(error));
    }, []);

    const handleClick = (id) => {
        history.push("/legumes/" + id);
    }

    const handleAddVegetable = () => {
        history.push("/legumes/ajouter");
    }

    return (
        <>
            <div className="d-flex justify-content-between st-blocTitleFruit">
                <h1>{t("vegetablesPage.allVegetables")}</h1>
                {roleUser[0] === "ADMIN" && 
                    <div className="d-flex st-blocAddFruit cpointer" onClick={handleAddVegetable}> 
                        <p className="st-addFruit mtb-auto mr10"></p>
                        <p className="mtb-auto">{t("fruitsPage.add-fruit")}</p>
                    </div>
                }
            </div>

            <div className="d-flex flex-wrap mt50 justify-content-between st-parentBlocShowFruit">
                {vegetablesData.sort((a, b) => (locale === "en" ? (a.nameEN > b.nameEN ? 1 : -1) : (a.nameFR > b.nameFR ? 1 : -1))).map(vegetable => (
                    <div key={vegetable.id} className="st-blocShowFruit mb40" onClick={() => handleClick(vegetable.id)}>
                        <h2 className="bold mb10" key={vegetable.id}>{locale === "en" ? vegetable.nameEN : vegetable.nameFR}</h2>
                        {vegetable.fileUrl && <img src={vegetable.fileUrl} alt={"image " + vegetable.nameFR} width="200px" height="150px"/>}
                        <p className="mt10 mb0">{t("various.read-more")}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
 
export default AllVegetablesPage;