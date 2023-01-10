export const generateString = (index) => `string-${index}`;
export const generateInteger = (index) => index + 1;
export const generateDouble = (index) => Math.round(100 / (index + 1));
export const generateNumber = (index) => index % 2 === 0 ? generateInteger(index) : generateDouble(index);
export const generateBuffer = (index) => {
    const length = index % 10;
    const data = [];
    for (let i = 0; i < length; i++) {
        data.push((index + i) % 256);
    }
    return new Uint8Array(data);
};
export const generateAll = (index) => {
    switch (index % 3) {
        case 0:
            return generateString(index);
        case 1:
            return generateInteger(index);
        default:
            return generateDouble(index);
    }
};
