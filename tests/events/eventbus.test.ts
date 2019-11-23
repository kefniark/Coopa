/// <reference types="jest" />
import { EventBus, LogLevel, EventBusChannelType, EventBusChannelDelayed } from "../../src"

test("Direct Channel", () => {
	EventBus.create("test")

	const channel = EventBus.channel<string>("test")
	channel.logger.level = LogLevel.INFO
	channel.on(param => console.log("on", param))
	const evt = channel.on(param => console.log("will dispose", param))
	channel.once(param => console.log("once", param))

	channel.emit("tuna")
	channel.emit("tuna")

	evt.dispose()
	channel.emit("salmon")
	channel.emit("tuna")

	EventBus.delete("test")

	// this event is ignored
	channel.emit("tuna")
})

test("Delayed Channel", () => {
	EventBus.create("delayed", EventBusChannelType.Delayed)

	const evtHandler = (param: string) => console.log("on", param)
	const channel = EventBus.channel<string>("delayed")
	channel.logger.level = LogLevel.DEBUG
	channel.on(param => console.log("on", param))
	channel.on(evtHandler)
	channel.once(param => console.log("once", param))

	channel.emit("tuna")
	channel.emit("tuna")
	channel.off(evtHandler)
	channel.emit("salmon")
	channel.emit("tuna")

	EventBus.update()

	EventBus.delete("delayed")

	EventBus.update()

	const a = channel as EventBusChannelDelayed<string>
	a.update()
	a.emit("tuna", true)

	// this event is ignored
	channel.emit("tuna")
})

test("Error", () => {
	expect(() => EventBus.create("delayed", "stuff" as any)).toThrowError()
	expect(() => EventBus.channel("non existing channel")).toThrowError()

	EventBus.create("test")
	EventBus.create("test")

	expect(EventBus.channelNames).toEqual(["_updateLoop", "test"])

	EventBus.delete("test")
	EventBus.delete("test2")

	expect(EventBus.channelNames).toEqual(["_updateLoop"])
})
