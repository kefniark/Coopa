# HTML

## HTML / DOM manipulation

### Description
Provide simple alternative to REDOM, let you:

* Create element
* Provide `setAttr`/`setStyle`

### Usage

```ts
import { DOM } from "coopa"

const div = DOM.createElement("div")

DOM.setAttr(div, { id: "nano", class: "stuff" })
DOM.setStyle(div, { display: "none" })
```

### Improvement

For efficiency and replace need for virtual dom, it's possible to combine this simple API with:
* `Fatina` to give you ticks (update loop)
* `DelayedEvent` to queue modification on the dom

So all the change will be applied once at the end of every frame, no need for diffing mechanism or `.isDirty`

```ts
// frame execution order
var defaultUpdate = Fatina.ticker()
var afterUpdate = Fatina.ticker()
Fatina.setDefaultTicker(defaultUpdate)

// queue modification events (dont apply them immediatelly)
var rootEvent = new DelayedEvent(rootTransform.onChanged)
rootEvent.on(() => DOM.setStyle(rootDiv, rootTransform.toCSS()))
rootEvent.emit(null, true) // for initialization

// at the end of every frame, process event queue
// nothing happen if no event to apply
afterUpdate.addTick(() => rootEvent.update())
```
___

## Color

### Description

Small class to simplify conversion and generation of colors

### Usage

```ts
import { Color } from "coopa"

// create from different format
const color1 = Color.fromHSL([125, 98, 50])
const color2 = Color.fromHex(`#03FC17`)
const color3 = Color.fromRGB([3, 252, 23])
const color4 = Color.random()

// export
color1.rgb() // <- [3, 252, 23]
color1.hex() // <- #03FC17
color1.hsl() // <- [125, 98, 50]

// methods
Color.gradient(color1, color2, 16) // <- 16 Color between 2 colors
Color.palette(8, 4) // <- palette of 8 colors x 4 different luminosity level
```