import { SynchronizableCRDT, CreateCRDT } from "@organicdesign/crdt-interfaces";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { syncCrdts } from "./utils.js";

export const createSyncronizeTest = <T extends SynchronizableCRDT=SynchronizableCRDT>(
	create: CreateCRDT<T>,
	action: (crdt: T, index: number) => void,
	instanceCount?: number
) => {
	if (instanceCount == null) {
		instanceCount = 20;
	}

	const name = create({ id: uint8ArrayFromString("dummy") }).constructor.name;

	const runSyncTest = async (count: number) => {
		const crdts: SynchronizableCRDT[] = [];

		for (let i = 1; i <= count; i++) {
			crdts.push(create({ id: uint8ArrayFromString(`test-${i}`) }));
		}

		await Promise.all(crdts.map(c => c.start()));

		for (const [i, crdt] of crdts.entries()) {
			action(crdt as T, i);
		}

		const transfer = syncCrdts(crdts);

		const result = crdts[0].toValue();

		for (const crdt of crdts) {
			expect(crdt.toValue()).toStrictEqual(result);
		}

		console.info(`Synced ${count} ${name}s in ${transfer} bytes.`);
	};

	it(`Syncs 2 ${name}s`, async () => {
		await runSyncTest(2);
	});

	it(`Syncs ${instanceCount} ${name}s`, async () => {
		await runSyncTest(20);
	});
};
