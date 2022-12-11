import type { BMap, CRDT, Deserialize } from "crdt-interfaces";
export declare const createLWWMapTest: (create: (id: Uint8Array) => BMap<unknown> & CRDT, deserialize?: Deserialize<BMap<unknown> & CRDT>) => void;
