import type { MSet, CRDT, Deserialize } from "crdt-interfaces";
export declare const createGSetTest: (create: (id: string) => MSet<unknown> & CRDT, deserialize?: Deserialize<MSet<unknown> & CRDT>) => void;
