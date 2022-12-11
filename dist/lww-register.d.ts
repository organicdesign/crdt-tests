import type { Register, CRDT, Deserialize } from "crdt-interfaces";
export declare const createLWWRegisterTest: (create: (id: Uint8Array) => Register<unknown> & CRDT, deserialize?: Deserialize<Register<unknown> & CRDT>) => void;
