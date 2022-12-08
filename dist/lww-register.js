import { createCRDTTest } from "./crdt.js";
export const createLWWRegisterTest = (create, deserialize) => {
    createCRDTTest(create, (crdt, index) => crdt.set(index + 1), deserialize);
};
