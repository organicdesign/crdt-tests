import type { CRDT, Deserialize } from "crdt-interfaces";
export declare const createCRDTTest: <T extends CRDT = CRDT>(create: (id: Uint8Array) => T, action: (crdt: T, index: number) => void, deserialize?: Deserialize<T> | undefined) => void;
