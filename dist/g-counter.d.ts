import type { MCounter, CRDT, Deserialize } from "crdt-interfaces";
export declare const createGCounterTest: (create: (id: string) => MCounter & CRDT, deserialize?: Deserialize<MCounter & CRDT>) => void;
