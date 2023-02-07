import { isSerializable, isSynchronizable, isBroadcastable } from "@organicdesign/crdt-interfaces";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { createSyncronizeTest } from "./synchronize.js";
import { createSerializeTest } from "./serialize.js";
import { createBroadcastTest } from "./broadcast.js";
export const createCRDTTest = (create, action) => {
    const dummy = create({ id: uint8ArrayFromString("dummy") });
    if (isSynchronizable(dummy)) {
        describe("Sync", () => {
            createSyncronizeTest(create, action);
        });
    }
    if (isBroadcastable(dummy)) {
        describe("Broadcast", () => {
            createBroadcastTest(create, action);
        });
    }
    if (isSerializable(dummy)) {
        describe("Serialization", () => {
            createSerializeTest(create, action);
        });
    }
};
