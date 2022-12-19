let genSyncId = (() => {
    let id = 0;
    return () => id++;
})();
export const syncCrdt = (crdt1, crdt2) => {
    const syncId = genSyncId();
    let data = crdt1.sync(undefined, { id: crdt2.id, syncId });
    let i = 0;
    let transfer = 0;
    while (data != null) {
        if (i > 100) {
            throw new Error("Infinite sync loop detected.");
        }
        transfer += data.length;
        const response = crdt2.sync(data, { id: crdt1.id, syncId });
        if (response == null) {
            break;
        }
        transfer += response.length;
        data = crdt1.sync(response, { id: crdt2.id, syncId });
        i++;
    }
    return transfer;
};
export const syncCrdts = (crdts) => {
    let transfer = 0;
    for (const crdt1 of crdts) {
        for (const crdt2 of crdts) {
            if (crdt1 === crdt2) {
                continue;
            }
            transfer += syncCrdt(crdt1, crdt2);
        }
    }
    return transfer;
};
