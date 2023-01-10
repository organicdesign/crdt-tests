import type { CRDT } from "@organicdesign/crdt-interfaces";
export declare const createCRDTTest: <T extends CRDT = CRDT>(create: (id: Uint8Array) => T, action: (crdt: T, index: number) => void) => void;
