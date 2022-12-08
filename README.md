# crdt-tests

Tests for CRDTs implementing crdt-interfaces.

## Usage

To use a test you jsut need to import the apropriate test method and call it on a CRDT implementation. If you are testing against a specific CRDT (for example G-Counter) then you do not need to test against the general CRDT tests since those are included in the specific tests. The general tests are to assist with the creation of abitrary CRDTs that may not have a specific test ready for them.

## Tests

### CRDT

```javascript
import { createCRDTTest } from "crdt-tests";
```

This test is a general CRDT test for CRDTs conforming to the CRDT interface. This will check that functionality of it works.

### Sync

```javascript
import { createSyncTest } from "crdt-tests";
```

This test checks that the synchronization functionality of a CRDT works.

### Broadcast

```javascript
import { createBroadcastTest } from "crdt-tests";
```

This test checks that the broadcast functionality of a CRDT works, given that the CRDT implements this optional feature.

### Serialize

```javascript
import { createSerializeTest } from "crdt-tests";
```

This test checks the the serialization functionality of a CRDT works give that the CRDT implements this optional feature.

### G-Counter

```javascript
import { createGCounterTest } from "crdt-tests";
```

This test is for a G-Counter CRDT that implements the CRDT & MCounter interfaces.

### PN-Counter

```javascript
import { createPNCounterTest } from "crdt-tests";
```

This test is for a PN-Counter CRDT that implements the CRDT & BCounter interfaces.

### G-Set

```javascript
import { createGSetTest } from "crdt-tests";
```

This test is for a G-Set CRDT that implements the CRDT & MSet interfaces.

### LWW-Register

```javascript
import { createLWWRegisterTest } from "crdt-tests";
```

This test is for a LWW-Register CRDT that implements the CRDT & Register interfaces.

### LWW-Map

```javascript
import { createLWWMapTest } from "crdt-tests";
```

This test is for a LWW-Map CRDT that implements the CRDT & BMap interfaces.

### CRDT-Map

```javascript
import { createLWWMapTest } from "crdt-tests";
```

This test is for a CRDT-Map CRDT that implements the CRDT & MMap interfaces.
