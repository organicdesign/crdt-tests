import { createCRDTTest } from "./crdt.js";
import { generateAll } from "./generate-data.js";
export const createLWWRegisterTest = (create) => {
    createCRDTTest(create, (crdt, index) => crdt.set(generateAll(index)));
};
