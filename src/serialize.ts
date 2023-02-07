import {
	CreateCRDT,
	SerializableCRDT,
	CRDTSerializer,
	getSerializer,
	getSerializerProtocols
} from "@organicdesign/crdt-interfaces";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";

export const createSerializeTest = <T extends SerializableCRDT=SerializableCRDT>(
	create: CreateCRDT<T>,
	action: (crdt: T, index: number) => void
) => {
	const name = create({ id: uint8ArrayFromString("dummy") }).constructor.name;

	const getSerializers = (crdts: SerializableCRDT[]): CRDTSerializer[] => {
		const protocols = [
			...new Set(
				crdts.map(c => getSerializerProtocols(c)).reduce((p, c) => [...c, ...p], [])
			).values()
		];

		if (protocols.length === 0) {
			throw new Error("no common synchronize protocols");
		}

		return crdts.map(c => getSerializer(c, protocols[0])).filter(s => s != null) as CRDTSerializer[];
	};

	it(`Serializes an empty ${name} to Uint8Array`, () => {
		const crdt = create({ id: uint8ArrayFromString("test") });
		const data = [...crdt.getSerializers()][0]?.serialize();

		expect(data).toBeInstanceOf(Uint8Array);
	});

	it(`Serializes a modified ${name} to Uint8Array`, () => {
		const crdt = create({ id: uint8ArrayFromString("test") });

		action(crdt as T, 0);

		const data = [...crdt.getSerializers()][0]?.serialize();

		expect(data).toBeInstanceOf(Uint8Array);
	});

	it(`Deserializes an empty ${name}`, () => {
		const crdt1 = create({ id: uint8ArrayFromString("test") });
		const crdt2 = create({ id: uint8ArrayFromString("test2") });

		const [serializer1, serializer2] = getSerializers([crdt1, crdt2]);

		if (serializer1 == null || serializer2 == null) {
			throw new Error("error getting synchronizer protocol");
		}

		serializer2.deserialize(serializer1.serialize());

		expect(crdt1.toValue()).toStrictEqual(crdt2.toValue());
	});

	it(`Deserializes a modified ${name}`, () => {
		const crdt1 = create({ id: uint8ArrayFromString("test") });
		const crdt2 = create({ id: uint8ArrayFromString("test2") });

		action(crdt1, 0);

		const [serializer1, serializer2] = getSerializers([crdt1, crdt2]);

		const data = serializer1.serialize();
		serializer2.deserialize(data);

		expect(crdt1.toValue()).toStrictEqual(crdt2.toValue());

		console.info(`Serialized a ${name} in ${data.length} bytes.`);
	});
};
