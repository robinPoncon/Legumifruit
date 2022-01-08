import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import fruitRequest from '../../services/fruitRequest';

const FruitPage = (props) => {
    
    const {id} = useParams();
    const [fruit, setFruit] = useState("");

    useEffect(() => {
        fruitRequest.getFruit(id)
        .then(response => setFruit(response.data))
        .catch(error => console.log(error));
    }, []);

    console.log(fruit);

    return ( 
        <h1>{fruit.nameEN}</h1>
    );
}
 
export default FruitPage;