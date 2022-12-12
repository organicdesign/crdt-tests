import { createCRDTTest } from "./crdt.js";
import type { BMap, CRDT } from "crdt-interfaces";

export const createLWWMapTest = (
	create: (id: Uint8Array) => BMap<unknown> & CRDT
) => {
	createCRDTTest(
		create,
		(crdt: BMap<unknown> & CRDT, index: number) => crdt.set((index % 5).toString(), index + 1)
	);
};
