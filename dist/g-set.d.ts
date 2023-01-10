import type { MSet, CRDT } from "@organicdesign/crdt-interfaces";
export declare const createGSetTest: (create: (id: Uint8Array) => MSet<unknown> & CRDT) => void;
