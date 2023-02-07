import { SynchronizableCRDT, CRDTSynchronizer, CRDT } from "@organicdesign/crdt-interfaces";
interface Actionable {
    action(index: number): void;
}
interface CRDTMapSyncComponents {
    keys(): Iterable<string>;
    get(key: string): CRDT | undefined;
    getId(): Uint8Array;
}
export declare const mockCRDTMap: (createSynchronizer: (components: CRDTMapSyncComponents) => CRDTSynchronizer) => SynchronizableCRDT & Actionable;
export {};
