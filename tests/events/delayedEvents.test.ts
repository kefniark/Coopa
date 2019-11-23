/// <reference types="jest" />
import { Event, DelayedEvent } from "../../src"

test("Delay event", () => {
	const delayed = new DelayedEvent()
	const listener = jest.fn()

	delayed.on(listener)

	delayed.emit(1)
	delayed.emit(2)
	delayed.emit(3)

	expect(listener).not.toBeCalled()

	delayed.update()
	delayed.update()

	expect(listener).toHaveBeenCalledTimes(3)
})

test("Delay event distinct", () => {
	const event = new Event<number>()

	const delayedDistinct = new DelayedEvent(event, true)
	const delayedNotDistinct = new DelayedEvent(event, false)
	const listenerDistinct = jest.fn()
	const listenerNotDistinct = jest.fn()

	delayedDistinct.on(listenerDistinct)
	delayedNotDistinct.on(listenerNotDistinct)

	event.emit(1)
	event.emit(2)
	event.emit(1)

	expect(listenerDistinct).not.toBeCalled()

	delayedDistinct.update()
	delayedNotDistinct.update()

	delayedDistinct.off(listenerDistinct)
	delayedDistinct.off(listenerDistinct)
	event.emit(5)
	delayedDistinct.update()

	expect(listenerDistinct).toHaveBeenCalledTimes(2)
	expect(listenerNotDistinct).toHaveBeenCalledTimes(3)

	delayedNotDistinct.emit(1, true)
	expect(listenerNotDistinct).toHaveBeenCalledTimes(4)
})

test("Delay event - once", () => {
	const event = new Event<number>()

	const delayed = new DelayedEvent(event)
	const listener = jest.fn()

	delayed.once(listener)

	event.emit(1)
	event.emit(2)
	event.emit(3)

	expect(listener).not.toBeCalled()

	delayed.update()

	expect(listener).toHaveBeenCalledTimes(1)
})

test("Delay event - check clear event", () => {
	const event = new Event<number>()

	const delayed = new DelayedEvent(event)
	const listener = jest.fn()
	const listener2 = jest.fn()

	delayed.once(listener)
	event.on(listener2)

	event.emit(1)
	event.emit(2)

	delayed.clear()

	delayed.update()
	delayed.emit(3)

	expect(listener).not.toBeCalled()

	event.clear()
	event.emit(1)

	expect(listener2).toBeCalledTimes(2)
})
