// That component recuperates an event and the translate variable function
// If the input has a data-verif attribute, he checks the value with the verifications (regex)
// If the value is correct, the component returns a message with null value
// Otherwise, he returns the message with a error message

// List of existing verifs: verif-empty, verif-email, verif-atLeastOneNumber, verif-siret, verif-cifnif, verif-cardNumber, verif-iban

/*
Params: 
    event: type = event
    translate: type = function / translate text
Return:
    Array:
        message: type = string / error message value
        maxLength: type = number / maxLength value
*/

const verificationsFront = (event, translate, valueEditor = false) => {
    let message = null;
    let maxLength = null;

    if (event) {
        let typeVerif = event.currentTarget.getAttribute("data-verif");
        let isPriceFormat = event.currentTarget.getAttribute("data-format") === "price";
        let value = event.currentTarget.value;
        let style = event.currentTarget.style;

        if (typeVerif === "verif-empty") {
            if (value === "") {
                style.border = "1px solid #e61222";
                message = translate("error-message.verif-empty");
            }
            else if (isPriceFormat) {
                if (isNaN(value.charAt(0))) {
                    style.border = "1px solid #e61222";
                    message = translate("error-message.verif-empty");
                }
                else {
                    style.border = "1px solid #D2D4D4";
                    message = null;
                }
            }
            else {
                style.border = "1px solid #D2D4D4";
                message = null;
            }
        }
        else if (typeVerif === "verif-email") {
            if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
                style.border = "1px solid #e61222";
                message = translate("error-message.verif-email");
            }
            else {
                style.border = "1px solid #D2D4D4";
                message = null;
            }
        }
        else if (typeVerif === "verif-atLeastOneNumber") {
            if (!/\d/g.test(value)) {
                style.border = "1px solid #e61222";
                message = translate("error-message.verif-atLeastOneNumber");
            }
            else {
                style.border = "1px solid #D2D4D4";
                message = null;
            }
        }
        else if (typeVerif === "verif-siret") {
            maxLength = 14;
            if (!isValidSiret(value)) {
                style.border = "1px solid #e61222";
                message = translate("error-message.verif-siret");
            }
            else {
                style.border = "1px solid #D2D4D4";
                message = null;
            }
        }
        else if (typeVerif === "verif-cifnif") {
            maxLength = 9;
            if (!isValidCifNif(value)) {
                style.border = "1px solid #e61222";
                message = translate("error-message.verif-cifnif");
            }
            else {
                style.border = "1px solid #D2D4D4";
                message = null;
            }
        }
        else if (typeVerif === "verif-cardNumber") {
            maxLength = 19;
            if (!isValidCreditCardNumber(value)) {
                style.border = "1px solid #e61222";
                message = translate("error-message.verif-cardNumber");
            }
            else {
                style.border = "1px solid #D2D4D4";
                message = null;
            }
        }
        else if (typeVerif === "verif-iban") {
            if (!/^[a-zA-Z]{2}\d{2}\s*(\w{4}\s*){2,7}\w{1,4}\s*$/.test(value)) {
                style.border = "1px solid #e61222";
                message = translate("error-message.verif-iban");
            }
            else {
                style.border = "1px solid #D2D4D4";
                message = null;
            }
        }
        else {
            style.border = "1px solid #D2D4D4";
            message = null;
        }
    }
    else {
        if (valueEditor === "<p><br></p>") {
            message = translate("error-message.verif-empty");
        }
        else {
            message = null;
        }
    }
    
    return [message, maxLength];
}

// Verifications methods with algorythm
const isValidSiret = (siret) => {
    let siretFormat = siret.replace(/\s/g, '');
    if ((siretFormat.length !== 14) || (isNaN(Number(siretFormat)))) {
        return false;
    }
    let sum = 0;
    let tmp;
    for (let i = 0; i < 14; i++) {
        if ((i % 2) === 0) {
            tmp = Number(siretFormat[i]) * 2;
            tmp = (tmp > 9 ? tmp - 9 : tmp);
        }
        else {
            tmp = Number(siretFormat[i]);
        }
        sum += tmp;
    }
    if ((sum % 10) === 0) {
        return true;
    }
    return false;
}

const isValidCifNif = (cifNif) => {
    let value = cifNif.replace(/\s/g, '');
    let DNI_REGEX = /^(\d{8})([A-Z])$/;
    let CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
    let NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/;
    if (DNI_REGEX.test(value) || CIF_REGEX.test(value) || NIE_REGEX.test(value)) {
        return true;
    }
    else {
        return false;
    }
}

const isValidCreditCardNumber = (value) => {
    return /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/.test(value);
}
 
export default verificationsFront;