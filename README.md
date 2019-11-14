## Coopa

[![Build Status](https://github.com/kefniark/Coopa/workflows/Build%20CI/badge.svg)](https://github.com/kefniark/Coopa/actions)
[![NPM Version](https://img.shields.io/npm/v/coopa.svg)](https://npmjs.org/package/coopa)
[![NPM Download](https://img.shields.io/npm/dm/coopa.svg)](https://npmjs.org/package/coopa)
[![Coverage Status](https://coveralls.io/repos/github/kefniark/Coopa/badge.svg?branch=master)](https://coveralls.io/github/kefniark/Coopa?branch=master)
[![License](https://img.shields.io/npm/l/coopa.svg)](https://npmjs.org/package/coopa)

A really simple and reliable Typescript utility library compatible with Tree Shaking

Originally just for personal use, a bit tired to copy/paste code between project in a `helpers.js` or to have crazy dependencies for any basic feature.

Export with Rollup in:
* ESM: the default modern version (compatible with tree shaking)
* CommonJS: fallback for old node / tools

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

### Math

Most of the Math functions are based on [gl-matrix](https://github.com/toji/gl-matrix/):
* Matrices (Mat3, Mat4)
* Quaternions (Quat, Quat2)
* Vectors (Vec2, Vec3, Vec4)

#### Transform
Based on Mat4 with position (Vec3), rotation (Vec3), scale (Vec3)
```ts
const trans = new Transform()

// vector3
trans.position.x = 100
trans.position.y = 60
trans.position.z = 0

// quat
trans.rotation.w = Math.sqrt(0.5)
trans.rotation.z = Math.sqrt(0.5)

// vector3
trans.scale.x = 2
trans.scale.y = 2

trans.toCss() // => matrix3d(-4.440892098500626e-16, 2.0000000000000004, 0, 0, -2.0000000000000004, -4.440892098500626e-16, 0, 0, 0, 0, 1, 0, 100, 60, 0, 1)

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
