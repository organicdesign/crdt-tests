# crdt-tests

Tests for CRDTs implementing `@organicdesign/crdt-interfaces`.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Tests](#tests)
  - [CRDT](#crdt)
  - [Sync](#sync)
  - [Broadcast](#broadcast)
  - [Serialize](#serialize)
  - [G-Counter](#g-counter)
  - [PN-Counter](#pn-counter)
  - [G-Set](#g-set)
  - [MV-Register](#mv-register)
  - [LWW-Register](#lww-register)
  - [LWW-Map](#lww-map)
  - [CRDT-Map](#crdt-map)
- [TODO](#todo)

## Install

```
npm i --save-dev @organicdesign/crdt-tests
```

## Usage

To use a test you just need to import the relevant test method and call it on a CRDT implementation. If you are testing against a specific CRDT (for example G-Counter) then you do not need to test against the general CRDT tests since those are included in the specific tests. The general tests are to assist with the creation of abitrary CRDTs that may not have a specific test ready for them.

Most of these tests are created for implementations that use arbitrary data types, if the implementation is for a specific data type then a specific test should also be created for it.

## Tests

### CRDT

```javascript
import { createCRDTTest } from "@organicdesign/crdt-tests";
```

This test is a general CRDT test for CRDTs conforming to the CRDT interface. This will check that functionality of it works.

### Sync

```javascript
import { createSyncTest } from "@organicdesign/crdt-tests";
```

This test checks that the synchronization functionality of a CRDT works.

### Broadcast

```javascript
import { createBroadcastTest } from "@organicdesign/crdt-tests";
```

This test checks that the broadcast functionality of a CRDT works, given that the CRDT implements this optional feature.

### Serialize

```javascript
import { createSerializeTest } from "@organicdesign/crdt-tests";
```

This test checks the the serialization functionality of a CRDT works give that the CRDT implements this optional feature.

### G-Counter

Status: **Basic**

```javascript
import { createGCounterTest } from "@organicdesign/crdt-tests";
```

This test is for a G-Counter CRDT that implements the CRDT & MCounter interfaces.

### PN-Counter

Status: **Basic**

```javascript
import { createPNCounterTest } from "@organicdesign/crdt-tests";
```

This test is for a PN-Counter CRDT that implements the CRDT & BCounter interfaces.

### G-Set

Status: **Incomplete**

```javascript
import { createGSetTest } from "@organicdesign/crdt-tests";
```

This test is for a G-Set CRDT that implements the CRDT & MSet interfaces.

### MV-Register

Status: **Incomplete**

```javascript
import { createMVRegisterTest } from "@organicdesign/crdt-tests";
```

This test is for a MV-Register CRDT that implements the CRDT & MVRegister interfaces.

### LWW-Register

Status: **Incomplete**

```javascript
import { createLWWRegisterTest } from "@organicdesign/crdt-tests";
```

This test is for a LWW-Register CRDT that implements the CRDT & BRegister interfaces.

### LWW-Map

Status: **Incomplete**

```javascript
import { createLWWMapTest } from "@organicdesign/crdt-tests";
```

This test is for a LWW-Map CRDT that implements the CRDT & BMap interfaces.

### CRDT-Map

Status: **Incomplete**

```javascript
import { createLWWMapTest } from "@organicdesign/crdt-tests";
```

This test is for a CRDT-Map CRDT that implements the CRDT & MMap interfaces.

## TODO

- [x] MV-Register generic test.
- [ ] MV-Register register specific methods tests.
- [ ] G-Set set specific methods tests.
- [ ] LWW-Register register specific methods tests.
- [ ] LWW-Map map specific methods tests.
- [ ] CRDT-Map map specific methods tests.
- [ ] MV-Register type specific tests.
- [ ] G-Counter type specific tests.
- [ ] PN-Counter type specific tests.
- [ ] G-Set type specific tests.
- [ ] LWW-Register type specific tests.
- [ ] LWW-Map type specific tests.
- [ ] CRDT-Map type specific tests.
