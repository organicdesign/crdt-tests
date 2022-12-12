import type { Register, CRDT } from "crdt-interfaces";
export declare const createLWWRegisterTest: (create: (id: Uint8Array) => Register<unknown> & CRDT) => void;
