import { Event } from "../events/event";
export declare const enum LogLevel {
    DEBUG = -1,
    INFO = 0,
    WARN = 1,
    ERROR = 2,
    OFF = 3
}
export declare class Logger {
    private eventHandler;
    get events(): Event<any>;
    private _prefix;
    get prefix(): string;
    set prefix(val: string);
    private _level;
    get level(): LogLevel;
    set level(val: LogLevel);
    private _console;
    get console(): boolean;
    set console(val: boolean);
    debug(...params: any[]): void;
    info(...params: any[]): void;
    warn(...params: any[]): void;
    error(...params: any[]): void;
}
export declare const logger: Logger;
