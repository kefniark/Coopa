export interface Listener<T> {
    (event: T): any;
}
export interface Disposable {
    dispose(): void;
}
export interface IEvent<T> {
    enable: boolean;
    on(listener: Listener<T>): Disposable;
    once(listener: Listener<T>): void;
    off(listener: Listener<T>): void;
    emit(event: T): void;
    clear(): void;
}
export declare class Event<T> implements IEvent<T> {
    enable: boolean;
    private listeners;
    private listenersOncer;
    clear(): void;
    on(listener: Listener<T>): Disposable;
    once(listener: Listener<T>): void;
    off(listener: Listener<T>): void;
    emit(event: T): void;
}
