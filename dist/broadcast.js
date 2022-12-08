export const createBroadcastTest = (create, action, instanceCount) => {
    if (instanceCount == null) {
        instanceCount = 20;
    }
    const name = create("dummy").constructor.name;
    const runBroadcastTest = (count) => {
        const crdts = [];
        const createBroadcast = (crdt) => (data) => {
            for (const rCrdt of crdts) {
                // Don't broadcast to self.
                if (rCrdt === crdt) {
                    continue;
                }
                rCrdt.onBroadcast(data);
            }
        };
        for (let i = 1; i <= count; i++) {
            const crdt = create(`test-${i}`);
            crdt.addBroadcaster(createBroadcast(crdt));
            crdts.push(crdt);
        }
        for (let i = 0; i < crdts.length; i++) {
            action(crdts[i], i);
        }
        const value = crdts[0].toValue();
        for (const crdt of crdts) {
            expect(crdt.toValue()).toStrictEqual(value);
        }
    };
    it("Broadcasts every time an action is made", () => {
        const broadcast = jest.fn();
        const crdt = create("test");
        const times = 5;
        crdt.addBroadcaster(broadcast);
        for (let i = 0; i < times; i++) {
            action(crdt, i);
        }
        expect(broadcast).toBeCalledTimes(times);
    });
    it(`Syncs 2 ${name}s over broadcast`, () => {
        runBroadcastTest(2);
    });
    it(`Syncs ${instanceCount} ${name}s over broadcast`, () => {
        runBroadcastTest(instanceCount);
    });
};