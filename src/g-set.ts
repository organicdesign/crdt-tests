import { createCRDTTest } from "./crdt.js";
import type { MSet, CRDT, Deserialize } from "crdt-interfaces";

export const createGSetTest = (
	create: (id: string) => MSet<unknown> & CRDT,
	deserialize?: Deserialize<MSet<unknown> & CRDT>
) => {
	createCRDTTest(
		create,
		(crdt: MSet<unknown> & CRDT, index: number) => crdt.add(index + 1),
		deserialize
	);
};
