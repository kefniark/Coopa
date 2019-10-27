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
