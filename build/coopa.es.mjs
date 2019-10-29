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

const url = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
/**
 * Create a `uid` [a-zA-z0-9]
 *
 * @param {Number} len
 * @return {String} uid
 */
function uid(len = 8) {
    var id = "";
    while (len--) {
        id += url[(Math.random() * 62) | 0];
    }
    return id;
}

var LogLevel;
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
const logger = new Logger();

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

function isString(val) {
    return Object.prototype.toString.call(val) === "[object String]";
}
function isArray(val) {
    return Array.isArray(val);
}
function isNumeric(value) {
    return !isNaN(value - parseFloat(value));
}
function isObjectEmpty(obj) {
    if (!obj || typeof obj !== "object")
        return true;
    for (var a in obj)
        if (obj.hasOwnProperty(a))
            return false;
    return true;
}
function clone(obj) {
    return Object.assign({}, obj);
}

class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    add(vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }
    subtract(vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }
    scale(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }
    dot(vector) {
        return this.x * vector.x + this.y + vector.y;
    }
    moveTowards(vector, t) {
        t = Math.min(t, 1);
        const diff = vector.subtract(this);
        return this.add(diff.scale(t));
    }
    magnitude() {
        return Math.sqrt(this.magnitudeSqr());
    }
    magnitudeSqr() {
        return this.x * this.x + this.y * this.y;
    }
    distance(vector) {
        return Math.sqrt(this.distanceSqr(vector));
    }
    distanceSqr(vector) {
        const deltaX = this.x - vector.x;
        const deltaY = this.y - vector.y;
        return deltaX * deltaX + deltaY * deltaY;
    }
    normalize() {
        const mag = this.magnitude();
        const vector = this.clone();
        if (Math.abs(mag) < 1e-9) {
            vector.x = 0;
            vector.y = 0;
        }
        else {
            vector.x /= mag;
            vector.y /= mag;
        }
        return vector;
    }
    angle() {
        return Math.atan2(this.y, this.x);
    }
    rotate(alpha) {
        const cos = Math.cos(alpha);
        const sin = Math.sin(alpha);
        const vector = new Vector2();
        vector.x = this.x * cos - this.y * sin;
        vector.y = this.x * sin + this.y * cos;
        return vector;
    }
    toPrecision(precision) {
        const vector = this.clone();
        vector.x = Number(vector.x.toFixed(precision));
        vector.y = Number(vector.y.toFixed(precision));
        return vector;
    }
    toString() {
        const vector = this.toPrecision(1);
        return "[" + vector.x + "; " + vector.y + "]";
    }
}

Array.prototype.isEmpty = function () {
    if (this.length === 0) {
        return true;
    }
    return false;
};
Array.prototype.clone = function () {
    return this.slice();
};
Array.prototype.first = function () {
    return this[0];
};
Array.prototype.last = function () {
    return this[this.length - 1];
};
Array.prototype.insert = function (index, value) {
    this.splice(index, 0, value);
};
Array.prototype.removeIndex = function (index) {
    return this.splice(index, 1);
};
Array.prototype.remove = function (element) {
    return this.filter(x => x === element);
};
Array.prototype.sum = function () {
    return this.reduce((prev, curr) => prev + curr);
};
Array.prototype.avg = function () {
    return this.sum() / this.length;
};
Array.prototype.random = function () {
    const index = Math.floor(Math.random() * (Math.floor(this.length - 1) + 1));
    return this[index];
};
Array.prototype.shuffle = function () {
    var buffer = [], start;
    for (var i = this.length; i >= this.length && i > 0; i--) {
        start = Math.floor(Math.random() * this.length);
        buffer.push(this.splice(start, 1)[0]);
    }
    return buffer;
};

String.isNullOrEmpty = function (val) {
    if (val === undefined || val === null || val.trim() === "") {
        return true;
    }
    return false;
};
String.prototype.capitalize = function () {
    if (this.length == 1) {
        return this.toUpperCase();
    }
    else if (this.length > 0) {
        let regex = /^(\(|\[|"|')/;
        if (regex.test(this)) {
            return this.substring(0, 2).toUpperCase() + this.substring(2);
        }
        else {
            return this.substring(0, 1).toUpperCase() + this.substring(1);
        }
    }
    return this;
};
String.prototype.capitalizeWords = function () {
    let regexp = /\s/;
    let words = this.split(regexp);
    if (words.length == 1) {
        return words[0].capitalize();
    }
    else if (words.length > 1) {
        let result = "";
        for (let i = 0; i < words.length; i++) {
            if (words[i].capitalize() !== null) {
                result += words[i].capitalize() + " ";
            }
        }
        result.trim();
        return result;
    }
    return this;
};
String.prototype.contains = function (val) {
    if (this.indexOf(val) !== -1) {
        return true;
    }
    return false;
};
String.prototype.slugify = function (lower = true) {
    if (!lower) {
        return this.toLowerCase()
            .normalize()
            .replace(/[^a-z0-9]/gi, "-");
    }
    return this.normalize().replace(/[^a-z0-9]/gi, "-");
};

const name = "Coopa";

export { Event, LogLevel, Random, SeededRandom, Vector2, clone, isArray, isNumeric, isObjectEmpty, isString, logger, name, now, perf, rng, uid };
