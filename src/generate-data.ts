export const generateString = (index: number) => `string-${index}`;
export const generateInteger = (index: number) => index + 1;
export const generateDouble = (index: number) => Math.round(100 / (index + 1));

export const generateNumber = (index: number) =>
	index % 2 === 0 ? generateInteger(index) : generateDouble(index);

export const generateBuffer = (index: number) => {
	const length = index % 10;
	const data: number[] = [];

	for (let i = 0; i < length; i++) {
		data.push((index + i) % 256);
	}

	return new Uint8Array(data);
};

export const generateAll = (index: number) => {
	switch (index % 3) {
		case 0:
			return generateString(index);
		case 1:
			return generateInteger(index);
		default:
			return generateDouble(index);
	}
};
