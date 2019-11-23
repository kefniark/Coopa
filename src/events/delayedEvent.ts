import { Event, Listener, Disposable, IEvent } from "./event"

/**
 * Delay event to be processed later (based on an update)
 *
 * Example: render event computed only once a frame at the end
 *
 * @export
 * @class DelayedEvent
 */
export class DelayedEvent<T> implements IEvent<T> {
	get enable() {
		return this.ouput.enable
	}
	private ouput: Event<T>
	protected queue: T[] = []
	private distinct: boolean

	constructor(event?: Event<T>, distinct = true) {
		if (event) event.on(evt => this.emit(evt))
		this.ouput = new Event<T>()
		this.distinct = distinct
	}

	clear() {
		this.queue.length = 0
		this.ouput.clear()
	}

	on(listener: Listener<T>): Disposable {
		return this.ouput.on(listener)
	}

	once(listener: Listener<T>): void {
		this.ouput.once(listener)
	}

	off(listener: Listener<T>): void {
		return this.ouput.off(listener)
	}

	update() {
		if (!this.enable) return
		for (const evt of this.queue) {
			this.ouput.emit(evt)
		}
		this.queue.length = 0
	}

	emit(event: T, force = false) {
		if (!this.enable) return
		if (force) return this.ouput.emit(event)
		if (this.distinct) {
			if (this.queue.includes(event)) return
		}
		this.queue.push(event)
	}
}
