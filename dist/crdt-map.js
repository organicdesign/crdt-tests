import { createCRDTTest } from "./crdt.js";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
const createDummyCRDT = () => {
    let pData = new Uint8Array([0]);
    const broadcasters = [];
    const update = (data) => {
        if (data.toString() > pData.toString()) {
            pData = data;
            return true;
        }
        return false;
    };
    return {
        id: uint8ArrayFromString("dummy"),
        action: (index) => {
            const data = new Uint8Array([index + 1]);
            update(data);
            for (const broadcast of broadcasters) {
                broadcast(data);
            }
        },
        sync: (data) => {
            if (data == null) {
                return pData;
            }
            update(data);
        },
        toValue: () => pData,
        addBroadcaster: (broadcaster) => broadcasters.push(broadcaster),
        onBroadcast: (data) => {
            update(data);
        }
    };
};
export const createCRDTMapTest = (create, deserialize) => {
    const createWithDummies = (id) => {
        const crdt = create(id);
        crdt.set("dummy1", createDummyCRDT());
        crdt.set("dummy2", createDummyCRDT());
        return crdt;
    };
    const action = (crdt, index) => {
        const name = index % 2 === 0 ? "dummy1" : "dummy2";
        const subCrdt = crdt.get(name);
        if (subCrdt == null) {
            return;
        }
        subCrdt.action(index);
    };
    createCRDTTest(createWithDummies, action, deserialize);
};
