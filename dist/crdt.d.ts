import { CRDT, CreateCRDT } from "@organicdesign/crdt-interfaces";
export declare const createCRDTTest: <T extends CRDT = CRDT>(create: CreateCRDT<T>, action: (crdt: T, index: number) => void) => void;
