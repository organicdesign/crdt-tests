import { createSyncTest } from "./sync.js";
import { createSerializeTest } from "./serialize.js";
import { createBroadcastTest } from "./broadcast.js";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
export const createCRDTTest = (create, action, deserialize) => {
    describe("Sync", () => {
        createSyncTest((id) => create(id), action);
    });
    const dummy = create(uint8ArrayFromString("dummy"));
    if (dummy.addBroadcaster != null && dummy.onBroadcast != null) {
        describe("Broadcast", () => {
            createBroadcastTest((id) => create(id), action);
        });
    }
    if (dummy.serialize != null && deserialize != null) {
        describe("Serialization", () => {
            createSerializeTest((id) => create(id), action, deserialize);
        });
    }
};
