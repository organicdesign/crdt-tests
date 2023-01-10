import type { BRegister, CRDT } from "@organicdesign/crdt-interfaces";
export declare const createLWWRegisterTest: (create: (id: Uint8Array) => BRegister<unknown> & CRDT) => void;
