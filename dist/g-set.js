import { createCRDTTest } from "./crdt.js";
import { generateAll } from "./generate-data.js";
export const createGSetTest = (create) => {
    createCRDTTest(create, (crdt, index) => crdt.add(generateAll(index)));
};
