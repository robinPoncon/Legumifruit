import React from 'react';

const Button = (props) => {
    return ( <button className={props.classButton}>{props.content}</button> );
}
 
export default Button;