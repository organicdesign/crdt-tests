import type { BCounter, CRDT } from "crdt-interfaces";
export declare const createPNCounterTest: (create: (id: Uint8Array) => BCounter & CRDT) => void;
