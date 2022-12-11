import type { MSet, CRDT, Deserialize } from "crdt-interfaces";
export declare const createGSetTest: (create: (id: Uint8Array) => MSet<unknown> & CRDT, deserialize?: Deserialize<MSet<unknown> & CRDT>) => void;
