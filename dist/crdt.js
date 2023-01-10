import { createSyncTest } from "./sync.js";
import { createSerializeTest } from "./serialize.js";
import { createBroadcastTest } from "./broadcast.js";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
export const createCRDTTest = (create, action) => {
    describe("Sync", () => {
        createSyncTest(create, action);
    });
    const dummy = create({ id: uint8ArrayFromString("dummy") });
    if (dummy.addBroadcaster != null && dummy.onBroadcast != null) {
        describe("Broadcast", () => {
            createBroadcastTest(create, action);
        });
    }
    if (dummy.serialize != null && dummy.deserialize != null) {
        describe("Serialization", () => {
            createSerializeTest(create, action);
        });
    }
};
