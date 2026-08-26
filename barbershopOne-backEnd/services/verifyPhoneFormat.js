function verifyPhoneFormatMonteNegro(phoneNumber) {
    let valid = false;
    let phoneNumberArray = phoneNumber.split("");
    let filteredNumber = "";

    function isAllDigits(str) {
        for (let i = 0; i < str.length; i ++) {
            if (str[i] < "0" || str[i] > "9") {
                return false;
            }
        }
        return true;
    }

    for(let i = 0; i < phoneNumberArray.length; i ++) {
        if(phoneNumberArray[i] === "(" ||
            phoneNumberArray[i] === ")" || phoneNumberArray[i] === "-" || phoneNumberArray[i] === " ")
        {continue}
        filteredNumber = filteredNumber + phoneNumberArray[i];
    }

    //+
    if (filteredNumber.startsWith("+382")) {
        if (filteredNumber.length === 12) {
            const justNumberString = filteredNumber.slice(1);
            if (isAllDigits(justNumberString)) { return valid = true; }
        }
    }
    //00
    if (filteredNumber.startsWith("00382")) {
        if (filteredNumber.length === 13) {
            if (isAllDigits(filteredNumber)) { return valid = true; }
        }
    }

    //0
    if (filteredNumber.startsWith("0")) {
        if (filteredNumber.length === 9) {
            if (isAllDigits(filteredNumber)) { return valid = true; }
        }
    }
    
    //false
    return valid;
}

module.exports = { verifyPhoneFormatMonteNegro };