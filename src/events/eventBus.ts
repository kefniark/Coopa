/* eslint @typescript-eslint/no-use-before-define: 0 */

import { Event, IEvent, Listener, Disposable } from "./event"
import { DelayedEvent } from "./delayedEvent"
import { Logger, logger } from "../utils/index"

const updateLoopChannel = "_updateLoop"
export enum EventBusChannelType {
	Direct = "direct",
	Delayed = "delayed"
}

export interface IChannelEvent<T> extends IEvent<T> {
	readonly name: string
	readonly logger: Logger
}

export class EventBusChannelDelayed<T> extends DelayedEvent<T> implements IChannelEvent<T> {
	readonly name: string
	readonly logger: Logger
	readonly evt: Disposable

	constructor(name: string) {
		super()
		this.name = name
		this.logger = new Logger()
		this.logger.prefix = `[EventBus: ${name}]`
		this.logger.debug("Create EventBus Channel Delayed")
		this.evt = EventBus.channel(updateLoopChannel).on(() => this.update())
	}

	clear() {
		this.logger.debug(`Delete EventBus Channel`)
		this.evt.dispose()
		super.clear()
	}

	on(listener: Listener<T>): Disposable {
		this.logger.debug(`Add Listener ${listener}`)
		return super.on(listener)
	}

	once(listener: Listener<T>): void {
		this.logger.debug(`Add OnceListener ${listener}`)
		super.once(listener)
	}

	off(listener: Listener<T>): void {
		this.logger.debug(`Remove Listener ${listener}`)
		super.off(listener)
	}

	update() {
		if (!this.enable) return
		for (const event of this.queue) {
			this.logger.debug(`UpdateLoop: Emit event ${event}`)
		}
		super.update()
	}

	emit(event: T, force = false) {
		if (!this.enable) return
		this.logger.debug(`Queue Emit event ${event}`)
		super.emit(event, force)
	}
}

export class EventBusChannel<T> extends Event<T> implements IChannelEvent<T> {
	readonly name: string
	readonly logger: Logger

	constructor(name: string) {
		super()
		this.name = name
		this.logger = new Logger()
		this.logger.prefix = `[EventBus: ${name}]`
		this.logger.debug("Create EventBus Channel")
	}

	clear() {
		this.logger.debug(`Delete EventBus Channel`)
		super.clear()
	}

	on(listener: Listener<T>): Disposable {
		this.logger.debug(`Add Listener ${listener}`)
		return super.on(listener)
	}

	once(listener: Listener<T>): void {
		this.logger.debug(`Add OnceListener ${listener}`)
		super.once(listener)
	}

	off(listener: Listener<T>): void {
		this.logger.debug(`Remove Listener ${listener}`)
		super.off(listener)
	}

	emit(event: T) {
		if (!this.enable) return
		this.logger.debug(`Emit event ${event}`)
		super.emit(event)
	}
}

/**
 * Event Bus is a good way to decouple components and share event without having direct dependencies
 *
 * @export
 * @class EventBus
 */
export class EventBus {
	static map: Map<string, IChannelEvent<any>>

	static initialize() {
		if (this.map) return
		this.map = new Map<string, IChannelEvent<any>>()
		this.create(updateLoopChannel)
	}

	static get channelNames() {
		this.initialize()
		return Array.from(this.map.keys())
	}

	static create<T>(name: string, type = EventBusChannelType.Direct) {
		this.initialize()
		const chan = this.map.get(name)
		if (chan) {
			logger.warn("channel already exist", name)
			return chan
		}
		let newChan: IChannelEvent<T>
		switch (type) {
			case EventBusChannelType.Direct:
				newChan = new EventBusChannel<T>(name)
				break
			case EventBusChannelType.Delayed:
				newChan = new EventBusChannelDelayed<T>(name)
				break
			default:
				throw new Error("unknown type of event bus")
		}

		this.map.set(name, newChan)
		return newChan
	}

	static update() {
		this.initialize()
		this.channel(updateLoopChannel).emit(0)
	}

	static delete(name: string) {
		this.initialize()
		const chan = this.map.get(name)
		if (!chan) return
		chan.clear()
		this.map.delete(name)
	}

	static channel<T>(name: string) {
		this.initialize()
		if (!this.map.has(name)) throw new Error("Unknown bus channel : " + name)
		return this.map.get(name) as IChannelEvent<T>
	}
}
