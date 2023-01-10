import type { MMap, CRDT } from "@organicdesign/crdt-interfaces";
export declare const createCRDTMapTest: (create: (id: Uint8Array) => MMap<CRDT> & CRDT) => void;
