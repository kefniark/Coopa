import { Event } from "./events";
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["INFO"] = 0] = "INFO";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["ERROR"] = 2] = "ERROR";
    LogLevel[LogLevel["OFF"] = 3] = "OFF";
})(LogLevel || (LogLevel = {}));
class Logger {
    constructor() {
        this.eventHandler = new Event();
        this._prefix = "";
        this._level = 0;
        this._console = true;
    }
    get events() {
        return this.eventHandler;
    }
    get prefix() {
        return this._prefix;
    }
    set prefix(val) {
        this._prefix = val;
    }
    get level() {
        return this._level;
    }
    set level(val) {
        this._level = val;
    }
    get console() {
        return this._console;
    }
    set console(val) {
        this._console = val;
    }
    info(...params) {
        if (this.level > LogLevel.INFO)
            return;
        if (this._console)
            console.info(this.prefix, ...params);
        this.eventHandler.emit([LogLevel.INFO, this.prefix, ...params]);
    }
    warn(...params) {
        if (this.level > LogLevel.WARN)
            return;
        if (this._console)
            console.warn(this.prefix, ...params);
        this.eventHandler.emit([LogLevel.WARN, this.prefix, ...params]);
    }
    error(...params) {
        if (this.level > LogLevel.ERROR)
            return;
        if (this._console)
            console.error(this.prefix, ...params);
        this.eventHandler.emit([LogLevel.ERROR, this.prefix, ...params]);
    }
}
export const logger = new Logger();
