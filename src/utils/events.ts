/// Inspired by https://basarat.gitbooks.io/typescript/docs/tips/typed-event.html

export interface Listener<T> {
	(event: T): any
}

export interface Disposable {
	dispose(): void
}

export class Event<T> {
	private listeners: Listener<T>[] = []
	private listenersOncer: Listener<T>[] = []

	on(listener: Listener<T>): Disposable {
		this.listeners.push(listener)
		return { dispose: () => this.off(listener) }
	}

	once(listener: Listener<T>): void {
		this.listenersOncer.push(listener)
	}

	off(listener: Listener<T>): void {
		const callbackIndex = this.listeners.indexOf(listener)
		if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1)
	}

	emit(event: T) {
		/** Update any general listeners */
		this.listeners.forEach(listener => listener(event))

		/** Clear the `once` queue */
		if (this.listenersOncer.length > 0) {
			const toCall = this.listenersOncer
			this.listenersOncer = []
			toCall.forEach(listener => listener(event))
		}
	}
}

/**
 * Delay event to be processed later
 * Example: render event computed only once a frame at the end
 *
 * @export
 * @class DelayedEvent
 */
export class DelayedEvent<T> {
	private ouput: Event<T>
	private queue: T[] = []
	private distinct: boolean

	constructor(event?: Event<T>, distinct = true) {
		if (event) event.on(evt => this.emit(evt))
		this.ouput = new Event<T>()
		this.distinct = distinct
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
		for (const evt of this.queue) {
			this.ouput.emit(evt)
		}
		this.queue.length = 0
	}

	emit(event: T, force = false) {
		if (force) return this.ouput.emit(event)
		if (this.distinct) {
			if (this.queue.includes(event)) return
		}
		this.queue.push(event)
	}
}
