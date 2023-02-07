import { CreateCRDT, SerializableCRDT } from "@organicdesign/crdt-interfaces";
export declare const createSerializeTest: <T extends SerializableCRDT = SerializableCRDT>(create: CreateCRDT<T>, action: (crdt: T, index: number) => void) => void;
