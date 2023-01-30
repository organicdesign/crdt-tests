import { createSyncTest } from "./sync.js";
import { createSerializeTest } from "./serialize.js";
import { createBroadcastTest } from "./broadcast.js";
import { CRDT, SynchronizableCRDT, SerializableCRDT, CreateCRDT, isSerializable, isSynchronizable } from "../../crdt-interfaces/src/index.js";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";

export const createCRDTTest = <T extends CRDT=CRDT>(
	create: CreateCRDT<T>,
	action: (crdt: T, index: number) => void
) => {
	const dummy = create({ id: uint8ArrayFromString("dummy") });

	if (isSynchronizable(dummy)) {
		describe("Sync", () => {
			createSyncTest(
				create as unknown as CreateCRDT<SynchronizableCRDT>,
				action as unknown as (crdt: SynchronizableCRDT, index: number) => void
			);
		});
	}
/*
	if (dummy.addBroadcaster != null && dummy.onBroadcast != null) {
		describe("Broadcast", () => {
			createBroadcastTest(
				create,
				action
			);
		});
	}
*/

	if (isSerializable(dummy)) {
		describe("Serialization", () => {
			createSerializeTest(
				create as unknown as CreateCRDT<SerializableCRDT>,
				action as unknown as (crdt: SerializableCRDT, index: number) => void
			);
		});
	}
};
