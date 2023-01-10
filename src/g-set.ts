import { createCRDTTest } from "./crdt.js";
import { generateAll } from "./generate-data.js";
import type { MSet, CRDT } from "@organicdesign/crdt-interfaces";

export const createGSetTest = (
	create: (id: Uint8Array) => MSet<unknown> & CRDT
) => {
	createCRDTTest(
		create,
		(crdt: MSet<unknown> & CRDT, index: number) => crdt.add(generateAll(index))
	);
};
