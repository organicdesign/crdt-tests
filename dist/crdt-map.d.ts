import type { MMap, CRDT, Deserialize } from "crdt-interfaces";
export declare const createCRDTMapTest: (create: (id: Uint8Array) => MMap<CRDT> & CRDT, deserialize?: Deserialize<MMap<CRDT> & CRDT>) => void;
