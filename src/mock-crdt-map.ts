import {
	SynchronizableCRDT,
	CRDTSynchronizer,
	CRDT
} from "@organicdesign/crdt-interfaces";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { mockCRDT } from "./mock-crdt.js";

interface Actionable {
	action (index: number): void
}

interface CRDTMapSyncComponents {
	keys (): Iterable<string>
	get (key: string): CRDT | undefined
	getId (): Uint8Array
}

let instanceCount = 0;

export const mockCRDTMap = (
	createSynchronizer: (components: CRDTMapSyncComponents) => CRDTSynchronizer
): SynchronizableCRDT & Actionable => {
	let started = false;
	const data = new Map<string, CRDT & Actionable>();
	const id = uint8ArrayFromString(`mock-crdt-map-${instanceCount}`);
	const crdtCount = 3;

	for (let i = 0; i < crdtCount; i++) {
		data.set(`crdt-${i}`, mockCRDT());
	}

	const synchronizers = [createSynchronizer({
		keys: () => data.keys(),
		get: (key: string) => data.get(key),
		getId: () => id
	})];

	return {
		id,

		isStarted() {
			return started;
		},

		start () {
			started = true;
		},

		stop () {
			started = false;
		},

		action: (index: number) => {
			data.get(`crdt-${index % crdtCount}`)?.action(index);
		},

		getSynchronizers () {
			return synchronizers;
		},

		toValue: () => {
			const map = new Map<string, unknown>();

			for (const [key, value] of data.entries()) {
				map.set(key, value.toValue());
			}

			return map;
		}
	};
};
