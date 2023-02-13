import type { BCounter, CRDT, CreateCRDT } from "@organicdesign/crdt-interfaces";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { createCRDTTest } from "./crdt.js";
import { generateNumber } from "./generate-data.js";

export const createPNCounterTest = (
	create: CreateCRDT<BCounter & CRDT>
) => {
	describe("Counter", () => {
		it("Starts at 0", async () => {
			const counter = create({ id: uint8ArrayFromString("test") });

			await counter.start();

			expect(counter.toValue()).toBe(0);
		});

		it("Adds integers", async () => {
			const counter = create({ id: uint8ArrayFromString("test") });
			const integers = [1, -100, 53];
			const sum = integers.reduce((p, c) => p + c, 0);

			await counter.start();

			for (const integer of integers) {
				if (integer > 0) {
					counter.increment(integer);
				} else {
					counter.decrement(-integer);
				}
			}

			expect(counter.toValue()).toBe(sum);
		});

		it("Adds floats", async () => {
			const counter = create({ id: uint8ArrayFromString("test") });
			const floats = [1, 100.23, -53.00001, 0.12];
			const sum = floats.reduce((p, c) => p + c, 0);

			await counter.start();

			for (const float of floats) {
				if (float > 0) {
					counter.increment(float);
				} else {
					counter.decrement(-float);
				}
			}

			// Ensure consistent precision on floats.
			expect(Math.floor((counter.toValue() as number) * 10000) / 10000).toBe(Math.floor(sum * 10000) / 10000);
		});
	});

	createCRDTTest(
		create,
		(crdt: BCounter & CRDT, index: number) => {
			// increment and decrement equally.
			if (index % 2 === 0) {
				crdt.increment(generateNumber(index));
			} else {
				crdt.decrement(generateNumber(index));
			}
		}
	);
};
