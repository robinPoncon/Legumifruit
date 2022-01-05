// That component recuperates a state
// He iterates on each elements. 
// If a element is null he returns true, otherwise he returns false

/*
Params:
    state: type = state / object of inputs
    
Return:
    type = boolean
*/

const checkAllInputs = (state) => {
    let isEmptyInput = false;
    Object.keys(state).map((keyName) => {
        if (state[keyName] === null || state[keyName] === "") {
            isEmptyInput = true;
        }
        return isEmptyInput;
    });
    return isEmptyInput;
}

export default checkAllInputs;