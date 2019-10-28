## Coopa

[![NPM Version](https://img.shields.io/npm/v/coopa.svg)](https://npmjs.org/package/coopa)
[![NPM Download](https://img.shields.io/npm/dm/coopa.svg)](https://npmjs.org/package/coopa)
[![Build Status](https://travis-ci.org/kefniark/Coopa.svg?branch=master)](https://travis-ci.org/kefniark/Coopa)
[![Coverage Status](https://coveralls.io/repos/github/kefniark/Coopa/badge.svg?branch=master)](https://coveralls.io/github/kefniark/Coopa?branch=master)
[![License](https://img.shields.io/npm/l/coopa.svg)](https://npmjs.org/package/coopa)

A really simple and reliable Typescript utility library compatible with Tree Shaking

Originally just for personal use, a bit tired to copy/paste code between project in a `helpers.js` or to have crazy dependencies for any basic feature.

___
## API

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

### Math

#### Vector2
```ts
import { Vector2 } from "coopa"

const vec = new Vector2(2, 4)
vec.set(1, 6)
vec.add(new Vector(5, 5))
vec.clone().normalize()
```

___
### And few extension utility

#### Check
```ts
isString(val: any): boolean
isArray(val: any): boolean
isNumeric(val: any): boolean
isObjectEmpty(val: any): boolean
clone(val: T): T
```

#### Date
```ts
import { perf, now } from "coopa"

now() // like Date.now() with polyfill required
perf() // like performance.now() with polyfill required
```


#### Array
```ts
Array.clone()
Array.isEmpty()
Array.first()
Array.last()
Array.insert(index: number, element: T)
Array.removeIndex(index: number)
Array.remove(element: T)
Array.shuffle()
Array.random()
Array.sum()
Array.avg()
```

#### String
```ts
String.capitalize()
String.capitalizeWords()
String.contains(val: string)
String.slugify(lower?: boolean)
```
