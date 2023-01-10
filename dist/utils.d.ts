import type { CRDT } from "@organicdesign/crdt-interfaces";
export declare const syncCrdt: (crdt1: CRDT, crdt2: CRDT) => number;
export declare const syncCrdts: (crdts: CRDT[]) => number;
