import type { CRDT } from "crdt-interfaces";
export declare const createCRDTTest: <T extends CRDT = CRDT>(create: (id: Uint8Array) => T, action: (crdt: T, index: number) => void) => void;
