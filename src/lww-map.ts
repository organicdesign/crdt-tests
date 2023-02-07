import type { BMap, CRDT, CreateCRDT } from "@organicdesign/crdt-interfaces";
import { createCRDTTest } from "./crdt.js";
import { generateAll } from "./generate-data.js";

export const createLWWMapTest = (
	create: CreateCRDT<BMap<unknown> & CRDT>
) => {
	createCRDTTest(
		create,
		(crdt: BMap<unknown> & CRDT, index: number) => crdt.set(`key-${(index % 5).toString()}`, generateAll(index))
	);
};
