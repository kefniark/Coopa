# Events

## Typed Events

Simple event handler class that can be used on any object to expose event

```ts
import { Event } from "coopa"

const event = new Event<string>()
event.on(() => console.log('my event is called'))
event.emit('message')
```

## Delayed Events

Extension of Typed Event which queue events for a certain time, and really emit them based on a tick.

```ts
import { DelayedEvent } from "coopa"

const delayed = new DelayedEvent()
event.on(() => console.log('my event is called'))
event.emit('message')

// at this point the event is queued but not really emited

delayed.update() // <= this will emit all the events queued
```

## Event Bus

Simple Typed EventBus Implementation which allow to decouple components and provide a global bus of events

```ts
import { EventBus } from "coopa"

EventBus.create<string>("test") // <= create a channel

// it's highly recommended to use enums for channel name
const channel = EventBus.channel<string>("test")
channel.on(param => console.log(`received event ${param}`))
channel.once(param => console.log(`received event ${param} once`))

channel.emit("tuna")
channel.emit("salmon")
```

Event bus support also delayed channel
```ts
import { EventBus, EventBusChannelType } from "coopa"

// event bus can also have delayed channel (just be sure you tick the eventbus)
EventBus.create<string>("test2", EventBusChannelType.Delayed)
const channelDelayed = EventBus.channel<string>("test2")
channelDelayed.on(param => console.log(`received delayed event ${param}`))

channel.emit("tuna")
channel.emit("tuna") // <= these events are queued

EventBus.update() // <= this update event will emit really events
```

And for debug purpose, EventBus can show some per channel debug
```ts
const channel = EventBus.channel<string>("test")
channel.logger.level = LogLevel.DEBUG
```

## Object OnChange

Helper which create an ES6 proxy around object and allow to catch their mutation

```ts
import { onChange } from "coopa"

const data = { a: 2, c: 4 }
const proxy = onChange(data, (prop, value) => console.log(`Property changed ${prop} = ${value}`))

proxy.b = { a: 1, b: 2} // Add: Property changed `b` = { a: 1, b: 2 }
proxy.a = 5 // Set: Property changed `a` = 5
proxy.b.a = 5 // Set Chield: Property changed `b.a` = 5
delete proxy.b // Delete: Property changed `b`
```