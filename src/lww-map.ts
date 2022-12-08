import { createCRDTTest } from "./crdt.js";
import type { BMap, CRDT, Deserialize } from "crdt-interfaces";

export const createLWWMapTest = (
	create: (id: string) => BMap<unknown> & CRDT,
	deserialize?: Deserialize<BMap<unknown> & CRDT>
) => {
	createCRDTTest(
		create,
		(crdt: BMap<unknown> & CRDT, index: number) => crdt.set((index % 5).toString(), index + 1),
		deserialize
	);
};
