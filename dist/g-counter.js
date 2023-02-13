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
export const createGCounterTest = (create) => {
    describe("Counter", () => {
        it("Starts at 0", () => __awaiter(void 0, void 0, void 0, function* () {
            const counter = create({ id: uint8ArrayFromString("test") });
            yield counter.start();
            expect(counter.toValue()).toBe(0);
        }));
        it("Adds integers", () => __awaiter(void 0, void 0, void 0, function* () {
            const counter = create({ id: uint8ArrayFromString("test") });
            const integers = [1, 100, 53];
            const sum = integers.reduce((p, c) => p + c, 0);
            yield counter.start();
            for (const integer of integers) {
                counter.increment(integer);
            }
            expect(counter.toValue()).toBe(sum);
        }));
        it("Adds floats", () => __awaiter(void 0, void 0, void 0, function* () {
            const counter = create({ id: uint8ArrayFromString("test") });
            const floats = [1, 100.23, 53.000001, 0.12];
            const sum = floats.reduce((p, c) => p + c, 0);
            yield counter.start();
            for (const float of floats) {
                counter.increment(float);
            }
            // Ensure consistent precision on floats.
            expect(Math.floor(counter.toValue() * 10000) / 10000).toBe(Math.floor(sum * 10000) / 10000);
        }));
        it("Does not use negative values", () => __awaiter(void 0, void 0, void 0, function* () {
            const counter = create({ id: uint8ArrayFromString("test") });
            const integers = [1, -2, 100, -3, 53];
            const sum = integers.filter(i => i > 0).reduce((p, c) => p + c, 0);
            yield counter.start();
            for (const integer of integers) {
                counter.increment(integer);
            }
            expect(counter.toValue()).toBe(sum);
        }));
    });
    createCRDTTest(create, (crdt, index) => crdt.increment(generateNumber(index)));
};
