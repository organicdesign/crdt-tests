import type { MCounter, CRDT } from "crdt-interfaces";
export declare const createGCounterTest: (create: (id: Uint8Array) => MCounter & CRDT) => void;
