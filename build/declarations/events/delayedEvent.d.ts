import { Event, Listener, Disposable, IEvent } from "./event";
/**
 * Delay event to be processed later (based on an update)
 *
 * Example: render event computed only once a frame at the end
 *
 * @export
 * @class DelayedEvent
 */
export declare class DelayedEvent<T> implements IEvent<T> {
    get enable(): boolean;
    private ouput;
    protected queue: T[];
    private distinct;
    constructor(event?: Event<T>, distinct?: boolean);
    clear(): void;
    on(listener: Listener<T>): Disposable;
    once(listener: Listener<T>): void;
    off(listener: Listener<T>): void;
    update(): void;
    emit(event: T, force?: boolean): void;
}
