import { Event } from "../events/event"

export const enum LogLevel {
	DEBUG = -1,
	INFO = 0,
	WARN = 1,
	ERROR = 2,
	OFF = 3
}

export class Logger {
	private eventHandler = new Event<any>()
	get events() {
		return this.eventHandler
	}

	private _prefix = ""
	get prefix() {
		return this._prefix
	}
	set prefix(val: string) {
		this._prefix = val
	}

	private _level = 0
	get level() {
		return this._level
	}
	set level(val: LogLevel) {
		this._level = val
	}

	private _console = true
	get console() {
		return this._console
	}
	set console(val: boolean) {
		this._console = val
	}

	public debug(...params: any[]) {
		if (this.level > LogLevel.DEBUG) return
		if (this._console) console.debug(this.prefix, ...params)
		this.eventHandler.emit([LogLevel.DEBUG, this.prefix, ...params])
	}

	public info(...params: any[]) {
		if (this.level > LogLevel.INFO) return
		if (this._console) console.info(this.prefix, ...params)
		this.eventHandler.emit([LogLevel.INFO, this.prefix, ...params])
	}

	public warn(...params: any[]) {
		if (this.level > LogLevel.WARN) return
		if (this._console) console.warn(this.prefix, ...params)
		this.eventHandler.emit([LogLevel.WARN, this.prefix, ...params])
	}

	public error(...params: any[]) {
		if (this.level > LogLevel.ERROR) return
		if (this._console) console.error(this.prefix, ...params)
		this.eventHandler.emit([LogLevel.ERROR, this.prefix, ...params])
	}
}

export const logger = new Logger()
