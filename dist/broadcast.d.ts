import type { CRDT, CreateCRDT } from "@organicdesign/crdt-interfaces";
export declare const createBroadcastTest: <T extends CRDT = CRDT>(create: CreateCRDT<T>, action: (crdt: T, index: number) => void, instanceCount?: number) => void;
