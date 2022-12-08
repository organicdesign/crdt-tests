import { createCRDTTest } from "./crdt.js";
export const createGSetTest = (create, deserialize) => {
    createCRDTTest(create, (crdt, index) => crdt.add(index + 1), deserialize);
};
