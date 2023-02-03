import { createCRDTTest } from "./crdt.js";
import { generateAll } from "./generate-data.js";
import type { BRegister, CRDT, CreateCRDT } from "../../crdt-interfaces/src/index.js";

export const createLWWRegisterTest = (
	create: CreateCRDT<BRegister<unknown> & CRDT>
) => {
	createCRDTTest(
		create,
		(crdt: BRegister<unknown> & CRDT, index: number) => crdt.set(generateAll(index))
	);
};
