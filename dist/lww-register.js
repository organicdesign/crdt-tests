import { createCRDTTest } from "./crdt.js";
export const createLWWRegisterTest = (create) => {
    createCRDTTest(create, (crdt, index) => crdt.set(index + 1));
};
