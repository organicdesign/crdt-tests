import type { CRDT } from "crdt-interfaces";
export declare const createBroadcastTest: <T extends CRDT = CRDT>(create: (id: string) => T, action: (crdt: T, index: number) => void, instanceCount?: number) => void;
