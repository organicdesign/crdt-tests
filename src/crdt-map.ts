import {
	MMap,
	CRDT,
	CreateCRDT
} from "@organicdesign/crdt-interfaces";
import { createCRDTTest } from "./crdt.js";
import { generateNumber } from "./generate-data.js";
import { mockCRDT } from "./mock-crdt.js";

interface Actionable {
	action (index: number): void
}

export const createCRDTMapTest = (
	create: CreateCRDT<MMap<CRDT> & CRDT>
) => {
	const createWithDummies: CreateCRDT = ({ id }: { id: Uint8Array }) => {
		const crdt = create({ id });

		crdt.set("dummy1", mockCRDT());
		crdt.set("dummy2", mockCRDT());

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
