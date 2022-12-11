import type { CRDT } from "crdt-interfaces";
export declare const createSyncTest: <T extends CRDT = CRDT>(create: (id: Uint8Array) => T, action: (crdt: T, index: number) => void, instanceCount?: number) => void;
