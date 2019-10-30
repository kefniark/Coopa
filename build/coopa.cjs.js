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
    for (const a in obj)
        if (obj.hasOwnProperty(a))
            return false;
    return true;
}
function clone(obj) {
    return Object.assign({}, obj);
}

const PI_TWO = Math.PI * 2;
const EPSILON = 0.0000001;
/**
 * Convert degree to radian
 *
 * @export
 * @param {number} euler
 */
function eulerToRadian(euler) {
    return (euler * PI_TWO) / 360;
}
/**
 * Convert radian into degree
 *
 * @export
 * @param {number} radian
 */
function radianToEuler(radian) {
    return (radian * 360) / PI_TWO;
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
 * Basic Matrix class
 *
 * @export
 */
class Matrix {
    constructor(elements) {
        this.elements = [];
        if (elements)
            this.set(elements);
    }
    get type() {
        return `(${this.rows} x ${this.columns})`;
    }
    get rows() {
        return this.elements.length;
    }
    get columns() {
        return this.elements[0].length;
    }
    /**
     * Create a matrix with values
     *
     * @static
     * @param {(number[][] | number[])} elements
     * @returns
     */
    static create(elements) {
        const m = new Matrix();
        return m.set(elements);
    }
    /**
     * Create an empty matrix based on the size
     *
     * @static
     * @param {number} n number of row
     * @param {number} m number of column
     * @returns {Matrix}
     */
    static createZero(n, m) {
        const elem = [];
        for (let i = 0; i < n; i++) {
            elem[i] = [];
            for (let j = 0; j < m; j++) {
                elem[i][j] = 0;
            }
        }
        return Matrix.create(elem);
    }
    /**
     * Create a matrix from diagonal values
     *
     * @static
     * @param {number[]} val
     * @returns {Matrix}
     */
    static createDiagonal(val) {
        let i = val.length;
        const m = Matrix.createIdentity(i);
        while (i--) {
            m.elements[i][i] = val[i];
        }
        return m;
    }
    /**
     * Create an identity matrix
     *
     * @static
     * @param {number} n size
     * @returns {Matrix}
     */
    static createIdentity(n) {
        let els = [], i = n, j;
        while (i--) {
            j = n;
            els[i] = [];
            while (j--) {
                els[i][j] = i === j ? 1 : 0;
            }
        }
        return Matrix.create(els);
    }
    /**
     * Create Random matrix
     *
     * @static
     * @param {number} n number of row
     * @param {number} m number of column
     * @returns {Matrix}
     */
    static createRandom(n, m) {
        return Matrix.createZero(n, m).map(() => rng.rand(), Matrix.create([]));
    }
    /**
     * Get a value by row/col
     * Important: use math indexes (start at 1,1 and not 0,0)
     *
     * @param {number} i
     * @param {number} j
     * @returns {number}
     */
    el(i, j) {
        if (i < 1 || i > this.elements.length || j < 1 || j > this.elements[0].length)
            return undefined;
        return this.elements[i - 1][j - 1];
    }
    /**
     * Create a new matrix with same values
     *
     * @returns {Matrix}
     */
    clone() {
        return Matrix.create(this.elements);
    }
    scale(scalar) {
        return this.map(x => x * scalar, Matrix.create([]));
    }
    scaleInto(scalar, into) {
        return this.map(x => x * scalar, into);
    }
    /**
     * Add another matrix (and return a new one)
     *
     * @param {Matrix} matrix
     * @returns {Matrix} new matrix
     */
    add(matrix) {
        return this._add(matrix, Matrix.create([]));
    }
    addInto(matrix, into) {
        return this._add(matrix, into);
    }
    /**
     * Subtract another matrix (and return a new one)
     *
     * @param {Matrix} matrix
     * @returns {Matrix} new matrix
     */
    subtract(matrix) {
        return this._subtract(matrix, Matrix.create([]));
    }
    subtractInto(matrix, into) {
        return this._subtract(matrix, into);
    }
    /**
     * Multiply with another matrix
     *
     * @param {Matrix} matrix
     * @returns {Matrix} new matrix
     */
    multiply(matrix) {
        return this._multiply(matrix, Matrix.create([]));
    }
    /**
     * Check equality
     *
     * @param {Matrix} matrix
     * @returns {boolean}
     */
    equals(matrix, exact = false) {
        if (!this.isSameSize(matrix))
            return false;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (exact) {
                    if (this.elements[i][j] !== matrix.elements[i][j])
                        return false;
                }
                else {
                    if (!numberEqual(this.elements[i][j], matrix.elements[i][j]))
                        return false;
                }
            }
        }
        return true;
    }
    /**
     * Check that different matrics have the same size
     *
     * @param {Matrix} matrix
     * @returns {boolean}
     */
    isSameSize(matrix) {
        return this.rows === matrix.rows && this.columns === matrix.columns;
    }
    /**
     * Check if the matrix is a square or not
     *
     * @returns {boolean}
     */
    isSquare() {
        return this.rows === this.columns;
    }
    /**
     * Inspect the content of the matrix
     *
     * a string with the form:
     *  [0, 0, 0]
     *  [1, 2, 3]
     *
     * @returns {string}
     */
    inspect() {
        const matrix_rows = [];
        if (this.rows === 0)
            return "[]";
        for (let i = 0; i < this.rows; i++) {
            matrix_rows.push(`[ ${this.elements[i].join(", ")} ]`);
        }
        return matrix_rows.join("\n");
    }
    /**
     * To String
     *
     * @returns {string}
     */
    toString() {
        return `Matrix ${this.type}\n${this.inspect()}`;
    }
    _add(matrix, into) {
        if (!this.isSameSize(matrix))
            throw new Error("different size");
        return this.map((x, i, j) => x + matrix.elements[i - 1][j - 1], into);
    }
    _subtract(matrix, into) {
        if (!this.isSameSize(matrix))
            throw new Error("different size");
        return this.map((x, i, j) => x - matrix.elements[i - 1][j - 1], into);
    }
    _multiply(matrix, into) {
        if (!this.canMultiply(matrix)) {
            throw new Error(`Cannot multiply ${this.type} x ${matrix.type}`);
        }
        let i = this.elements.length, nj = matrix.columns, j;
        let cols = this.columns, c, elements = [], sum;
        while (i--) {
            j = nj;
            elements[i] = [];
            while (j--) {
                c = cols;
                sum = 0;
                while (c--) {
                    sum += this.elements[i][c] * matrix.elements[c][j];
                }
                elements[i][j] = sum;
            }
        }
        return into ? into.set(elements) : Matrix.create(elements);
    }
    canMultiply(matrix) {
        if (this.elements.length === 0)
            return false;
        return this.columns === matrix.rows;
    }
    map(fn, into) {
        const elements = [];
        let i = this.elements.length;
        const nj = this.elements[0].length;
        let j = 0;
        while (i--) {
            j = nj;
            elements[i] = [];
            while (j--) {
                elements[i][j] = fn.call(undefined, this.elements[i][j], i + 1, j + 1);
            }
        }
        return into.set(elements);
    }
    set(elements) {
        let i = 0;
        let j = 0;
        if (elements[0] && Array.isArray(elements[0])) {
            const array2d = elements;
            i = array2d.length;
            this.elements = [];
            while (i--) {
                j = array2d[i].length;
                this.elements[i] = [];
                while (j--) {
                    this.elements[i][j] = array2d[i][j];
                }
            }
            return this;
        }
        const array1d = elements;
        const n = array1d.length;
        this.elements = [];
        for (i = 0; i < n; i++) {
            this.elements.push([array1d[i]]);
        }
        return this;
    }
}

class Vector2 extends Matrix {
    static get zero() {
        return new Vector2(0, 0);
    }
    static get up() {
        return new Vector2(0, 1);
    }
    static get down() {
        return new Vector2(0, -1);
    }
    static get left() {
        return new Vector2(-1, 0);
    }
    static get right() {
        return new Vector2(1, 0);
    }
    get x() {
        return this.elements[0][0];
    }
    set x(val) {
        this.elements[0][0] = val;
    }
    get y() {
        return this.elements[0][1];
    }
    set y(val) {
        this.elements[0][1] = val;
    }
    constructor(x = 0, y = 0) {
        super([[x, y, 0]]);
    }
    add(vec) {
        return this.addInto(vec, new Vector2());
    }
    subtract(vec) {
        return this.subtractInto(vec, new Vector2());
    }
    scale(scalar) {
        return this.scaleInto(scalar, new Vector2());
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    cross(vector) {
        return this.x * vector.y - this.y * vector.x;
    }
    round(decimal = 2) {
        return new Vector2(roundTo(this.x, decimal), roundTo(this.y, decimal));
    }
    length() {
        return Math.sqrt(this.lengthSqr());
    }
    lengthSqr() {
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
        const mag = this.length();
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
    angleEuler() {
        return radianToEuler(Math.atan2(this.y, this.x));
    }
    rotateEuler(angle) {
        return this.rotate(eulerToRadian(angle));
    }
    rotate(alpha) {
        const cos = Math.cos(alpha);
        const sin = Math.sin(alpha);
        const vector = new Vector2();
        vector.x = this.x * cos - this.y * sin;
        vector.y = this.x * sin + this.y * cos;
        return vector;
    }
    toString() {
        return `Vector2 { x: ${this.x}, y: ${this.y} }`;
    }
}
class Vector3 extends Matrix {
    get x() {
        return this.elements[0][0];
    }
    set x(val) {
        this.elements[0][0] = val;
    }
    get y() {
        return this.elements[0][1];
    }
    set y(val) {
        this.elements[0][1] = val;
    }
    get z() {
        return this.elements[0][2];
    }
    set z(val) {
        this.elements[0][2] = val;
    }
    constructor(x = 0, y = 0, z = 0) {
        super([[x, y, z]]);
    }
    add(vec) {
        return this.addInto(vec, new Vector3());
    }
    subtract(vec) {
        return this.subtractInto(vec, new Vector3());
    }
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    scale(scalar) {
        return this.scaleInto(scalar, new Vector3());
    }
    toString() {
        return `Vector3 { x: ${this.x}, y: ${this.y}, z: ${this.z} }`;
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
    let buffer = [], start;
    for (let i = this.length; i >= this.length && i > 0; i--) {
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

exports.Event = Event;
exports.Random = Random;
exports.SeededRandom = SeededRandom;
exports.Vector2 = Vector2;
exports.Vector3 = Vector3;
exports.clone = clone;
exports.isArray = isArray;
exports.isNumeric = isNumeric;
exports.isObjectEmpty = isObjectEmpty;
exports.isString = isString;
exports.logger = logger;
exports.name = name;
exports.now = now;
exports.perf = perf;
exports.rng = rng;
exports.uid = uid;
