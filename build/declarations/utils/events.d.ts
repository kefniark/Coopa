export interface Listener<T> {
    (event: T): any;
}
export interface Disposable {
    dispose(): void;
}
export declare class Event<T> {
    private listeners;
    private listenersOncer;
    on(listener: Listener<T>): Disposable;
    once(listener: Listener<T>): void;
    off(listener: Listener<T>): void;
    emit(event: T): void;
}
/**
 * Delay event to be processed later
 * Example: render event computed only once a frame at the end
 *
 * @export
 * @class DelayedEvent
 */
export declare class DelayedEvent<T> {
    private ouput;
    private queue;
    private distinct;
    constructor(event?: Event<T>, distinct?: boolean);
    on(listener: Listener<T>): Disposable;
    once(listener: Listener<T>): void;
    off(listener: Listener<T>): void;
    update(): void;
    emit(event: T, force?: boolean): void;
}
