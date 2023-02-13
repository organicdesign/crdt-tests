import { createCRDTTest } from "./crdt.js";
import { generateNumber } from "./generate-data.js";
import { mockCRDT } from "./mock-crdt.js";
export const createCRDTMapTest = (create) => {
    const createWithDummies = ({ id }) => {
        const crdt = create({ id });
        crdt.set("dummy1", mockCRDT());
        crdt.set("dummy2", mockCRDT());
        return crdt;
    };
    const action = (crdt, index) => {
        const name = index % 2 === 0 ? "dummy1" : "dummy2";
        const subCrdt = crdt.get(name);
        if (subCrdt == null) {
            return;
        }
        subCrdt.action(generateNumber(index));
    };
    createCRDTTest(createWithDummies, action);
};
