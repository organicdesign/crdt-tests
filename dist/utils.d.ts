import { SynchronizableCRDT } from "@organicdesign/crdt-interfaces";
export declare const syncCrdt: (crdt1: SynchronizableCRDT, crdt2: SynchronizableCRDT) => number;
export declare const syncCrdts: (crdts: SynchronizableCRDT[]) => number;
