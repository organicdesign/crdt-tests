import { createCRDTTest } from "./crdt.js";
import { generateAll } from "./generate-data.js";
import type { BMap, CRDT } from "@organicdesign/crdt-interfaces";

export const createLWWMapTest = (
	create: (id: Uint8Array) => BMap<unknown> & CRDT
) => {
	createCRDTTest(
		create,
		(crdt: BMap<unknown> & CRDT, index: number) => crdt.set((index % 5).toString(), generateAll(index))
	);
};
