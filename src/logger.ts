import { Event } from "./events"

export enum LogLevel {
	INFO = 0,
	WARN = 1,
	ERROR = 2,
	OFF = 3
}

class Logger {
	private eventHandler = new Event<any>()
	get events() {
		return this.eventHandler
	}

	private _prefix: string = ""
	get prefix() {
		return this._prefix
	}
	set prefix(val: string) {
		this._prefix = val
	}

	private _level: number = 0
	get level() {
		return this._level
	}
	set level(val: LogLevel) {
		this._level = val
	}

	private _console: boolean = true
	get console() {
		return this._console
	}
	set console(val: boolean) {
		this._console = val
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
