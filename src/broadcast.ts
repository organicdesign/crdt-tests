import { jest } from "@jest/globals";
import {
	CreateCRDT,
	BroadcastableCRDT,
	getBroadcasterProtocols,
	getBroadcaster
} from "../../crdt-interfaces/src/index.js";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";

export const createBroadcastTest = <T extends BroadcastableCRDT=BroadcastableCRDT>(
	create: CreateCRDT<T>,
	action: (crdt: T, index: number) => void,
	instanceCount?: number
) => {
	if (instanceCount == null) {
		instanceCount = 20;
	}

	const name = create({ id: uint8ArrayFromString("dummy") }).constructor.name;

	const runBroadcastTest = (count: number) => {
		const crdts: T[] = [];
		let transfer = 0;

		const createBroadcast = (crdt: T) => (data: Uint8Array) => {
			transfer += data.length;

			for (const rCrdt of crdts) {
				// Don't broadcast to self.
				if (rCrdt === crdt) {
					continue;
				}

				for (const protocol of getBroadcasterProtocols(rCrdt)) {
					getBroadcaster(rCrdt, protocol)?.onBroadcast(data)
				}
			}
		};

		for (let i = 1; i <= count; i++) {
			const crdt = create({ id: uint8ArrayFromString(`test-${i}`) });

			for (const protocol of getBroadcasterProtocols(crdt)) {
				getBroadcaster(crdt, protocol)?.setBroadcast(createBroadcast(crdt))
			}

			crdts.push(crdt);
		}

		for (let i = 0; i < crdts.length; i++) {
			action(crdts[i], i);
		}

		const value = crdts[0].toValue();

		for (const crdt of crdts) {
			expect(crdt.toValue()).toStrictEqual(value);
		}

		console.info(`Synced ${count} ${name}s over broadcast in ${transfer} bytes.`);
	};

	it("Broadcasts every time an action is made", () => {
		const broadcast = jest.fn();
		const crdt = create({ id: uint8ArrayFromString("test") });
		const times = 5;

		for (const protocol of getBroadcasterProtocols(crdt)) {
			getBroadcaster(crdt, protocol)?.setBroadcast(broadcast)
		}

		for (let i = 0; i < times; i++) {
			action(crdt, i);
		}

		expect(broadcast).toBeCalledTimes(times);
	});

	it(`Syncs 2 ${name}s over broadcast`, () => {
		runBroadcastTest(2);
	});

	it(`Syncs ${instanceCount} ${name}s over broadcast`, () => {
		runBroadcastTest(instanceCount as number);
	});
};
