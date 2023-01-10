import type { CRDT, CreateCRDT } from "@organicdesign/crdt-interfaces";
export declare const createSerializeTest: <T extends CRDT = CRDT>(create: CreateCRDT<T>, action: (crdt: T, index: number) => void) => void;
