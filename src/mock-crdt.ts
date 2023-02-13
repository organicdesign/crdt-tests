import { SynchronizableCRDT, BroadcastableCRDT, SerializableCRDT } from "@organicdesign/crdt-interfaces";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { toString as uint8ArrayToString } from "uint8arrays/to-string";

interface Actionable {
	action (index: number): void
}

let instanceCount = 0;

export const mockCRDT = (): SynchronizableCRDT & BroadcastableCRDT & SerializableCRDT & Actionable => {
	let pData = new Uint8Array([0]);
	let started = false;
	const broadcasters: ((data: Uint8Array) => void)[] = [];

	const update = (data: Uint8Array) => {
		if (uint8ArrayToString(data) > uint8ArrayToString(pData)) {
			pData = data;
			return true;
		}

		return false;
	};

	return {
		id: uint8ArrayFromString(`mock-crdt-${instanceCount++}`),

		isStarted () {
			return started;
		},

		start () {
			started = true;
		},

		stop () {
			started = false;
		},

		action: (index: number) => {
			const data = new Uint8Array([index + 1]);

			update(data);

			for (const broadcast of broadcasters) {
				broadcast(data);
			}
		},

		getSynchronizers () {
			return [{
				protocol: "/test",
				sync (data?: Uint8Array): Uint8Array | undefined {
					if (data == null) {
						return pData;
					}

					update(data);
				}
			}];
		},

		getSerializers () {
			return [{
				protocol: "/test",

				serialize () {
					return pData;
				},

				deserialize (data: Uint8Array) {
					update(data);
				}
			}];
		},

		getBroadcasters () {
			return [{
				protocol: "/test",

				setBroadcast (broadcaster) {
					broadcasters.push(broadcaster);
				},

				onBroadcast (data: Uint8Array): void {
					update(data);
				}
			}];
		},

		toValue: () => uint8ArrayToString(pData)
	};
};
