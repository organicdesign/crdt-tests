import { createSyncTest } from "./sync.js";
import { createSerializeTest } from "./serialize.js";
import { createBroadcastTest } from "./broadcast.js";
import type { CRDT, CreateCRDT } from "@organicdesign/crdt-interfaces";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";

export const createCRDTTest = <T extends CRDT=CRDT>(
	create: CreateCRDT<T>,
	action: (crdt: T, index: number) => void
) => {
	describe("Sync", () => {
		createSyncTest(
			create,
			action
		);
	});

	const dummy = create({ id: uint8ArrayFromString("dummy") });

	if (dummy.addBroadcaster != null && dummy.onBroadcast != null) {
		describe("Broadcast", () => {
			createBroadcastTest(
				create,
				action
			);
		});
	}

	if (dummy.serialize != null && dummy.deserialize != null) {
		describe("Serialization", () => {
			createSerializeTest(
				create,
				action
			);
		});
	}
};
