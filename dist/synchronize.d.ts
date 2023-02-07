import { SynchronizableCRDT, CreateCRDT } from "@organicdesign/crdt-interfaces";
export declare const createSyncronizeTest: <T extends SynchronizableCRDT = SynchronizableCRDT>(create: CreateCRDT<T>, action: (crdt: T, index: number) => void, instanceCount?: number) => void;
