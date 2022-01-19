import React, {useContext, useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import LocaleContext from '../../contexts/LocaleContext';
import fruitRequest from '../../services/fruitRequest';
import userRequest from '../../services/userRequest';

const AllFruitsPage = ({history}) => {
    const {t} = useTranslation();
    const {locale} = useContext(LocaleContext);
    const roleUser = useState(userRequest.getRoleUser());
    const [fruitsData, setFruitsData] = useState([]);

    useEffect(() => {
        fruitRequest.getAllFruits()
        .then(data => setFruitsData(data))
        .catch(error => console.log(error));
    }, []);

    const handleClick = (id) => {
        history.push("/fruits/" + id);
    }

    const handleAddFruit = () => {
        history.push("/fruits/ajouter");
    }

    return ( 
        <>
            <div className="d-flex justify-content-between st-blocTitleFruit">
                <h1>{t("fruitsPage.allFruits")}</h1>
                {roleUser[0] === "ADMIN" && 
                    <div className="d-flex st-blocAddFruit cpointer" onClick={handleAddFruit}> 
                        <p className="st-addFruit mtb-auto mr10"></p>
                        <p className="mtb-auto">{t("fruitsPage.add-fruit")}</p>
                    </div>
                }
            </div>

            <div className="d-flex flex-wrap mt50 justify-content-between st-parentBlocShowFruit">
                {fruitsData.sort((a, b) => (locale === "en" ? (a.nameEN > b.nameEN ? 1 : -1) : (a.nameFR > b.nameFR ? 1 : -1))).map(fruit => (
                    <div key={fruit.id} className="st-blocShowFruit mb40" onClick={() => handleClick(fruit.id)}>
                        <h2 className="bold mb10" key={fruit.id}>{locale === "en" ? fruit.nameEN : fruit.nameFR}</h2>
                        {fruit.fileUrl && <img src={fruit.fileUrl} alt={"image " + fruit.nameFR} width="200px" height="150px"/>}
                        <p className="mt10 mb0">{t("various.read-more")}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
 
export default AllFruitsPage;