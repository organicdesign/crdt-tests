import { createCRDTTest } from "./crdt.js";
export const createPNCounterTest = (create, deserialize) => {
    describe("Counter", () => {
        it("Starts at 0", () => {
            const counter = create("test");
            expect(counter.toValue()).toBe(0);
        });
        it("Adds integers", () => {
            const counter = create("test");
            const integers = [1, -100, 53];
            const sum = integers.reduce((p, c) => p + c, 0);
            for (const integer of integers) {
                if (integer > 0) {
                    counter.increment(integer);
                }
                else {
                    counter.decrement(-integer);
                }
            }
            expect(counter.toValue()).toBe(sum);
        });
        it("Adds floats", () => {
            const counter = create("test");
            const floats = [1, 100.23, -53.00001, 0.12];
            const sum = floats.reduce((p, c) => p + c, 0);
            for (const float of floats) {
                if (float > 0) {
                    counter.increment(float);
                }
                else {
                    counter.decrement(-float);
                }
            }
            // Ensure consistent precision on floats.
            expect(Math.floor(counter.toValue() * 10000) / 10000).toBe(Math.floor(sum * 10000) / 10000);
        });
    });
    createCRDTTest(create, (crdt, index) => crdt.increment(index + 1), deserialize);
};