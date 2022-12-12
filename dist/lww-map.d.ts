import type { BMap, CRDT } from "crdt-interfaces";
export declare const createLWWMapTest: (create: (id: Uint8Array) => BMap<unknown> & CRDT) => void;
