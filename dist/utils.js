export const syncCrdt = (crdt1, crdt2) => {
    let data = crdt1.sync();
    let i = 0;
    while (data != null) {
        if (i > 100) {
            throw new Error("Infinite sync loop detected.");
        }
        const response = crdt2.sync(data);
        if (response == null) {
            break;
        }
        data = crdt1.sync(response);
        i++;
    }
};
export const syncCrdts = (crdts) => {
    for (const crdt1 of crdts) {
        for (const crdt2 of crdts) {
            if (crdt1 === crdt2) {
                continue;
            }
            syncCrdt(crdt1, crdt2);
        }
    }
};