## Utils

### Id
```ts
import { uid } from "coopa"

const id = uid() // generate a unique id
const id = uid(16) // its possible to change the length
```
### Random

##### Usual
```ts
import { rng } from "coopa"

rng.rand()
rng.randBool()
rng.randRangeFloat(0, 5)
rng.randRangeInt(0, 5)
```

##### Seeded Random
```ts
import { rng } from "coopa"

const seeded = rng.createSeededRandom(5) // use any seed
seeded.rand()
seeded.randBool()
seeded.randRangeFloat(0, 5)
seeded.randRangeInt(0, 5)
```

### Logger
```ts
import { logger, LogLevel } from "coopa"

logger.level = LogLevel.WARN
logger.prefix = "[MyLibrary]"
logger.info("lol")
logger.warn("warn", { a: 1 })
logger.error("error", { a: 2 })
```

### Date
```ts
import { perf, now } from "coopa"

now() // like Date.now() with polyfill required
perf() // like performance.now() with polyfill required
```