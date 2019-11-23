/// Inspired by https://basarat.gitbooks.io/typescript/docs/tips/typed-event.html
/* eslint @typescript-eslint/no-inferrable-types: 0 */

export interface Listener<T> {
	(event: T): any
}

export interface Disposable {
	dispose(): void
}

export interface IEvent<T> {
	enable: boolean
	on(listener: Listener<T>): Disposable
	once(listener: Listener<T>): void
	off(listener: Listener<T>): void
	emit(event: T): void
	clear(): void
}

export class Event<T> implements IEvent<T> {
	enable: boolean = true
	private listeners: Listener<T>[] = []
	private listenersOncer: Listener<T>[] = []

	clear() {
		this.enable = false
		this.listeners.length = 0
		this.listenersOncer.length = 0
	}

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
		if (!this.enable) return

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
