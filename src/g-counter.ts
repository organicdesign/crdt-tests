import type { MCounter, CRDT, CreateCRDT } from "@organicdesign/crdt-interfaces";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { createCRDTTest } from "./crdt.js";
import { generateNumber } from "./generate-data.js";

export const createGCounterTest = (
	create: CreateCRDT<MCounter & CRDT>
) => {
	describe("Counter", () => {
		it("Starts at 0", async () => {
			const counter = create({ id: uint8ArrayFromString("test") });

			await counter.start();

			expect(counter.toValue()).toBe(0);
		});

		it("Adds integers", async () => {
			const counter = create({ id: uint8ArrayFromString("test") });
			const integers = [1, 100, 53];
			const sum = integers.reduce((p, c) => p + c, 0);

			await counter.start();

			for (const integer of integers) {
				counter.increment(integer);
			}

			expect(counter.toValue()).toBe(sum);
		});

		it("Adds floats", async () => {
			const counter = create({ id: uint8ArrayFromString("test") });
			const floats = [1, 100.23, 53.000001, 0.12];
			const sum = floats.reduce((p, c) => p + c, 0);

			await counter.start();

			for (const float of floats) {
				counter.increment(float);
			}

			// Ensure consistent precision on floats.
			expect(Math.floor((counter.toValue() as number) * 10000) / 10000).toBe(Math.floor(sum * 10000) / 10000);
		});

		it("Does not use negative values", async () => {
			const counter = create({ id: uint8ArrayFromString("test") });
			const integers = [1, -2, 100, -3, 53];
			const sum = integers.filter(i => i > 0).reduce((p, c) => p + c, 0);

			await counter.start();

			for (const integer of integers) {
				counter.increment(integer);
			}

			expect(counter.toValue()).toBe(sum);
		});
	});

	createCRDTTest(
		create,
		(crdt: MCounter & CRDT, index: number) => crdt.increment(generateNumber(index))
	);
};
