import type { CRDT, Deserialize } from "crdt-interfaces";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";

export const createSerializeTest = <T extends CRDT=CRDT>(
	create: (id: Uint8Array) => T,
	action: (crdt: T, index: number) => void,
	deserialize: Deserialize<T>
) => {
	const name = create(uint8ArrayFromString("dummy")).constructor.name;

	it(`Serializes an empty ${name} to Uint8Array`, () => {
		const crdt = create(uint8ArrayFromString("test"));
		const data = crdt.serialize!();

		expect(data).toBeInstanceOf(Uint8Array);
	});

	it(`Serializes a modified ${name} to Uint8Array`, () => {
		const crdt = create(uint8ArrayFromString("test"));

		action(crdt, 0);

		const data = crdt.serialize!();

		expect(data).toBeInstanceOf(Uint8Array);
	});

	it(`Deserializes an empty ${name}`, () => {
		const crdt1 = create(uint8ArrayFromString("test"));
		const data = crdt1.serialize!();
		const crdt2 = deserialize(data);

		expect(crdt1.toValue()).toStrictEqual(crdt2.toValue());
	});

	it(`Deserializes a modified ${name}`, () => {
		const crdt1 = create(uint8ArrayFromString("test"));

		action(crdt1, 0);

		const data = crdt1.serialize!();
		const crdt2 = deserialize(data);

		expect(crdt1.toValue()).toStrictEqual(crdt2.toValue());
	});
};
