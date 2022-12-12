import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
export const createSerializeTest = (create, action) => {
    const name = create(uint8ArrayFromString("dummy")).constructor.name;
    it(`Serializes an empty ${name} to Uint8Array`, () => {
        const crdt = create(uint8ArrayFromString("test"));
        const data = crdt.serialize();
        expect(data).toBeInstanceOf(Uint8Array);
    });
    it(`Serializes a modified ${name} to Uint8Array`, () => {
        const crdt = create(uint8ArrayFromString("test"));
        action(crdt, 0);
        const data = crdt.serialize();
        expect(data).toBeInstanceOf(Uint8Array);
    });
    it(`Deserializes an empty ${name}`, () => {
        const crdt1 = create(uint8ArrayFromString("test"));
        const crdt2 = create(uint8ArrayFromString("test2"));
        crdt2.deserialize(crdt1.serialize());
        expect(crdt1.toValue()).toStrictEqual(crdt2.toValue());
    });
    it(`Deserializes a modified ${name}`, () => {
        const crdt1 = create(uint8ArrayFromString("test"));
        const crdt2 = create(uint8ArrayFromString("test2"));
        action(crdt1, 0);
        crdt2.deserialize(crdt1.serialize());
        expect(crdt1.toValue()).toStrictEqual(crdt2.toValue());
    });
};
