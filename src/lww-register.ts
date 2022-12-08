import { createCRDTTest } from "./crdt.js";
import type { Register, CRDT, Deserialize } from "crdt-interfaces";

export const createLWWRegisterTest = (
	create: (id: string) => Register<unknown> & CRDT,
	deserialize?: Deserialize<Register<unknown> & CRDT>
) => {
	createCRDTTest(
		create,
		(crdt: Register<unknown> & CRDT, index: number) => crdt.set(index + 1),
		deserialize
	);
};
