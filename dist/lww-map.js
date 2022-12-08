import { createCRDTTest } from "./crdt.js";
export const createLWWMapTest = (create, deserialize) => {
    createCRDTTest(create, (crdt, index) => crdt.set((index % 5).toString(), index + 1), deserialize);
};
