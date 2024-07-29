export const compactString = (inputStr: string, startString: number, endString: number) => {
    const strLength = inputStr.length;

    if (startString >= strLength) {
        return inputStr;
    }

    let compacted = inputStr.substring(0, startString) + "..." + inputStr.substring(strLength - endString, strLength);

    return compacted;
};