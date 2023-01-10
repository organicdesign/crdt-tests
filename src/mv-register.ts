import { createCRDTTest } from "./crdt.js";
import { generateAll } from "./generate-data.js";
import type { MVRegister, CRDT, CreateCRDT } from "@organicdesign/crdt-interfaces";

export const createMVRegisterTest = (
	create: CreateCRDT<MVRegister<unknown> & CRDT>
) => {
	createCRDTTest(
		create,
		(crdt: MVRegister<unknown> & CRDT, index: number) => crdt.set(generateAll(index))
	);
};
