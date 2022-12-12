import { createCRDTTest } from "./crdt.js";
export const createGSetTest = (create) => {
    createCRDTTest(create, (crdt, index) => crdt.add(index + 1));
};
