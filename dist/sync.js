import { syncCrdts } from "./utils.js";
export const createSyncTest = (create, action, instanceCount) => {
    if (instanceCount == null) {
        instanceCount = 20;
    }
    const name = create("dummy").constructor.name;
    const runSyncTest = (count) => {
        const crdts = [];
        for (let i = 1; i <= count; i++) {
            const crdt = create(`test-${i}`);
            action(crdt, i);
            crdts.push(crdt);
        }
        syncCrdts(crdts);
        const result = crdts[0].toValue();
        for (const crdt of crdts) {
            expect(crdt.toValue()).toStrictEqual(result);
        }
    };
    it(`Syncs 2 ${name}s`, () => {
        runSyncTest(2);
    });
    it(`Syncs ${instanceCount} ${name}s`, () => {
        runSyncTest(20);
    });
};
