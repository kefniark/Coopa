import { Event, IEvent, Listener, Disposable } from "./event";
import { DelayedEvent } from "./delayedEvent";
import { Logger } from "../utils/index";
export declare enum EventBusChannelType {
    Direct = "direct",
    Delayed = "delayed"
}
export interface IChannelEvent<T> extends IEvent<T> {
    readonly name: string;
    readonly logger: Logger;
}
export declare class EventBusChannelDelayed<T> extends DelayedEvent<T> implements IChannelEvent<T> {
    readonly name: string;
    readonly logger: Logger;
    readonly evt: Disposable;
    constructor(name: string);
    clear(): void;
    on(listener: Listener<T>): Disposable;
    once(listener: Listener<T>): void;
    off(listener: Listener<T>): void;
    update(): void;
    emit(event: T, force?: boolean): void;
}
export declare class EventBusChannel<T> extends Event<T> implements IChannelEvent<T> {
    readonly name: string;
    readonly logger: Logger;
    constructor(name: string);
    clear(): void;
    on(listener: Listener<T>): Disposable;
    once(listener: Listener<T>): void;
    off(listener: Listener<T>): void;
    emit(event: T): void;
}
/**
 * Event Bus is a good way to decouple components and share event without having direct dependencies
 *
 * @export
 * @class EventBus
 */
export declare class EventBus {
    static map: Map<string, IChannelEvent<any>>;
    static initialize(): void;
    static get channelNames(): string[];
    static create<T>(name: string, type?: EventBusChannelType): IChannelEvent<any>;
    static update(): void;
    static delete(name: string): void;
    static channel<T>(name: string): IChannelEvent<T>;
}
