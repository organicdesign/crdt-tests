import { createSyncTest } from "./sync.js";
import { createSerializeTest } from "./serialize.js";
import { createBroadcastTest } from "./broadcast.js";
import type { CRDT } from "crdt-interfaces";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";

export const createCRDTTest = <T extends CRDT=CRDT>(
	create: (id: Uint8Array) => T,
	action: (crdt: T, index: number) => void
) => {
	describe("Sync", () => {
		createSyncTest(
			(id: Uint8Array) => create(id),
			action
		);
	});

	const dummy = create(uint8ArrayFromString("dummy"));

	if (dummy.addBroadcaster != null && dummy.onBroadcast != null) {
		describe("Broadcast", () => {
			createBroadcastTest(
				(id: Uint8Array) => create(id),
				action
			);
		});
	}

	if (dummy.serialize != null && dummy.deserialize != null) {
		describe("Serialization", () => {
			createSerializeTest(
				(id: Uint8Array) => create(id),
				action
			);
		});
	}
};
