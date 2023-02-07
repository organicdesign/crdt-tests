import { CreateCRDT, BroadcastableCRDT } from "@organicdesign/crdt-interfaces";
export declare const createBroadcastTest: <T extends BroadcastableCRDT = BroadcastableCRDT>(create: CreateCRDT<T>, action: (crdt: T, index: number) => void, instanceCount?: number) => void;
