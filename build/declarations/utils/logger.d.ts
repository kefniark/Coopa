import { Event } from "./events";
export declare const enum LogLevel {
    INFO = 0,
    WARN = 1,
    ERROR = 2,
    OFF = 3
}
declare class Logger {
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
    info(...params: any[]): void;
    warn(...params: any[]): void;
    error(...params: any[]): void;
}
export declare const logger: Logger;
export {};
