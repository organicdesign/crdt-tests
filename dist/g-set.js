import { createCRDTTest } from "./crdt.js";
export const createGSetTest = (create) => {
    createCRDTTest(create, (crdt, index) => {
        let value = index + 1;
        if (index % 2 === 0) {
            value = `index: ${index}`;
        }
        crdt.add(value);
    });
};
