import { syncCrdts } from "./utils.js";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
export const createSyncTest = (create, action, instanceCount) => {
    if (instanceCount == null) {
        instanceCount = 20;
    }
    const name = create(uint8ArrayFromString("dummy")).constructor.name;
    const runSyncTest = (count) => {
        const crdts = [];
        for (let i = 1; i <= count; i++) {
            const crdt = create(uint8ArrayFromString(`test-${i}`));
            action(crdt, i);
            crdts.push(crdt);
        }
        const transfer = syncCrdts(crdts);
        const result = crdts[0].toValue();
        for (const crdt of crdts) {
            expect(crdt.toValue()).toStrictEqual(result);
        }
        console.info(`Synced ${count} ${name}s in ${transfer} bytes.`);
    };
    it(`Syncs 2 ${name}s`, () => {
        runSyncTest(2);
    });
    it(`Syncs ${instanceCount} ${name}s`, () => {
        runSyncTest(20);
    });
};
