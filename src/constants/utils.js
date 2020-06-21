export const _substringMaxValue = (stringInput, value, index) => {
    if (stringInput?.length > index) {
        let indexOfValue = stringInput.indexOf(value, index)
        let res = `${stringInput.substring(0, indexOfValue)}...`
        return res
    }
    return stringInput
}