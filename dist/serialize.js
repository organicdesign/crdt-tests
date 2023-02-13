var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getSerializer, getSerializerProtocols } from "@organicdesign/crdt-interfaces";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
export const createSerializeTest = (create, action) => {
    const name = create({ id: uint8ArrayFromString("dummy") }).constructor.name;
    const getSerializers = (crdts) => {
        const protocols = [
            ...new Set(crdts.map(c => getSerializerProtocols(c)).reduce((p, c) => [...c, ...p], [])).values()
        ];
        if (protocols.length === 0) {
            throw new Error("no common synchronize protocols");
        }
        return crdts.map(c => getSerializer(c, protocols[0])).filter(s => s != null);
    };
    it(`Serializes an empty ${name} to Uint8Array`, () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const crdt = create({ id: uint8ArrayFromString("test") });
        yield crdt.start();
        const data = (_a = [...crdt.getSerializers()][0]) === null || _a === void 0 ? void 0 : _a.serialize();
        expect(data).toBeInstanceOf(Uint8Array);
    }));
    it(`Serializes a modified ${name} to Uint8Array`, () => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const crdt = create({ id: uint8ArrayFromString("test") });
        yield crdt.start();
        action(crdt, 0);
        const data = (_b = [...crdt.getSerializers()][0]) === null || _b === void 0 ? void 0 : _b.serialize();
        expect(data).toBeInstanceOf(Uint8Array);
    }));
    it(`Deserializes an empty ${name}`, () => __awaiter(void 0, void 0, void 0, function* () {
        const crdt1 = create({ id: uint8ArrayFromString("test") });
        const crdt2 = create({ id: uint8ArrayFromString("test2") });
        yield crdt1.start();
        yield crdt2.start();
        const [serializer1, serializer2] = getSerializers([crdt1, crdt2]);
        if (serializer1 == null || serializer2 == null) {
            throw new Error("error getting synchronizer protocol");
        }
        serializer2.deserialize(serializer1.serialize());
        expect(crdt1.toValue()).toStrictEqual(crdt2.toValue());
    }));
    it(`Deserializes a modified ${name}`, () => __awaiter(void 0, void 0, void 0, function* () {
        const crdt1 = create({ id: uint8ArrayFromString("test") });
        const crdt2 = create({ id: uint8ArrayFromString("test2") });
        yield crdt1.start();
        yield crdt2.start();
        action(crdt1, 0);
        const [serializer1, serializer2] = getSerializers([crdt1, crdt2]);
        const data = serializer1.serialize();
        serializer2.deserialize(data);
        expect(crdt1.toValue()).toStrictEqual(crdt2.toValue());
        console.info(`Serialized a ${name} in ${data.length} bytes.`);
    }));
};
