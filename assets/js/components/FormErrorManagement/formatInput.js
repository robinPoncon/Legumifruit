/*
Params:
    event: type = event

Return: 
    formatValue: type = string / formatted value input
*/
const formatInput = (event) => {
    let value = event.currentTarget.value;
    let typeVerif = event.currentTarget.getAttribute("data-format");
    let correctValue = value.slice(0, -1);
    let lastCharacter = value.slice(-1);
    let formatValue = value;

    if (typeVerif === "price") {
        const isNotValidNumber = /^\d+([,.]\d+)?(?=$| )/.test(value);
        const blockMultipleDigitsAfterComma = /^\d+,\d{3,}$/.test(value);
        const blockMultipleDigitsAfterPoint = /^\d+\.\d{3,}$/.test(value);

        if (!isNotValidNumber) {
            let isCommaExist = (correctValue.indexOf(",") > -1) ? true : false;
            let isPointExist = (correctValue.indexOf(".") > -1) ? true : false;
            if ((lastCharacter === "," || lastCharacter === ".") && (!isCommaExist && !isPointExist)) {
                formatValue = value;
            }
            else {
                formatValue = correctValue;
            }
        }
        else if (blockMultipleDigitsAfterComma || blockMultipleDigitsAfterPoint) {
            formatValue = correctValue;
        }
        else {
            formatValue = value;
        }
    }
    return formatValue;
}
 
export default formatInput;