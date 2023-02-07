import { createCRDTTest } from "./crdt.js";
import { generateAll } from "./generate-data.js";
export const createLWWMapTest = (create) => {
    createCRDTTest(create, (crdt, index) => crdt.set(`key-${(index % 5).toString()}`, generateAll(index)));
};
