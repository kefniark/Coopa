"use strict";
/// Inspired by https://basarat.gitbooks.io/typescript/docs/tips/typed-event.html
Object.defineProperty(exports, "__esModule", { value: true });
class Event {
    constructor() {
        this.listeners = [];
        this.listenersOncer = [];
    }
    on(listener) {
        this.listeners.push(listener);
        return {
            dispose: () => this.off(listener)
        };
    }
    once(listener) {
        this.listenersOncer.push(listener);
    }
    off(listener) {
        var callbackIndex = this.listeners.indexOf(listener);
        if (callbackIndex > -1)
            this.listeners.splice(callbackIndex, 1);
    }
    emit(event) {
        /** Update any general listeners */
        this.listeners.forEach(listener => listener(event));
        /** Clear the `once` queue */
        if (this.listenersOncer.length > 0) {
            const toCall = this.listenersOncer;
            this.listenersOncer = [];
            toCall.forEach(listener => listener(event));
        }
    }
}
exports.Event = Event;
//# sourceMappingURL=events.js.map