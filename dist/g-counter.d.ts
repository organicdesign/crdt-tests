import type { MCounter, CRDT, Deserialize } from "crdt-interfaces";
export declare const createGCounterTest: (create: (id: Uint8Array) => MCounter & CRDT, deserialize?: Deserialize<MCounter & CRDT>) => void;
