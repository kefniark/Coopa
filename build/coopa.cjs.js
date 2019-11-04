// [COOPA] Build: 0.1.5 - November 4, 2019
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Provide polyfill around Date.now()
 */
const now = typeof Date.now === "function" ? Date.now : new Date().getTime;
const start = now();
/**
 * Provide polyfill around performance.now()
 */
/* istanbul ignore next */
const perf = () => {
    if (globalThis && globalThis.performance) {
        return globalThis.performance.now();
    }
    else if (globalThis.process) {
        return process.hrtime()[1];
    }
    return now() - start;
};

/// Inspired by https://basarat.gitbooks.io/typescript/docs/tips/typed-event.html
class Event {
    constructor() {
        this.listeners = [];
        this.listenersOncer = [];
    }
    on(listener) {
        this.listeners.push(listener);
        return { dispose: () => this.off(listener) };
    }
    once(listener) {
        this.listenersOncer.push(listener);
    }
    off(listener) {
        const callbackIndex = this.listeners.indexOf(listener);
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

const url = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
/**
 * Create a `uid` [a-zA-z0-9]
 *
 * @param {Number} len
 * @return {String} uid
 */
function uid(len = 8) {
    let id = "";
    while (len--) {
        id += url[(Math.random() * 62) | 0];
    }
    return id;
}

(function (LogLevel) {
    LogLevel[LogLevel["INFO"] = 0] = "INFO";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["ERROR"] = 2] = "ERROR";
    LogLevel[LogLevel["OFF"] = 3] = "OFF";
})(exports.LogLevel || (exports.LogLevel = {}));
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
        if (this.level > exports.LogLevel.INFO)
            return;
        if (this._console)
            console.info(this.prefix, ...params);
        this.eventHandler.emit([exports.LogLevel.INFO, this.prefix, ...params]);
    }
    warn(...params) {
        if (this.level > exports.LogLevel.WARN)
            return;
        if (this._console)
            console.warn(this.prefix, ...params);
        this.eventHandler.emit([exports.LogLevel.WARN, this.prefix, ...params]);
    }
    error(...params) {
        if (this.level > exports.LogLevel.ERROR)
            return;
        if (this._console)
            console.error(this.prefix, ...params);
        this.eventHandler.emit([exports.LogLevel.ERROR, this.prefix, ...params]);
    }
}
const logger = new Logger();

/**
 * Method used to create a proxy around some data an get event
 *
 * Inspired by `on-change` but simpler (https://github.com/sindresorhus/on-change/)
 *
 * @export
 * @param {*} objToWatch
 * @param {(prop: string, value?: any, previous?: any) => void} onChangeFunction
 * @returns {Proxy}
 */
function onChange(objToWatch, onChangeFunction) {
    const map = new WeakMap();
    const getRootPath = (val) => {
        const path = map.get(val) || "";
        return path ? `${path}.` : "";
    };
    const handler = {
        get(target, property, receiver) {
            const path = getRootPath(target) + property;
            const value = Reflect.get(target, property, receiver);
            if (typeof value === "object" && value !== null) {
                map.set(value, path);
                return new Proxy(value, handler);
            }
            /* istanbul ignore next */
            return value;
        },
        set(target, property, value) {
            const path = getRootPath(target) + property;
            const prev = target[property];
            if (value === prev)
                return true;
            const res = Reflect.set(target, property, value);
            onChangeFunction(path, value, prev);
            return res;
        },
        deleteProperty(target, property) {
            const path = getRootPath(target) + property;
            const prev = target[property];
            if (map.has(target))
                map.delete(target);
            const res = Reflect.deleteProperty(target, property);
            onChangeFunction(path, undefined, prev);
            return res;
        }
    };
    map.set(objToWatch, "");
    return new Proxy(objToWatch, handler);
}

class Random {
    rand() {
        return Math.random();
    }
    randBool() {
        return this.randRangeInt(0, 1) === 0;
    }
    randRangeFloat(min, max, rng) {
        if (!rng)
            rng = Math.random();
        return rng * (max - min) + min;
    }
    randRangeInt(min, max, rng) {
        if (!rng)
            rng = Math.random();
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(rng * (max - min + 1)) + min;
    }
    randArray(arr) {
        const index = this.randRangeInt(0, arr.length - 1);
        return arr[index];
    }
    createSeededRandom(seed = -1) {
        return new SeededRandom(seed);
    }
}
class SeededRandom {
    constructor(seed) {
        this.seed = seed;
    }
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280.0;
    }
    rand() {
        return this.next();
    }
    randBool() {
        return this.randRangeInt(0, 1) === 0;
    }
    randRangeFloat(min, max) {
        return rng.randRangeFloat(min, max, this.next());
    }
    randRangeInt(min, max) {
        return rng.randRangeInt(min, max, this.next());
    }
    randArray(arr) {
        const index = rng.randRangeInt(0, arr.length - 1);
        return arr[index];
    }
}
const rng = new Random();

/* istanbul ignore file */
/**
 * Common utilities
 */
// Configuration Constants
const EPSILON = 0.000001;
let ARRAY_TYPE = Array;
const RANDOM = Math.random;
const degree = Math.PI / 180;
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
function toRadian(a) {
    return a * degree;
}
function toDegree(a) {
    return a / degree;
}
/**
 * Number Equal, approximately (+-epsilon)
 *
 * @export
 * @param {number} a
 * @param {number} b
 */
function numberEqual(a, b) {
    return Math.abs(a - b) < EPSILON;
}
/**
 * Round to a certain amount of decimals
 *
 * @export
 * @param {number} value
 * @param {number} [decimals=2]
 */
function roundTo(value, decimals = 2) {
    return +value.toFixed(decimals);
}
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
function equals(a, b) {
    return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
function forEach(mat, cb) {
    for (var i = 0; i < mat.length; i++) {
        mat[i] = cb(i, mat[i]);
    }
}
if (!Math.hypot) {
    Math.hypot = function () {
        var y = 0, i = arguments.length;
        while (i--)
            y += arguments[i] * arguments[i];
        return Math.sqrt(y);
    };
}

var common = /*#__PURE__*/Object.freeze({
	__proto__: null,
	EPSILON: EPSILON,
	ARRAY_TYPE: ARRAY_TYPE,
	RANDOM: RANDOM,
	toRadian: toRadian,
	toDegree: toDegree,
	numberEqual: numberEqual,
	roundTo: roundTo,
	equals: equals,
	forEach: forEach
});

class ArrayExt {
    static createSimilar(n, val = 0) {
        return ArrayExt.create(n, () => val);
    }
    static createOrder(n, start = 1) {
        return ArrayExt.create(n, i => start + i);
    }
    static create(n, cb) {
        const res = new Array(n);
        for (var i = 0; i < n; i++) {
            res[i] = cb(i);
        }
        return res;
    }
    static isEmpty(arr) {
        if (arr.length === 0) {
            return true;
        }
        return false;
    }
    static clone(arr) {
        return arr.slice();
    }
    static first(arr) {
        return arr[0];
    }
    static last(arr) {
        return arr[arr.length - 1];
    }
    static insert(arr, index, value) {
        const array = ArrayExt.clone(arr);
        array.splice(index, 0, value);
        return array;
    }
    static removeIndex(arr, index) {
        const array = ArrayExt.clone(arr);
        array.splice(index, 1);
        return array;
    }
    static remove(arr, element) {
        return ArrayExt.clone(arr).filter(x => x !== element);
    }
    static sum(arr) {
        return arr.reduce((prev, curr) => prev + curr);
    }
    static avg(arr) {
        return ArrayExt.sum(arr) / arr.length;
    }
    static random(arr) {
        const index = Math.floor(Math.random() * (Math.floor(arr.length - 1) + 1));
        return arr[index];
    }
    static shuffle(arr) {
        return ArrayExt.clone(arr).sort(() => Math.random() - 0.5);
    }
}

class StringExt {
    static isNullOrEmpty(val) {
        if (val === undefined || val === null || val.trim() === "") {
            return true;
        }
        return false;
    }
    static capitalize(val) {
        if (val.length == 1) {
            return val.toUpperCase();
        }
        else if (val.length > 0) {
            return val.substring(0, 1).toUpperCase() + val.substring(1);
        }
        return val;
    }
    static capitalizeWords(val) {
        let regexp = /\s/;
        let words = val.split(regexp);
        if (words.length == 1) {
            return StringExt.capitalize(words[0]);
        }
        let result = "";
        for (let i = 0; i < words.length; i++) {
            if (StringExt.capitalize(words[i]) !== null) {
                result += StringExt.capitalize(words[i]) + " ";
            }
        }
        return result.trim();
    }
    static contains(val, search) {
        return val.indexOf(search) !== -1;
    }
    static slugify(val, lower = true) {
        if (lower)
            val = val.toLowerCase();
        return val.normalize().replace(/[^a-z0-9]/gi, "-");
    }
}

class ObjectExt {
    static isString(val) {
        return Object.prototype.toString.call(val) === "[object String]";
    }
    static isArray(val) {
        return Array.isArray(val);
    }
    static isNumeric(value) {
        return !isNaN(value - parseFloat(value));
    }
    static clone(obj) {
        return Object.assign({}, obj);
    }
}

const name = "Coopa";

exports.ArrayExt = ArrayExt;
exports.Event = Event;
exports.ObjectExt = ObjectExt;
exports.Random = Random;
exports.SeededRandom = SeededRandom;
exports.StringExt = StringExt;
exports.logger = logger;
exports.math = common;
exports.name = name;
exports.now = now;
exports.onChange = onChange;
exports.perf = perf;
exports.rng = rng;
exports.uid = uid;
