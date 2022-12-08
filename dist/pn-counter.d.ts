import type { BCounter, CRDT, Deserialize } from "crdt-interfaces";
export declare const createPNCounterTest: (create: (id: string) => BCounter & CRDT, deserialize?: Deserialize<BCounter & CRDT>) => void;
