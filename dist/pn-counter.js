var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { createCRDTTest } from "./crdt.js";
import { generateNumber } from "./generate-data.js";
export const createPNCounterTest = (create) => {
    describe("Counter", () => {
        it("Starts at 0", () => __awaiter(void 0, void 0, void 0, function* () {
            const counter = create({ id: uint8ArrayFromString("test") });
            yield counter.start();
            expect(counter.toValue()).toBe(0);
        }));
        it("Adds integers", () => __awaiter(void 0, void 0, void 0, function* () {
            const counter = create({ id: uint8ArrayFromString("test") });
            const integers = [1, -100, 53];
            const sum = integers.reduce((p, c) => p + c, 0);
            yield counter.start();
            for (const integer of integers) {
                if (integer > 0) {
                    counter.increment(integer);
                }
                else {
                    counter.decrement(-integer);
                }
            }
            expect(counter.toValue()).toBe(sum);
        }));
        it("Adds floats", () => __awaiter(void 0, void 0, void 0, function* () {
            const counter = create({ id: uint8ArrayFromString("test") });
            const floats = [1, 100.23, -53.00001, 0.12];
            const sum = floats.reduce((p, c) => p + c, 0);
            yield counter.start();
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
        }));
    });
    createCRDTTest(create, (crdt, index) => {
        // increment and decrement equally.
        if (index % 2 === 0) {
            crdt.increment(generateNumber(index));
        }
        else {
            crdt.decrement(generateNumber(index));
        }
    });
};
