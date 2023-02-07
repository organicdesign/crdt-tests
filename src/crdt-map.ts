import {
	MMap,
	CRDT,
	SynchronizableCRDT,
	BroadcastableCRDT,
	CreateCRDT
} from "@organicdesign/crdt-interfaces";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { toString as uint8ArrayToString } from "uint8arrays/to-string";
import { createCRDTTest } from "./crdt.js";
import { generateNumber } from "./generate-data.js";

interface Actionable {
	action (index: number): void
}

const createDummyCRDT = (): SynchronizableCRDT & BroadcastableCRDT & Actionable => {
	let pData = new Uint8Array([0]);
	const broadcasters: ((data: Uint8Array) => void)[] = [];

	const update = (data: Uint8Array) => {
		if (uint8ArrayToString(data) > uint8ArrayToString(pData)) {
			pData = data;
			return true;
		}

		return false;
	};

	return {
		id: uint8ArrayFromString("dummy"),

		action: (index: number) => {
			const data = new Uint8Array([index + 1]);

			update(data);

			for (const broadcast of broadcasters) {
				broadcast(data);
			}
		},

		getSynchronizers () {
			return [{
				protocol: "/test",
				sync (data?: Uint8Array): Uint8Array | undefined {
					if (data == null) {
						return pData;
					}

					update(data);
				}
			}];
		},

		getBroadcasters () {
			return [{
				protocol: "/test",

				setBroadcast (broadcaster) {
					broadcasters.push(broadcaster);
				},

				onBroadcast (data: Uint8Array): void {
					update(data);
				}
			}];
		},

		toValue: () => uint8ArrayToString(pData)
	};
};

export const createCRDTMapTest = (
	create: CreateCRDT<MMap<CRDT> & CRDT>
) => {
	const createWithDummies: CreateCRDT = ({ id }: { id: Uint8Array }) => {
		const crdt = create({ id });

		crdt.set("dummy1", createDummyCRDT());
		crdt.set("dummy2", createDummyCRDT());

		return crdt;
	};

	const action = (crdt: MMap<CRDT & Actionable> & CRDT, index: number) => {
		const name = index % 2 === 0 ? "dummy1" : "dummy2";

		const subCrdt = crdt.get(name);

		if (subCrdt == null) {
			return;
		}

		subCrdt.action(generateNumber(index));
	};

	createCRDTTest(
		createWithDummies,
		action
	);
};
