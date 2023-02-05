import { SynchronizableCRDT, getSynchronizerProtocols, getSynchronizer } from "../../crdt-interfaces/src/index.js";

let genSyncId = (() => {
	let id = 0;

	return () => id++;
})();

export const syncCrdt = (crdt1: SynchronizableCRDT, crdt2: SynchronizableCRDT): number => {
	const protocols = [
		...new Set([
			...getSynchronizerProtocols(crdt1),
			...getSynchronizerProtocols(crdt2)
		]).values()
	];

	if (protocols.length === 0) {
		throw new Error("no common synchronize protocols");
	}

	const synchronizer1 = getSynchronizer(crdt1, protocols[0]);
	const synchronizer2 = getSynchronizer(crdt2, protocols[0]);

	if (synchronizer1 == null || synchronizer2 == null) {
		throw new Error("error getting synchronizer protocol");
	}

	const syncId = genSyncId();
	let data = synchronizer1.sync(undefined, { id: crdt2.id, syncId });
	let i = 0;
	let transfer = 0;

	while (data != null) {
		if (i > 100) {
			throw new Error("Infinite sync loop detected.");
		}

		transfer += data.length;

		const response = synchronizer2.sync(data, { id: crdt1.id, syncId });

		if (response == null) {
			break;
		}

		transfer += response.length;

		data = synchronizer1.sync(response, { id: crdt2.id, syncId });

		i++;
	}

	return transfer;
};

export const syncCrdts = (crdts: SynchronizableCRDT[]): number => {
	let transfer = 0;

	for (const crdt1 of crdts) {
		for (const crdt2 of crdts) {
			if (crdt1 === crdt2) {
				continue;
			}

			transfer += syncCrdt(crdt1, crdt2);
		}
	}

	return transfer;
};
