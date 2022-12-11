import { createSyncTest } from "./sync.js";
import { createSerializeTest } from "./serialize.js";
import { createBroadcastTest } from "./broadcast.js";
import type { CRDT, Deserialize } from "crdt-interfaces";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";

export const createCRDTTest = <T extends CRDT=CRDT>(
	create: (id: Uint8Array) => T,
	action: (crdt: T, index: number) => void,
	deserialize?: Deserialize<T>
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

	if (dummy.serialize != null && deserialize != null) {
		describe("Serialization", () => {
			createSerializeTest(
				(id: Uint8Array) => create(id),
				action,
				deserialize
			);
		});
	}
};
