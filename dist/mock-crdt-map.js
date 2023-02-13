import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { mockCRDT } from "./mock-crdt.js";
let instanceCount = 0;
export const mockCRDTMap = (createSynchronizer) => {
    let started = false;
    const data = new Map();
    const id = uint8ArrayFromString(`mock-crdt-map-${instanceCount}`);
    const crdtCount = 3;
    for (let i = 0; i < crdtCount; i++) {
        data.set(`crdt-${i}`, mockCRDT());
    }
    const synchronizers = [createSynchronizer({
            keys: () => data.keys(),
            get: (key) => data.get(key),
            getId: () => id
        })];
    return {
        id,
        isStarted() {
            return started;
        },
        start() {
            started = true;
        },
        stop() {
            started = false;
        },
        action: (index) => {
            var _a;
            (_a = data.get(`crdt-${index % crdtCount}`)) === null || _a === void 0 ? void 0 : _a.action(index);
        },
        getSynchronizers() {
            return synchronizers;
        },
        toValue: () => {
            const map = new Map();
            for (const [key, value] of data.entries()) {
                map.set(key, value.toValue());
            }
            return map;
        }
    };
};
