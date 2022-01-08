import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import fruitRequest from '../../services/fruitRequest';

const AllFruitsPage = ({history}) => {
    const {t} = useTranslation();
    
    const [fruitsData, setFruitsData] = useState([]);

    useEffect(() => {
        fruitRequest.getAllFruits()
        .then(data => setFruitsData(data))
        .catch(error => console.log(error));
    }, []);

    const handleClick = (id) => {
        history.push("/fruits/" + id);
    }

    return ( 
        <>
            <h1>{t("fruitsPage.allFruits")}</h1>

            {fruitsData.map(fruit => (
                <p onClick={() => handleClick(fruit.id)} key={fruit.id}>{fruit.nameEN}</p>
            ))}
        </>
    );
}
 
export default AllFruitsPage;