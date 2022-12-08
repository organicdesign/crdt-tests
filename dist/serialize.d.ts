import type { CRDT, Deserialize } from "crdt-interfaces";
export declare const createSerializeTest: <T extends CRDT = CRDT>(create: (id: string) => T, action: (crdt: T, index: number) => void, deserialize: Deserialize<T>) => void;
