/// <reference types="jest" />
import { Event } from "../src/events"

test("Basic", () => {
	const event = new Event<number>()

	const listener = jest.fn()
	event.on(listener)

	event.emit(1)
	event.emit(2)
	event.emit(3)

	event.off(listener)

	event.emit(4)

	expect(listener).toHaveBeenCalledTimes(3)
})

test("Multiple listener", () => {
	const event = new Event<number>()

	const listener1 = jest.fn()
	const listener2 = jest.fn()
	event.on(listener1)
	event.on(listener2)

	event.emit(1)
	event.emit(2)
	event.emit(3)

	expect(listener1).toHaveBeenCalledTimes(3)
	expect(listener2).toHaveBeenCalledTimes(3)
})

test("Once listener", () => {
	const event = new Event<number>()

	const listener = jest.fn()
	event.once(listener)

	event.emit(1)
	event.emit(2)
	event.emit(3)

	expect(listener).toHaveBeenCalledTimes(1)
})
