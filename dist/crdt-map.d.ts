import type { MMap, CRDT, Deserialize } from "crdt-interfaces";
export declare const createCRDTMapTest: (create: (id: string) => MMap<CRDT> & CRDT, deserialize?: Deserialize<MMap<CRDT> & CRDT>) => void;
