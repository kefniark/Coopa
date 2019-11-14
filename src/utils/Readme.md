
### Typed Events
```ts
import { Event } from "coopa"

const event = new Event<string>()
event.on(() => console.log('my event is called'))
event.emit('message')
```
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

### OnChange
```ts
import { onChange } from "coopa"

const data = { a: 2, c: 4 }
const proxy = onChange(data, (prop, value) => console.log(`Property changed ${prop} = ${value}`))

proxy.b = { a: 1, b: 2} // Add: Property changed `b` = { a: 1, b: 2 }
proxy.a = 5 // Set: Property changed `a` = 5
proxy.b.a = 5 // Set Chield: Property changed `b.a` = 5
delete proxy.b // Delete: Property changed `b`
```

### Date
```ts
import { perf, now } from "coopa"

now() // like Date.now() with polyfill required
perf() // like performance.now() with polyfill required
```