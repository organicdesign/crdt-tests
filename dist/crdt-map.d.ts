import type { MMap, CRDT } from "crdt-interfaces";
export declare const createCRDTMapTest: (create: (id: Uint8Array) => MMap<CRDT> & CRDT) => void;
