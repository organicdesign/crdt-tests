var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { syncCrdts } from "./utils.js";
export const createSyncronizeTest = (create, action, instanceCount) => {
    if (instanceCount == null) {
        instanceCount = 20;
    }
    const name = create({ id: uint8ArrayFromString("dummy") }).constructor.name;
    const runSyncTest = (count) => __awaiter(void 0, void 0, void 0, function* () {
        const crdts = [];
        for (let i = 1; i <= count; i++) {
            crdts.push(create({ id: uint8ArrayFromString(`test-${i}`) }));
        }
        yield Promise.all(crdts.map(c => c.start()));
        for (const [i, crdt] of crdts.entries()) {
            action(crdt, i);
        }
        const transfer = syncCrdts(crdts);
        const result = crdts[0].toValue();
        for (const crdt of crdts) {
            expect(crdt.toValue()).toStrictEqual(result);
        }
        console.info(`Synced ${count} ${name}s in ${transfer} bytes.`);
    });
    it(`Syncs 2 ${name}s`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield runSyncTest(2);
    }));
    it(`Syncs ${instanceCount} ${name}s`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield runSyncTest(20);
    }));
};
