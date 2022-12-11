import type { BCounter, CRDT, Deserialize } from "crdt-interfaces";
export declare const createPNCounterTest: (create: (id: Uint8Array) => BCounter & CRDT, deserialize?: Deserialize<BCounter & CRDT>) => void;
