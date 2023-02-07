import {
	CRDT,
	SynchronizableCRDT,
	SerializableCRDT,
	BroadcastableCRDT,
	CreateCRDT,
	isSerializable,
	isSynchronizable,
	isBroadcastable
} from "@organicdesign/crdt-interfaces";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { createSyncTest } from "./sync.js";
import { createSerializeTest } from "./serialize.js";
import { createBroadcastTest } from "./broadcast.js";

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

	if (isBroadcastable(dummy)) {
		describe("Broadcast", () => {
			createBroadcastTest(
				create as unknown as CreateCRDT<BroadcastableCRDT>,
				action as unknown as (crdt: BroadcastableCRDT, index: number) => void
			);
		});
	}

	if (isSerializable(dummy)) {
		describe("Serialization", () => {
			createSerializeTest(
				create as unknown as CreateCRDT<SerializableCRDT>,
				action as unknown as (crdt: SerializableCRDT, index: number) => void
			);
		});
	}
};
