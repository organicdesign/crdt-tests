import { createCRDTTest } from "./crdt.js";
import type { MSet, CRDT } from "crdt-interfaces";

export const createGSetTest = (
	create: (id: Uint8Array) => MSet<unknown> & CRDT
) => {
	createCRDTTest(
		create,
		(crdt: MSet<unknown> & CRDT, index: number) => crdt.add(index + 1)
	);
};
