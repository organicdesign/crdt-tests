import { SynchronizableCRDT, BroadcastableCRDT, SerializableCRDT } from "@organicdesign/crdt-interfaces";
interface Actionable {
    action(index: number): void;
}
export declare const mockCRDT: () => SynchronizableCRDT & BroadcastableCRDT & SerializableCRDT & Actionable;
export {};
