import React, { useState } from 'react';
import "../../../css/components/FormErrorManagement/ShowingError.scss";

/*
Props:
    message: type = string / value erreur message
    width: type = string / width error message bloc
 */

const ShowingError = (props) => {

    const [isVisible, setIsVisible] = useState(true);
    
    const hideComponent = () => {
        setIsVisible(false);
    }

    return ( 
        <>
            { isVisible ?
            <div className="fs12 st-blocFormError mt10" style={props.width ? {width : props.width} : null }>
                <p>{props.message}</p>
                <p onClick={hideComponent}>
                    <img src="/assets/icons/icon_cross_darkGreen.svg" alt="icon close"/>
                </p>
            </div> : null }
        </>
    );
}
 
export default ShowingError;