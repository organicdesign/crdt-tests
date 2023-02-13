var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jest } from "@jest/globals";
import { getBroadcasterProtocols, getBroadcaster } from "@organicdesign/crdt-interfaces";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
export const createBroadcastTest = (create, action, instanceCount) => {
    if (instanceCount == null) {
        instanceCount = 20;
    }
    const name = create({ id: uint8ArrayFromString("dummy") }).constructor.name;
    const runBroadcastTest = (count) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const crdts = [];
        let transfer = 0;
        const createBroadcast = (crdt) => (data) => {
            var _a;
            transfer += data.length;
            for (const rCrdt of crdts) {
                // Don't broadcast to self.
                if (rCrdt === crdt) {
                    continue;
                }
                for (const protocol of getBroadcasterProtocols(rCrdt)) {
                    (_a = getBroadcaster(rCrdt, protocol)) === null || _a === void 0 ? void 0 : _a.onBroadcast(data);
                }
            }
        };
        for (let i = 1; i <= count; i++) {
            const crdt = create({ id: uint8ArrayFromString(`test-${i}`) });
            yield crdt.start();
            for (const protocol of getBroadcasterProtocols(crdt)) {
                (_a = getBroadcaster(crdt, protocol)) === null || _a === void 0 ? void 0 : _a.setBroadcast(createBroadcast(crdt));
            }
            crdts.push(crdt);
        }
        for (let i = 0; i < crdts.length; i++) {
            action(crdts[i], i);
        }
        const value = crdts[0].toValue();
        for (const crdt of crdts) {
            expect(crdt.toValue()).toStrictEqual(value);
        }
        console.info(`Synced ${count} ${name}s over broadcast in ${transfer} bytes.`);
    });
    it("Broadcasts every time an action is made", () => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const broadcast = jest.fn();
        const crdt = create({ id: uint8ArrayFromString("test") });
        const times = 5;
        yield crdt.start();
        for (const protocol of getBroadcasterProtocols(crdt)) {
            (_b = getBroadcaster(crdt, protocol)) === null || _b === void 0 ? void 0 : _b.setBroadcast(broadcast);
        }
        for (let i = 0; i < times; i++) {
            action(crdt, i);
        }
        expect(broadcast).toBeCalledTimes(times);
    }));
    it(`Syncs 2 ${name}s over broadcast`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield runBroadcastTest(2);
    }));
    it(`Syncs ${instanceCount} ${name}s over broadcast`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield runBroadcastTest(instanceCount);
    }));
};
