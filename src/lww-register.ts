import { createCRDTTest } from "./crdt.js";
import type { Register, CRDT } from "crdt-interfaces";

export const createLWWRegisterTest = (
	create: (id: Uint8Array) => Register<unknown> & CRDT
) => {
	createCRDTTest(
		create,
		(crdt: Register<unknown> & CRDT, index: number) => crdt.set(index + 1)
	);
};
