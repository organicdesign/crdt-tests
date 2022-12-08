import { createSyncTest } from "./sync.js";
import { createSerializeTest } from "./serialize.js";
import { createBroadcastTest } from "./broadcast.js";
import type { CRDT, Deserialize } from "crdt-interfaces";

export const createCRDTTest = <T extends CRDT=CRDT>(
	create: (id: string) => T,
	action: (crdt: T, index: number) => void,
	deserialize?: Deserialize<T>
) => {
	describe("Sync", () => {
		createSyncTest(
			(id: string) => create(id),
			action
		);
	});

	const dummy = create("dummy");

	if (dummy.addBroadcaster != null && dummy.onBroadcast != null) {
		describe("Broadcast", () => {
			createBroadcastTest(
				(id: string) => create(id),
				action
			);
		});
	}

	if (dummy.serialize != null && deserialize != null) {
		describe("Serialization", () => {
			createSerializeTest(
				(id: string) => create(id),
				action,
				deserialize
			);
		});
	}
};
