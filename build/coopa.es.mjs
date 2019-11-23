// [COOPA] Build: 0.2.3 - November 23, 2019
// inspired by https://algs4.cs.princeton.edu/31elementary/
const errorTreeEmpty = "No Element in the tree";
class TreeNode {
    constructor(key, val) {
        this.key = key;
        this.val = val;
    }
}
/**
 * Binary search tree
 * @template Key
 * @template Val
 */
class BinarySearchTree {
    get minKey() {
        return this.min.key;
    }
    get min() {
        if (!this.root)
            throw new Error(errorTreeEmpty);
        return this.findMin(this.root);
    }
    get maxKey() {
        return this.max.key;
    }
    get max() {
        if (!this.root)
            throw new Error(errorTreeEmpty);
        return this.findMax(this.root);
    }
    /**
     * Check if the tree has at least one element
     *
     * @returns
     */
    isEmpty() {
        return !!this.root;
    }
    /**
     * Set tree node into the tree.
     * @param key
     * @param val
     */
    set(key, val) {
        this.root = this.recursiveSet(this.root, key, val);
    }
    recursiveSet(node, key, val) {
        if (node == null) {
            return new TreeNode(key, val);
        }
        if (key < node.key) {
            node.left = this.recursiveSet(node.left, key, val);
        }
        else if (key > node.key) {
            node.right = this.recursiveSet(node.right, key, val);
        }
        else {
            node.val = val;
        }
        return node;
    }
    /**
     * Gets Tree node by key from binary search tree
     * @param key
     * @returns get
     */
    get(key) {
        return this.recursiveGet(this.root, key);
    }
    recursiveGet(node, key) {
        if (node == null)
            return null;
        if (key < node.key) {
            return this.recursiveGet(node.left, key);
        }
        else if (key > node.key) {
            return this.recursiveGet(node.right, key);
        }
        else {
            return node.val;
        }
    }
    recursiveDelMin(node) {
        if (node.left == null) {
            return node.right;
        }
        node.left = this.recursiveDelMin(node.left);
        return node;
    }
    /**
     * Deletes TreeNode by key from binary search tree
     * @param key
     */
    delete(key) {
        if (this.root) {
            this.root = this.delRecursively(this.root, key);
        }
    }
    /**
     * Clear binary search tree
     */
    clear() {
        this.root = null;
    }
    delRecursively(node, key) {
        if (key < node.key) {
            node.left = this.delRecursively(node.left, key);
        }
        else if (key > node.key) {
            node.right = this.delRecursively(node.right, key);
        }
        else {
            if (node.right == null) {
                return node.left;
            }
            if (node.left == null) {
                return node.right;
            }
            const t = node;
            node = this.findMin(node.right);
            node.right = this.recursiveDelMin(t.right);
            node.left = t.left;
        }
        return node;
    }
    findMin(node) {
        if (node.left == null) {
            return node;
        }
        return this.findMin(node.left);
    }
    findMax(node) {
        if (node.right == null) {
            return node;
        }
        return this.findMax(node.right);
    }
    /**
     * Return all tree nodes in binary search tree
     * @returns entries
     */
    entries() {
        const array = [];
        this.entriesRecursively(this.root, array);
        return array;
    }
    entriesRecursively(node, array) {
        if (node == null) {
            return;
        }
        this.entriesRecursively(node.left, array);
        array.push(node);
        this.entriesRecursively(node.right, array);
    }
    /**
     * Return all keys in binary search tree
     * @returns keys
     */
    keys() {
        const array = [];
        this.entriesRecursively(this.root, array);
        return array.map(x => x.key);
    }
    /**
     * Return true if binary search tree contains key
     * @param key
     * @returns true if has
     */
    has(key) {
        const keys = this.keys();
        return keys.indexOf(key) > -1;
    }
    /**
     * Return all values in binary search tree
     * @returns values
     */
    values() {
        const array = [];
        this.entriesRecursively(this.root, array);
        return array.map(x => x.val);
    }
    /**
     * Prints binary search tree
     * Inspired by https://flaviocopes.com/golang-data-structure-binary-search-tree/
     * @returns
     */
    print() {
        // Draw lines for debugging
        const maxHeight = this.height;
        if (maxHeight == 0)
            return;
        const line = "--------";
        let current = "";
        for (let i = 0; i < maxHeight; i++) {
            current += line;
        }
        console.log(current);
        this.stringify(this.root, 0);
        console.log(current);
    }
    stringify(n, level) {
        if (!n)
            return;
        let format = "";
        for (let i = 0; i < level; i++) {
            format += "       ";
        }
        format += "----[ ";
        level++;
        // change the order for logs to display smaller value to right
        this.stringify(n.right, level);
        console.log(format + n.key);
        this.stringify(n.left, level);
    }
    /**
     * Return max height of Binary Search Tree
     * @returns max height
     */
    get height() {
        return this.getMaxHeightRecursively(this.root);
    }
    getMaxHeightRecursively(node) {
        if (!node)
            return 0;
        if (node.left == null && node.right == null)
            return 1;
        return 1 + Math.max(this.getMaxHeightRecursively(node.left), this.getMaxHeightRecursively(node.right));
    }
}

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

class ArrayExt {
    /**
     * Create an array of n elements with value val
     *
     * createSimilar(3, 2) -> [2, 2, 2]
     *
     * @param {number} n
     * @param {number} [val=0]
     * @returns
     */
    static createSimilar(n, val = 0) {
        return ArrayExt.create(n, () => val);
    }
    /**
     * Create an array of n elements ordered starting at start
     *
     * createOrder(3, 1) -> [1, 2, 3]
     *
     * @param {number} n
     * @param {number} [start=1]
     * @returns
     */
    static createOrder(n, start = 1) {
        return ArrayExt.create(n, i => start + i);
    }
    static create(n, cb) {
        const res = new Array(n);
        for (let i = 0; i < n; i++) {
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
        const regexp = /\s/;
        const words = val.split(regexp);
        if (words.length == 1) {
            return StringExt.capitalize(words[0]);
        }
        let result = "";
        for (let i = 0; i < words.length; i++) {
            result += StringExt.capitalize(words[i]) + " ";
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
    static IsDefined(val) {
        return !ObjectExt.IsNullOrUndefined(val);
    }
    static IsNullOrUndefined(val) {
        return !val && val !== 0;
    }
}

var PriorityQueueOrder;
(function (PriorityQueueOrder) {
    PriorityQueueOrder["Lower"] = "lower";
    PriorityQueueOrder["Higher"] = "higher";
})(PriorityQueueOrder || (PriorityQueueOrder = {}));
/**
 * Simple priority queue based on the binary search tree
 *
 * Add
 *
 * @export
 * @class PriorityQueue
 * @template T
 */
class PriorityQueue {
    constructor(order = PriorityQueueOrder.Lower) {
        this.length = 0;
        this.tree = new BinarySearchTree();
        this.order = order;
    }
    get size() {
        return this.length;
    }
    get priorityMin() {
        return this.tree.minKey;
    }
    get priorityMax() {
        return this.tree.maxKey;
    }
    /**
     * Check if there are still element inside the queue
     *
     * @returns
     */
    hasNext() {
        return this.length > 0;
    }
    /**
     * Add an element in the queue
     *
     * @param {number} priority
     * @param {T} obj
     */
    add(priority, obj) {
        let res = this.tree.get(priority);
        if (!res)
            res = [];
        res.push(obj);
        this.tree.set(priority, res);
        this.length++;
    }
    /**
     * Add multiple element in the queue
     *
     * @param {number} priority
     * @param {T[]} obj
     */
    addMany(priority, obj) {
        let res = this.tree.get(priority);
        if (!res)
            res = [];
        res = res.concat(obj);
        this.tree.set(priority, res);
        this.length += obj.length;
    }
    /**
     * Get the next element in the queue (first or last based on order)
     *
     * @returns {T}
     */
    next() {
        if (!this.tree.isEmpty())
            return undefined;
        const entry = this.order === PriorityQueueOrder.Higher ? this.tree.max : this.tree.min;
        const res = entry.val.shift();
        if (entry.val.length === 0)
            this.tree.delete(entry.key);
        this.length--;
        return res;
    }
    /**
     * Get the next element in the queue
     * (like .next() but let the value in the queue)
     *
     * @returns
     */
    peek() {
        const entry = this.order === PriorityQueueOrder.Higher ? this.tree.max : this.tree.min;
        return ArrayExt.last(entry.val);
    }
    toString() {
        return `[PriorityQueue: ${this.length} (${this.tree.minKey} < ${this.tree.maxKey})]`;
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

/// Inspired by https://basarat.gitbooks.io/typescript/docs/tips/typed-event.html
/* eslint @typescript-eslint/no-inferrable-types: 0 */
class Event {
    constructor() {
        this.enable = true;
        this.listeners = [];
        this.listenersOncer = [];
    }
    clear() {
        this.enable = false;
        this.listeners.length = 0;
        this.listenersOncer.length = 0;
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
        if (!this.enable)
            return;
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

var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = -1] = "DEBUG";
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
    debug(...params) {
        if (this.level > LogLevel.DEBUG)
            return;
        if (this._console)
            console.debug(this.prefix, ...params);
        this.eventHandler.emit([LogLevel.DEBUG, this.prefix, ...params]);
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

// To reuse export `rng` const without hacking around
/* eslint @typescript-eslint/no-use-before-define: 0 */
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
const rng = new Random();

/* istanbul ignore file */
/**
 * Common utilities
 */
// Configuration Constants
const EPSILON = 0.000001;
const ARRAY_TYPE = Array;
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
function clamp(val, min, max) {
    return Math.max(Math.min(val, max), min);
}
function clamp01(val) {
    return clamp(val, 0, 1);
}
function inRange(val, min, max) {
    return val >= min && val <= max;
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
    return +value.toFixed(decimals + EPSILON);
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

/**
 * Implementation of 2D Grid
 *
 * @export
 * @class SquareGrid
 * @template T
 */
class SquareGrid {
    constructor(width, height, diagonal = false, init) {
        this.width = width;
        this.height = height;
        this.diagonal = diagonal;
        this.cells = new Array(width * height);
        this.map = new Map();
        if (init) {
            for (let i = 0; i < this.cells.length; i++) {
                this.cells[i] = init(i % this.width, Math.floor(i / this.width));
            }
        }
    }
    getIndex(x, y) {
        return y * this.width + x;
    }
    getNode(x, y) {
        const index = this.getIndex(x, y);
        const node = this.map.get(index);
        if (node)
            return node;
        const newNode = {
            x,
            y,
            index,
            up: () => this.getNode(x, y - 1),
            down: () => this.getNode(x, y + 1),
            right: () => this.getNode(x + 1, y),
            left: () => this.getNode(x - 1, y),
            neighbors: () => {
                const neighbors = [];
                if (inRange(y - 1, 0, this.height - 1))
                    neighbors.push(newNode.up());
                if (inRange(y + 1, 0, this.height - 1))
                    neighbors.push(newNode.down());
                if (inRange(x - 1, 0, this.width - 1))
                    neighbors.push(newNode.left());
                if (inRange(x + 1, 0, this.width - 1))
                    neighbors.push(newNode.right());
                if (this.diagonal) {
                    const topLeft = inRange(x - 1, 0, this.width - 1) && inRange(y - 1, 0, this.height - 1);
                    const topRight = inRange(x + 1, 0, this.width - 1) && inRange(y - 1, 0, this.height - 1);
                    const bottomLeft = inRange(x - 1, 0, this.width - 1) && inRange(y + 1, 0, this.height - 1);
                    const bottomRight = inRange(x + 1, 0, this.width - 1) && inRange(y + 1, 0, this.height - 1);
                    if (topLeft)
                        neighbors.push(newNode.up().left());
                    if (topRight)
                        neighbors.push(newNode.up().right());
                    if (bottomLeft)
                        neighbors.push(newNode.down().left());
                    if (bottomRight)
                        neighbors.push(newNode.down().right());
                }
                return neighbors;
            },
            content: () => {
                return inRange(index, 0, this.cells.length) ? this.cells[index] : undefined;
            },
            set: (val) => {
                this.cells[index] = val;
            },
            toString: () => (ObjectExt.IsDefined(newNode.content()) ? newNode.content() : "")
        };
        if (ObjectExt.IsDefined(newNode.content))
            this.map.set(index, newNode);
        return newNode;
    }
    print() {
        let str = "";
        for (let y = 0; y < this.height; y++) {
            const line = [];
            for (let x = 0; x < this.width; x++) {
                line.push(this.getNode(x, y).toString());
            }
            str += `${line.join("  ")}\n`;
        }
        console.log(str);
    }
    distanceToGoal(nodeA, nodeB) {
        return Math.hypot(nodeB.x - nodeA.x, nodeB.y - nodeA.y);
    }
    pathfinding(from, to, isValid) {
        const parent = new Map();
        const queue = new PriorityQueue();
        queue.add(1, from);
        parent.set(from, undefined);
        while (queue.hasNext()) {
            const node = queue.next();
            if (node === to) {
                const res = [];
                let current = node;
                while (current) {
                    const before = parent.get(current);
                    if (before)
                        res.push(current);
                    current = before ? before.parent : undefined;
                }
                return res.reverse();
            }
            const cur = parent.get(node);
            for (const next of node.neighbors()) {
                if (!isValid({ from: node, to: next }))
                    continue;
                const distanceToOrigin = cur ? cur.cost : 0;
                if (parent.has(next))
                    continue;
                const heuristic = distanceToOrigin + this.distanceToGoal(to, next);
                queue.add(heuristic, next);
                parent.set(next, { parent: node, cost: distanceToOrigin + 1 });
            }
        }
        return [];
    }
}

var SquareGridNodeType;
(function (SquareGridNodeType) {
    SquareGridNodeType[SquareGridNodeType["TILE"] = 0] = "TILE";
    SquareGridNodeType[SquareGridNodeType["HWALL"] = 1] = "HWALL";
    SquareGridNodeType[SquareGridNodeType["VWALL"] = 2] = "VWALL";
    SquareGridNodeType[SquareGridNodeType["CORNER"] = 3] = "CORNER";
})(SquareGridNodeType || (SquareGridNodeType = {}));
/**
 * Implementation of 2D Grid with thin walls
 *
 * @export
 * @class SquareGrid
 * @template T
 */
class SquareGridWall extends SquareGrid {
    constructor(width, height, diagonal = false, init) {
        super(width * 2 + 1, height * 2 + 1, diagonal);
        this.widthTile = width;
        this.heightTile = height;
        if (init) {
            // init tiles
            for (let i = 0; i < this.widthTile; i++) {
                for (let j = 0; j < this.heightTile; j++) {
                    const index = this.getIndex(i * 2 + 1, j * 2 + 1);
                    this.cells[index] = init(i, j, SquareGridNodeType.TILE);
                }
            }
            // init walls
            for (let i = 0; i < this.widthTile + 1; i++) {
                for (let j = 0; j < this.heightTile + 1; j++) {
                    // corner
                    const indexCorner = this.getIndex(i * 2, j * 2);
                    this.cells[indexCorner] = init(i - 0.5, j - 0.5, SquareGridNodeType.CORNER);
                    // left
                    const indexLeft = this.getIndex(i * 2, j * 2 + 1);
                    this.cells[indexLeft] = init(i - 0.5, j, SquareGridNodeType.VWALL);
                    // top
                    if (i < this.widthTile) {
                        const indexTop = this.getIndex(i * 2 + 1, j * 2);
                        this.cells[indexTop] = init(i, j - 0.5, SquareGridNodeType.HWALL);
                    }
                }
            }
        }
    }
    getTile(x, y, type = SquareGridNodeType.TILE) {
        if (type === SquareGridNodeType.CORNER)
            return this.getNode(x * 2, y * 2);
        else if (type === SquareGridNodeType.VWALL)
            return this.getNode(x * 2, y * 2 + 1);
        else if (type === SquareGridNodeType.HWALL)
            return this.getNode(x * 2 + 1, y * 2);
        return this.getNode(x * 2 + 1, y * 2 + 1);
    }
    getNode(x, y) {
        const index = this.getIndex(x, y);
        const node = this.map.get(index);
        if (node)
            return node;
        const newNode = {
            x,
            y,
            index,
            up: () => this.getNode(x, y - 2),
            down: () => this.getNode(x, y + 2),
            right: () => this.getNode(x + 2, y),
            left: () => this.getNode(x - 2, y),
            upWall: () => this.getNode(x, y - 1),
            downWall: () => this.getNode(x, y + 1),
            rightWall: () => this.getNode(x + 1, y),
            leftWall: () => this.getNode(x - 1, y),
            walls: () => {
                const neighbors = [];
                if (inRange(y - 1, 0, this.height - 1))
                    neighbors.push(newNode.upWall());
                if (inRange(y + 1, 0, this.height - 1))
                    neighbors.push(newNode.downWall());
                if (inRange(x - 1, 0, this.width - 1))
                    neighbors.push(newNode.leftWall());
                if (inRange(x + 1, 0, this.width - 1))
                    neighbors.push(newNode.rightWall());
                return neighbors;
            },
            neighbors: () => {
                const neighbors = [];
                if (inRange(y - 2, 0, this.height - 1))
                    neighbors.push(newNode.up());
                if (inRange(y + 2, 0, this.height - 1))
                    neighbors.push(newNode.down());
                if (inRange(x - 2, 0, this.width - 1))
                    neighbors.push(newNode.left());
                if (inRange(x + 2, 0, this.width - 1))
                    neighbors.push(newNode.right());
                if (this.diagonal) {
                    const topLeft = inRange(x - 2, 0, this.width - 1) && inRange(y - 2, 0, this.height - 1);
                    const topRight = inRange(x + 2, 0, this.width - 1) && inRange(y - 2, 0, this.height - 1);
                    const bottomLeft = inRange(x - 2, 0, this.width - 1) && inRange(y + 2, 0, this.height - 1);
                    const bottomRight = inRange(x + 2, 0, this.width - 1) && inRange(y + 2, 0, this.height - 1);
                    if (topLeft)
                        neighbors.push(newNode.up().left());
                    if (topRight)
                        neighbors.push(newNode.up().right());
                    if (bottomLeft)
                        neighbors.push(newNode.down().left());
                    if (bottomRight)
                        neighbors.push(newNode.down().right());
                }
                return neighbors;
            },
            content: () => {
                return inRange(index, 0, this.cells.length) ? this.cells[index] : undefined;
            },
            set: (val) => {
                this.cells[index] = val;
            },
            toString: () => (ObjectExt.IsDefined(newNode.content()) ? newNode.content() : "")
        };
        if (ObjectExt.IsDefined(newNode.content))
            this.map.set(index, newNode);
        return newNode;
    }
    pathfinding(from, to, isValid) {
        return super.pathfinding(from, to, arg => {
            const middle = this.getNode(ArrayExt.avg([arg.from.x, arg.to.x]), ArrayExt.avg([arg.from.y, arg.to.y]));
            return isValid({
                from: arg.from,
                to: arg.from,
                wall: middle
            });
        });
    }
}

/**
 * Delay event to be processed later (based on an update)
 *
 * Example: render event computed only once a frame at the end
 *
 * @export
 * @class DelayedEvent
 */
class DelayedEvent {
    constructor(event, distinct = true) {
        this.queue = [];
        if (event)
            event.on(evt => this.emit(evt));
        this.ouput = new Event();
        this.distinct = distinct;
    }
    get enable() {
        return this.ouput.enable;
    }
    clear() {
        this.queue.length = 0;
        this.ouput.clear();
    }
    on(listener) {
        return this.ouput.on(listener);
    }
    once(listener) {
        this.ouput.once(listener);
    }
    off(listener) {
        return this.ouput.off(listener);
    }
    update() {
        if (!this.enable)
            return;
        for (const evt of this.queue) {
            this.ouput.emit(evt);
        }
        this.queue.length = 0;
    }
    emit(event, force = false) {
        if (!this.enable)
            return;
        if (force)
            return this.ouput.emit(event);
        if (this.distinct) {
            if (this.queue.includes(event))
                return;
        }
        this.queue.push(event);
    }
}

/* eslint @typescript-eslint/no-use-before-define: 0 */
const updateLoopChannel = "_updateLoop";
var EventBusChannelType;
(function (EventBusChannelType) {
    EventBusChannelType["Direct"] = "direct";
    EventBusChannelType["Delayed"] = "delayed";
})(EventBusChannelType || (EventBusChannelType = {}));
class EventBusChannelDelayed extends DelayedEvent {
    constructor(name) {
        super();
        this.name = name;
        this.logger = new Logger();
        this.logger.prefix = `[EventBus: ${name}]`;
        this.logger.debug("Create EventBus Channel Delayed");
        this.evt = EventBus.channel(updateLoopChannel).on(() => this.update());
    }
    clear() {
        this.logger.debug(`Delete EventBus Channel`);
        this.evt.dispose();
        super.clear();
    }
    on(listener) {
        this.logger.debug(`Add Listener ${listener}`);
        return super.on(listener);
    }
    once(listener) {
        this.logger.debug(`Add OnceListener ${listener}`);
        super.once(listener);
    }
    off(listener) {
        this.logger.debug(`Remove Listener ${listener}`);
        super.off(listener);
    }
    update() {
        if (!this.enable)
            return;
        for (const event of this.queue) {
            this.logger.debug(`UpdateLoop: Emit event ${event}`);
        }
        super.update();
    }
    emit(event, force = false) {
        if (!this.enable)
            return;
        this.logger.debug(`Queue Emit event ${event}`);
        super.emit(event, force);
    }
}
class EventBusChannel extends Event {
    constructor(name) {
        super();
        this.name = name;
        this.logger = new Logger();
        this.logger.prefix = `[EventBus: ${name}]`;
        this.logger.debug("Create EventBus Channel");
    }
    clear() {
        this.logger.debug(`Delete EventBus Channel`);
        super.clear();
    }
    on(listener) {
        this.logger.debug(`Add Listener ${listener}`);
        return super.on(listener);
    }
    once(listener) {
        this.logger.debug(`Add OnceListener ${listener}`);
        super.once(listener);
    }
    off(listener) {
        this.logger.debug(`Remove Listener ${listener}`);
        super.off(listener);
    }
    emit(event) {
        if (!this.enable)
            return;
        this.logger.debug(`Emit event ${event}`);
        super.emit(event);
    }
}
/**
 * Event Bus is a good way to decouple components and share event without having direct dependencies
 *
 * @export
 * @class EventBus
 */
class EventBus {
    static initialize() {
        if (this.map)
            return;
        this.map = new Map();
        this.create(updateLoopChannel);
    }
    static get channelNames() {
        this.initialize();
        return Array.from(this.map.keys());
    }
    static create(name, type = EventBusChannelType.Direct) {
        this.initialize();
        const chan = this.map.get(name);
        if (chan) {
            logger.warn("channel already exist", name);
            return chan;
        }
        let newChan;
        switch (type) {
            case EventBusChannelType.Direct:
                newChan = new EventBusChannel(name);
                break;
            case EventBusChannelType.Delayed:
                newChan = new EventBusChannelDelayed(name);
                break;
            default:
                throw new Error("unknown type of event bus");
        }
        this.map.set(name, newChan);
        return newChan;
    }
    static update() {
        this.initialize();
        this.channel(updateLoopChannel).emit(0);
    }
    static delete(name) {
        this.initialize();
        const chan = this.map.get(name);
        if (!chan)
            return;
        chan.clear();
        this.map.delete(name);
    }
    static channel(name) {
        this.initialize();
        if (!this.map.has(name))
            throw new Error("Unknown bus channel : " + name);
        return this.map.get(name);
    }
}

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

// Used only as a polyfill for DOMMatrix
/* istanbul ignore file */
/* eslint @typescript-eslint/no-use-before-define: 0 */
var Matrix3D;
(function (Matrix3D) {
    Matrix3D[Matrix3D["M11"] = 0] = "M11";
    Matrix3D[Matrix3D["M12"] = 1] = "M12";
    Matrix3D[Matrix3D["M13"] = 2] = "M13";
    Matrix3D[Matrix3D["M14"] = 3] = "M14";
    Matrix3D[Matrix3D["M21"] = 4] = "M21";
    Matrix3D[Matrix3D["M22"] = 5] = "M22";
    Matrix3D[Matrix3D["M23"] = 6] = "M23";
    Matrix3D[Matrix3D["M24"] = 7] = "M24";
    Matrix3D[Matrix3D["M31"] = 8] = "M31";
    Matrix3D[Matrix3D["M32"] = 9] = "M32";
    Matrix3D[Matrix3D["M33"] = 10] = "M33";
    Matrix3D[Matrix3D["M34"] = 11] = "M34";
    Matrix3D[Matrix3D["M41"] = 12] = "M41";
    Matrix3D[Matrix3D["M42"] = 13] = "M42";
    Matrix3D[Matrix3D["M43"] = 14] = "M43";
    Matrix3D[Matrix3D["M44"] = 15] = "M44";
})(Matrix3D || (Matrix3D = {}));
var Matrix2D;
(function (Matrix2D) {
    Matrix2D[Matrix2D["A"] = 0] = "A";
    Matrix2D[Matrix2D["B"] = 1] = "B";
    Matrix2D[Matrix2D["C"] = 4] = "C";
    Matrix2D[Matrix2D["D"] = 5] = "D";
    Matrix2D[Matrix2D["E"] = 12] = "E";
    Matrix2D[Matrix2D["F"] = 13] = "F";
})(Matrix2D || (Matrix2D = {}));
const DEGREE_PER_RAD = 180 / Math.PI;
const RAD_PER_DEGREE = Math.PI / 180;
const parseMatrix = (init) => {
    let parsed = init.replace(/matrix\(/, "");
    parsed = parsed.split(/,/, 7);
    if (parsed.length !== 6) {
        throw new Error(`Failed to parse ${init}`);
    }
    parsed = parsed.map(parseFloat);
    return [parsed[0], parsed[1], 0, 0, parsed[2], parsed[3], 0, 0, 0, 0, 1, 0, parsed[4], parsed[5], 0, 1];
};
const parseMatrix3d = (init) => {
    let parsed = init.replace(/matrix3d\(/, "");
    parsed = parsed.split(/,/, 17);
    if (parsed.length !== 16) {
        throw new Error(`Failed to parse ${init}`);
    }
    return parsed.map(parseFloat);
};
const parseTransform = (tform) => {
    const type = tform.split(/\(/, 1)[0];
    if (type === "matrix") {
        return parseMatrix(tform);
    }
    else if (type === "matrix3d") {
        return parseMatrix3d(tform);
    }
    else {
        throw new Error(`${type} parsing not implemented`);
    }
};
const getNumber = (receiver, index) => {
    return receiver.values[index];
};
const setNumber2D = (receiver, index, value) => {
    if (typeof value !== "number") {
        throw new TypeError("Expected number");
    }
    receiver.values[index] = value;
};
const setNumber3D = (receiver, index, value) => {
    if (typeof value !== "number") {
        throw new TypeError("Expected number");
    }
    if (index === Matrix3D.M33 || index === Matrix3D.M44) {
        if (value !== 1) {
            receiver.is2D = false;
        }
    }
    else if (value !== 0) {
        receiver.is2D = false;
    }
    receiver.values[index] = value;
};
const newInstance = (values) => {
    const instance = Object.create(DOMMatrix$1.prototype);
    instance.constructor = DOMMatrix$1;
    instance.is2D = true;
    instance.values = values;
    return instance;
};
const multiply = (first, second) => {
    const dest = new Float64Array(16);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let sum = 0;
            for (let k = 0; k < 4; k++) {
                sum += first[i * 4 + k] * second[k * 4 + j];
            }
            dest[i * 4 + j] = sum;
        }
    }
    return dest;
};
class DOMMatrix$1 {
    // @type
    // (Float64Array) => void
    constructor(init) {
        this.is2D = true;
        this.values = new Float64Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        // Parse CSS transformList
        if (typeof init === "string") {
            if (init === "") {
                return;
            }
            else {
                const tforms = init.split(/\)\s+/, 20).map(parseTransform);
                if (tforms.length === 0) {
                    return;
                }
                init = tforms[0];
                for (let i = 1; i < tforms.length; i++) {
                    init = multiply(tforms[i], init);
                }
            }
        }
        let i = 0;
        const arr = init;
        if (init && init.length === 6) {
            setNumber2D(this, Matrix2D.A, arr[i++]);
            setNumber2D(this, Matrix2D.B, arr[i++]);
            setNumber2D(this, Matrix2D.C, arr[i++]);
            setNumber2D(this, Matrix2D.D, arr[i++]);
            setNumber2D(this, Matrix2D.E, arr[i++]);
            setNumber2D(this, Matrix2D.F, arr[i++]);
        }
        else if (init && init.length === 16) {
            setNumber2D(this, Matrix3D.M11, arr[i++]);
            setNumber2D(this, Matrix3D.M12, arr[i++]);
            setNumber3D(this, Matrix3D.M13, arr[i++]);
            setNumber3D(this, Matrix3D.M14, arr[i++]);
            setNumber2D(this, Matrix3D.M21, arr[i++]);
            setNumber2D(this, Matrix3D.M22, arr[i++]);
            setNumber3D(this, Matrix3D.M23, arr[i++]);
            setNumber3D(this, Matrix3D.M24, arr[i++]);
            setNumber3D(this, Matrix3D.M31, arr[i++]);
            setNumber3D(this, Matrix3D.M32, arr[i++]);
            setNumber3D(this, Matrix3D.M33, arr[i++]);
            setNumber3D(this, Matrix3D.M34, arr[i++]);
            setNumber2D(this, Matrix3D.M41, arr[i++]);
            setNumber2D(this, Matrix3D.M42, arr[i++]);
            setNumber3D(this, Matrix3D.M43, arr[i++]);
            setNumber3D(this, Matrix3D.M44, arr[i]);
        }
        else if (init !== undefined) {
            throw new TypeError("Expected string or array.");
        }
    }
    get m11() {
        return getNumber(this, Matrix3D.M11);
    }
    set m11(value) {
        setNumber2D(this, Matrix3D.M11, value);
    }
    get m12() {
        return getNumber(this, Matrix3D.M12);
    }
    set m12(value) {
        setNumber2D(this, Matrix3D.M12, value);
    }
    get m13() {
        return getNumber(this, Matrix3D.M13);
    }
    set m13(value) {
        setNumber2D(this, Matrix3D.M13, value);
    }
    get m14() {
        return getNumber(this, Matrix3D.M14);
    }
    set m14(value) {
        setNumber2D(this, Matrix3D.M14, value);
    }
    get m21() {
        return getNumber(this, Matrix3D.M21);
    }
    set m21(value) {
        setNumber2D(this, Matrix3D.M21, value);
    }
    get m22() {
        return getNumber(this, Matrix3D.M22);
    }
    set m22(value) {
        setNumber2D(this, Matrix3D.M22, value);
    }
    get m23() {
        return getNumber(this, Matrix3D.M23);
    }
    set m23(value) {
        setNumber2D(this, Matrix3D.M23, value);
    }
    get m24() {
        return getNumber(this, Matrix3D.M24);
    }
    set m24(value) {
        setNumber2D(this, Matrix3D.M24, value);
    }
    get m31() {
        return getNumber(this, Matrix3D.M31);
    }
    set m31(value) {
        setNumber2D(this, Matrix3D.M31, value);
    }
    get m32() {
        return getNumber(this, Matrix3D.M32);
    }
    set m32(value) {
        setNumber2D(this, Matrix3D.M32, value);
    }
    get m33() {
        return getNumber(this, Matrix3D.M33);
    }
    set m33(value) {
        setNumber2D(this, Matrix3D.M33, value);
    }
    get m34() {
        return getNumber(this, Matrix3D.M34);
    }
    set m34(value) {
        setNumber2D(this, Matrix3D.M34, value);
    }
    get m41() {
        return getNumber(this, Matrix3D.M41);
    }
    set m41(value) {
        setNumber2D(this, Matrix3D.M41, value);
    }
    get m42() {
        return getNumber(this, Matrix3D.M42);
    }
    set m42(value) {
        setNumber2D(this, Matrix3D.M42, value);
    }
    get m43() {
        return getNumber(this, Matrix3D.M43);
    }
    set m43(value) {
        setNumber2D(this, Matrix3D.M43, value);
    }
    get m44() {
        return getNumber(this, Matrix3D.M44);
    }
    set m44(value) {
        setNumber2D(this, Matrix3D.M44, value);
    }
    get a() {
        return getNumber(this, Matrix2D.A);
    }
    set a(value) {
        setNumber2D(this, Matrix2D.A, value);
    }
    get b() {
        return getNumber(this, Matrix2D.B);
    }
    set b(value) {
        setNumber2D(this, Matrix2D.B, value);
    }
    get c() {
        return getNumber(this, Matrix2D.C);
    }
    set c(value) {
        setNumber2D(this, Matrix2D.C, value);
    }
    get d() {
        return getNumber(this, Matrix2D.D);
    }
    set d(value) {
        setNumber2D(this, Matrix2D.D, value);
    }
    get e() {
        return getNumber(this, Matrix2D.E);
    }
    set e(value) {
        setNumber2D(this, Matrix2D.E, value);
    }
    get f() {
        return getNumber(this, Matrix2D.F);
    }
    set f(value) {
        setNumber2D(this, Matrix2D.F, value);
    }
    get isIdentity() {
        const values = this.values;
        return (values[Matrix3D.M11] === 1 &&
            values[Matrix3D.M12] === 0 &&
            values[Matrix3D.M13] === 0 &&
            values[Matrix3D.M14] === 0 &&
            values[Matrix3D.M21] === 0 &&
            values[Matrix3D.M22] === 1 &&
            values[Matrix3D.M23] === 0 &&
            values[Matrix3D.M24] === 0 &&
            values[Matrix3D.M31] === 0 &&
            values[Matrix3D.M32] === 0 &&
            values[Matrix3D.M33] === 1 &&
            values[Matrix3D.M34] === 0 &&
            values[Matrix3D.M41] === 0 &&
            values[Matrix3D.M42] === 0 &&
            values[Matrix3D.M43] === 0 &&
            values[Matrix3D.M44] === 1);
    }
    static fromMatrix(init) {
        if (init instanceof DOMMatrix$1) {
            return new DOMMatrix$1(init.values);
        }
        else if (init instanceof SVGMatrix) {
            return new DOMMatrix$1([init.a, init.b, init.c, init.d, init.e, init.f]);
        }
        else {
            throw new TypeError("Expected DOMMatrix");
        }
    }
    static fromFloat32Array(init) {
        if (!(init instanceof Float32Array))
            throw new TypeError("Expected Float32Array");
        return new DOMMatrix$1(init);
    }
    static fromFloat64Array(init) {
        if (!(init instanceof Float64Array))
            throw new TypeError("Expected Float64Array");
        return new DOMMatrix$1(init);
    }
    inspect(depth) {
        if (depth < 0) {
            return "[DOMMatrix]";
        }
        return `DOMMatrix [
        a: ${this.a}
        b: ${this.b}
        c: ${this.c}
        d: ${this.d}
        e: ${this.e}
        f: ${this.f}
        m11: ${this.m11}
        m12: ${this.m12}
        m13: ${this.m13}
        m14: ${this.m14}
        m21: ${this.m21}
        m22: ${this.m22}
        m23: ${this.m23}
        m23: ${this.m23}
        m31: ${this.m31}
        m32: ${this.m32}
        m33: ${this.m33}
        m34: ${this.m34}
        m41: ${this.m41}
        m42: ${this.m42}
        m43: ${this.m43}
        m44: ${this.m44}
        is2D: ${this.is2D}
        isIdentity: ${this.isIdentity} ]`;
    }
    multiply(other) {
        return newInstance(this.values).multiplySelf(other);
    }
    multiplySelf(other) {
        this.values = multiply(other.values, this.values);
        if (!other.is2D) {
            this.is2D = false;
        }
        return this;
    }
    preMultiplySelf(other) {
        this.values = multiply(this.values, other.values);
        if (!other.is2D) {
            this.is2D = false;
        }
        return this;
    }
    translate(tx = 0, ty = 0, tz = 0) {
        return newInstance(this.values).translateSelf(tx, ty, tz);
    }
    translateSelf(tx = 0, ty = 0, tz = 0) {
        this.values = multiply([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1], this.values);
        if (tz !== 0) {
            this.is2D = false;
        }
        return this;
    }
    scale(scaleX, scaleY, scaleZ, originX, originY, originZ) {
        return newInstance(this.values).scaleSelf(scaleX, scaleY, scaleZ, originX, originY, originZ);
    }
    scale3d(scale, originX, originY, originZ) {
        return newInstance(this.values).scale3dSelf(scale, originX, originY, originZ);
    }
    scale3dSelf(scale, originX, originY, originZ) {
        return this.scaleSelf(scale, scale, scale, originX, originY, originZ);
    }
    scaleSelf(scaleX, scaleY, scaleZ, originX, originY, originZ) {
        // Not redundant with translate's checks because we need to negate the values later.
        if (typeof originX !== "number")
            originX = 0;
        if (typeof originY !== "number")
            originY = 0;
        if (typeof originZ !== "number")
            originZ = 0;
        this.translateSelf(originX, originY, originZ);
        if (typeof scaleX !== "number")
            scaleX = 1;
        if (typeof scaleY !== "number")
            scaleY = scaleX;
        if (typeof scaleZ !== "number")
            scaleZ = 1;
        this.values = multiply([scaleX, 0, 0, 0, 0, scaleY, 0, 0, 0, 0, scaleZ, 0, 0, 0, 0, 1], this.values);
        this.translateSelf(-originX, -originY, -originZ);
        if (scaleZ !== 1 || originZ !== 0) {
            this.is2D = false;
        }
        return this;
    }
    rotateFromVector(x, y) {
        return newInstance(this.values).rotateFromVectorSelf(x, y);
    }
    rotateFromVectorSelf(x = 0, y = 0) {
        const theta = x === 0 && y === 0 ? 0 : Math.atan2(y, x) * DEGREE_PER_RAD;
        return this.rotateSelf(theta);
    }
    rotate(rotX, rotY, rotZ) {
        return newInstance(this.values).rotateSelf(rotX, rotY, rotZ);
    }
    rotateSelf(rotX = 0, rotY = 0, rotZ = 0) {
        if (rotY === undefined && rotZ === undefined) {
            rotZ = rotX;
            rotX = rotY = 0;
        }
        if (typeof rotY !== "number")
            rotY = 0;
        if (typeof rotZ !== "number")
            rotZ = 0;
        if (rotX !== 0 || rotY !== 0) {
            this.is2D = false;
        }
        rotX *= RAD_PER_DEGREE;
        rotY *= RAD_PER_DEGREE;
        rotZ *= RAD_PER_DEGREE;
        let c = Math.cos(rotZ);
        let s = Math.sin(rotZ);
        this.values = multiply([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.values);
        c = Math.cos(rotY);
        s = Math.sin(rotY);
        this.values = multiply([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1], this.values);
        c = Math.cos(rotX);
        s = Math.sin(rotX);
        this.values = multiply([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1], this.values);
        return this;
    }
    rotateAxisAngle(x, y, z, angle) {
        return newInstance(this.values).rotateAxisAngleSelf(x, y, z, angle);
    }
    rotateAxisAngleSelf(x = 0, y = 0, z = 0, angle = 0) {
        const length = Math.sqrt(x * x + y * y + z * z);
        if (length === 0) {
            return this;
        }
        if (length !== 1) {
            x /= length;
            y /= length;
            z /= length;
        }
        angle *= RAD_PER_DEGREE;
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const t = 1 - c;
        const tx = t * x;
        const ty = t * y;
        this.values = multiply([
            tx * x + c,
            tx * y + s * z,
            tx * z - s * y,
            0,
            tx * y - s * z,
            ty * y + c,
            ty * z + s * x,
            0,
            tx * z + s * y,
            ty * z - s * x,
            t * z * z + c,
            0,
            0,
            0,
            0,
            1
        ], this.values);
        if (x !== 0 || y !== 0) {
            this.is2D = false;
        }
        return this;
    }
    skewX(sx) {
        return newInstance(this.values).skewXSelf(sx);
    }
    skewXSelf(sx) {
        if (typeof sx !== "number") {
            return this;
        }
        const t = Math.tan(sx * RAD_PER_DEGREE);
        this.values = multiply([1, 0, 0, 0, t, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.values);
        return this;
    }
    skewY(sy) {
        return newInstance(this.values).skewYSelf(sy);
    }
    skewYSelf(sy) {
        if (typeof sy !== "number") {
            return this;
        }
        const t = Math.tan(sy * RAD_PER_DEGREE);
        this.values = multiply([1, t, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.values);
        return this;
    }
    flipX() {
        return newInstance(multiply([-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.values));
    }
    flipY() {
        return newInstance(multiply([1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.values));
    }
    inverse() {
        return newInstance(this.values).invertSelf();
    }
    invertSelf() {
        // if (this.is2D) {
        // 	let det = this.values[Matrix2D.A] * this.values[Matrix2D.D] - this.values[Matrix2D.B] * this.values[Matrix2D.C]
        // 	// Invertable
        // 	if (det !== 0) {
        // 		let result = new DOMMatrix()
        // 		result.a = this.values[Matrix2D.D] / det
        // 		result.b = -this.values[Matrix2D.B] / det
        // 		result.c = -this.values[Matrix2D.C] / det
        // 		result.d = this.values[Matrix2D.A] / det
        // 		result.e = (this.values[Matrix2D.C] * this.values[Matrix2D.F] - this.values[Matrix2D.D] * this.values[Matrix2D.E]) / det
        // 		result.f = (this.values[Matrix2D.B] * this.values[Matrix2D.E] - this.values[Matrix2D.A] * this.values[Matrix2D.F]) / det
        // 		return result
        // 	}
        // 	// Not invertable
        // 	else {
        // 		this.is2D = false
        // 		this.values = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN] as any as Float64Array
        // 	}
        // } else {
        // 	throw new Error("3D matrix inversion is not implemented.")
        // }
    }
    setMatrixValue(transformList) {
        const temp = new DOMMatrix$1(transformList);
        this.values = temp.values;
        this.is2D = temp.is2D;
        return this;
    }
    transformPoint(point) {
        const x = point.x;
        const y = point.y;
        const z = point.z;
        const w = point.w;
        const values = this.values;
        const nx = values[Matrix3D.M11] * x + values[Matrix3D.M21] * y + values[Matrix3D.M31] * z + values[Matrix3D.M41] * w;
        const ny = values[Matrix3D.M12] * x + values[Matrix3D.M22] * y + values[Matrix3D.M32] * z + values[Matrix3D.M42] * w;
        const nz = values[Matrix3D.M13] * x + values[Matrix3D.M23] * y + values[Matrix3D.M33] * z + values[Matrix3D.M43] * w;
        const nw = values[Matrix3D.M14] * x + values[Matrix3D.M24] * y + values[Matrix3D.M34] * z + values[Matrix3D.M44] * w;
        return new DOMPoint(nx, ny, nz, nw);
    }
    toFloat32Array() {
        return Float32Array.from(this.values);
    }
    toFloat64Array() {
        return this.values.slice(0);
    }
    toString() {
        if (this.is2D) {
            return `matrix(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.e}, ${this.f})`;
        }
        else {
            return `matrix3d(${this.values.join(", ")})`;
        }
    }
}

// Used only as a polyfill for DOMPoint
// cf: https://drafts.fxtf.org/geometry/#DOMPoint
/* istanbul ignore file */
class DOMPoint$1 {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    static fromPoint(otherPoint) {
        return new DOMPoint$1(otherPoint.x, otherPoint.y, otherPoint.z !== undefined ? otherPoint.z : 0, otherPoint.w !== undefined ? otherPoint.w : 1);
    }
    matrixTransform(matrix) {
        if ((matrix.is2D || matrix instanceof SVGMatrix) && this.z === 0 && this.w === 1) {
            return new DOMPoint$1(this.x * matrix.a + this.y * matrix.c + matrix.e, this.x * matrix.b + this.y * matrix.d + matrix.f, 0, 1);
        }
        else {
            return new DOMPoint$1(this.x * matrix.m11 + this.y * matrix.m21 + this.z * matrix.m31 + this.w * matrix.m41, this.x * matrix.m12 + this.y * matrix.m22 + this.z * matrix.m32 + this.w * matrix.m42, this.x * matrix.m13 + this.y * matrix.m23 + this.z * matrix.m33 + this.w * matrix.m43, this.x * matrix.m14 + this.y * matrix.m24 + this.z * matrix.m34 + this.w * matrix.m44);
        }
    }
}

// Used only as a polyfill for DOMRect
/* istanbul ignore file */
class DOMRect$1 {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    static fromRect(otherRect) {
        return new DOMRect$1(otherRect.x, otherRect.y, otherRect.width, otherRect.height);
    }
    get top() {
        return this.y;
    }
    get left() {
        return this.x;
    }
    get right() {
        return this.x + this.width;
    }
    get bottom() {
        return this.y + this.height;
    }
}

/* istanbul ignore file */
class DOMVector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    get length() {
        return Math.hypot(this.x, this.y);
    }
    get lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    clone() {
        return new DOMVector2(this.x, this.y);
    }
    set(x = NaN, y = NaN) {
        if (!isNaN(x))
            this.x = x;
        if (!isNaN(y))
            this.y = y;
        return this;
    }
    angle() {
        const angle = Math.atan2(this.y, this.x);
        return toDegree(angle);
    }
    invert() {
        this.x = 1 / this.x;
        this.y = 1 / this.y;
        return this;
    }
    negate() {
        this.x *= -1;
        this.y *= -1;
        return this;
    }
    normalize() {
        let len = this.lengthSquared;
        if (len > 0)
            len = 1 / Math.sqrt(this.length);
        this.x *= len;
        this.y *= len;
        return this;
    }
    add(x = 0, y = 0) {
        this.x += x;
        this.y += y;
        return this;
    }
    round(decimals = 4) {
        this.x = roundTo(this.x, decimals);
        this.y = roundTo(this.y, decimals);
        return this;
    }
    scale(x = 1, y = 1) {
        this.x *= x;
        this.y *= y;
        return this;
    }
    toString() {
        return `[Vector ${this.x}, ${this.y}]`;
    }
}
class DOMVector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get length() {
        return Math.hypot(this.x, this.y, this.z);
    }
    get lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    clone() {
        return new DOMVector3(this.x, this.y, this.z);
    }
    set(x = NaN, y = NaN, z = NaN) {
        if (!isNaN(x))
            this.x = x;
        if (!isNaN(y))
            this.y = y;
        if (!isNaN(z))
            this.z = z;
        return this;
    }
    invert() {
        this.x = 1 / this.x;
        this.y = 1 / this.y;
        this.z = 1 / this.z;
        return this;
    }
    negate() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this;
    }
    normalize() {
        let len = this.lengthSquared;
        if (len > 0)
            len = 1 / Math.sqrt(this.length);
        this.x *= len;
        this.y *= len;
        this.z *= len;
        return this;
    }
    add(x = 0, y = 0, z = 0) {
        this.x += x;
        this.y += y;
        this.z += z;
        return this;
    }
    addVec(vec) {
        this.add(vec.x, vec.y, vec.z);
    }
    round(decimals = 4) {
        this.x = roundTo(this.x, decimals);
        this.y = roundTo(this.y, decimals);
        this.z = roundTo(this.z, decimals);
        return this;
    }
    scaleTo(val = 1) {
        return this.scale(val, val, val);
    }
    scale(x = 1, y = 1, z = 1) {
        this.x *= x;
        this.y *= y;
        this.z *= z;
        return this;
    }
    dot(vec) {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    }
    cross(vec) {
        this.x = this.y * vec.z - this.z * vec.y;
        this.y = this.z * vec.x - this.x * vec.z;
        this.z = this.x * vec.y - this.y * vec.x;
        return this;
    }
    toString() {
        return `[Vector ${this.x}, ${this.y}, ${this.z}]`;
    }
}

/* istanbul ignore file */
const m = globalThis.DOMMatrix ? DOMMatrix : DOMMatrix$1;
const p = globalThis.DOMPoint ? DOMPoint : DOMPoint$1;
const r = globalThis.DOMRect ? DOMRect : DOMRect$1;
const createMatrix = (t) => new m(t);
const createPoint = (x, y, z, w) => new p(x, y, z, w);
const createRect = (x, y, width, height) => new r(x, y, width, height);
const mapMatrix = (matrix, cb) => {
    matrix.m11 = cb(1, 1, matrix.m11);
    matrix.m12 = cb(1, 2, matrix.m12);
    matrix.m13 = cb(1, 3, matrix.m13);
    matrix.m14 = cb(1, 4, matrix.m14);
    matrix.m21 = cb(2, 1, matrix.m21);
    matrix.m22 = cb(2, 2, matrix.m22);
    matrix.m23 = cb(2, 3, matrix.m23);
    matrix.m24 = cb(2, 4, matrix.m24);
    matrix.m31 = cb(3, 1, matrix.m31);
    matrix.m32 = cb(3, 2, matrix.m32);
    matrix.m33 = cb(3, 3, matrix.m33);
    matrix.m34 = cb(3, 4, matrix.m34);
    matrix.m41 = cb(4, 1, matrix.m41);
    matrix.m42 = cb(4, 2, matrix.m42);
    matrix.m43 = cb(4, 3, matrix.m43);
    matrix.m44 = cb(4, 4, matrix.m44);
};
// set identity matrix
const resetMatrix = (matrix) => mapMatrix(matrix, (i, j) => (i === j ? 1 : 0));
const matrix3dValues = (matrix) => {
    return [
        matrix.m11,
        matrix.m12,
        matrix.m13,
        matrix.m14,
        matrix.m21,
        matrix.m22,
        matrix.m23,
        matrix.m24,
        matrix.m31,
        matrix.m32,
        matrix.m33,
        matrix.m34,
        matrix.m41,
        matrix.m42,
        matrix.m43,
        matrix.m44
    ];
};
const matrix3dToCSS = (matrix) => {
    return `matrix3d(${matrix3dValues(matrix).join(",")})`;
};
const matrix2dToCSS = (matrix) => {
    return `matrix(${[matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f].join(",")})`;
};
const quatToDeg = (quaternion) => {
    const [qx, qy, qz, qw] = quaternion;
    const qw2 = qw * qw;
    const qx2 = qx * qx;
    const qy2 = qy * qy;
    const qz2 = qz * qz;
    const test = qx * qy + qz * qw;
    const unit = qw2 + qx2 + qy2 + qz2;
    const conv = 180 / Math.PI;
    if (test > 0.49999 * unit) {
        return [0, 2 * Math.atan2(qx, qw) * conv, 90];
    }
    if (test < -0.49999 * unit) {
        return [0, -2 * Math.atan2(qx, qw) * conv, -90];
    }
    return [
        Math.atan2(2 * qx * qw - 2 * qy * qz, 1 - 2 * qx2 - 2 * qz2) * conv,
        Math.atan2(2 * qy * qw - 2 * qx * qz, 1 - 2 * qy2 - 2 * qz2) * conv,
        Math.asin(2 * qx * qy + 2 * qz * qw) * conv
    ];
};
const decomposeMatrix = (matrix) => {
    const quat = new Array(4);
    const scale = ArrayExt.createSimilar(3, 0);
    const skew = ArrayExt.createSimilar(3, 0);
    const translation = ArrayExt.createSimilar(3, 0);
    // translation
    translation[0] = matrix.m41;
    translation[1] = matrix.m42;
    translation[2] = matrix.m43;
    // scale & shear
    const norm = [
        new DOMVector3(matrix.m11, matrix.m12, matrix.m13),
        new DOMVector3(matrix.m21, matrix.m22, matrix.m23),
        new DOMVector3(matrix.m31, matrix.m32, matrix.m33)
    ];
    // Compute X scale & XY shear
    scale[0] = norm[0].length;
    norm[0].scaleTo(1 / scale[0]);
    skew[0] = norm[0].dot(norm[1]);
    norm[1].addVec(norm[0].clone().scaleTo(-skew[0]));
    // Compute Y scale
    scale[1] = norm[1].length;
    norm[1].scaleTo(1 / scale[1]);
    skew[0] /= scale[1];
    // Compute XZ and YZ shears
    skew[1] = norm[0].dot(norm[2]);
    norm[2].addVec(norm[0].clone().scaleTo(-skew[1]));
    skew[2] = norm[1].dot(norm[2]);
    norm[2].addVec(norm[1].clone().scaleTo(-skew[2]));
    // Compute Z scale
    scale[2] = norm[2].length;
    norm[2].scaleTo(1 / scale[2]);
    skew[1] /= scale[2];
    skew[2] /= scale[2];
    // Check determinant -1 (negate & scale)
    const pdum = norm[1].clone().cross(norm[2]);
    if (norm[0].clone().dot(pdum) < 0) {
        for (let i = 0; i < 3; i++) {
            scale[i] *= -1;
            norm[i].x *= -1;
            norm[i].y *= -1;
            norm[i].z *= -1;
        }
    }
    // Now, get the rotations out
    quat[0] = 0.5 * Math.sqrt(Math.max(1 + norm[0].x - norm[1].y - norm[2].z, 0));
    quat[1] = 0.5 * Math.sqrt(Math.max(1 - norm[0].x + norm[1].y - norm[2].z, 0));
    quat[2] = 0.5 * Math.sqrt(Math.max(1 - norm[0].x - norm[1].y + norm[2].z, 0));
    quat[3] = 0.5 * Math.sqrt(Math.max(1 + norm[0].x + norm[1].y + norm[2].z, 0));
    if (norm[2].y > norm[1].z)
        quat[0] = -quat[0];
    if (norm[0].z > norm[2].x)
        quat[1] = -quat[1];
    if (norm[1].x > norm[0].y)
        quat[2] = -quat[2];
    // Convert to degree
    let rotation = [];
    if (quat[0] >= 0 && quat[0] < 0.001 && quat[1] >= 0 && quat[1] < 0.001) {
        rotation = [0, 0, (Math.atan2(norm[0].y, norm[0].x) * 180) / Math.PI];
    }
    else {
        rotation = quatToDeg(quat);
    }
    return {
        translate: { x: roundTo(translation[0], 4), y: roundTo(translation[1], 4), z: roundTo(translation[2], 4) },
        rotate: { x: roundTo(rotation[0], 4), y: roundTo(rotation[1], 4), z: roundTo(rotation[2], 4) },
        scale: { x: roundTo(scale[0], 4), y: roundTo(scale[1], 4), z: roundTo(scale[2], 4) }
    };
};

class DOM {
    /* istanbul ignore next */
    static get doc() {
        if (!this.document) {
            if (!globalThis.document)
                throw new Error("unknown document");
            this.document = document;
        }
        return this.document;
    }
    static setup(doc) {
        DOM.document = doc;
    }
    static createElement(tagName, options = {}) {
        const el = DOM.doc.createElement(tagName, options);
        return el;
    }
    static createText(value) {
        const el = DOM.createElement("span");
        DOM.setText(el, value);
        return el;
    }
    static setText(el, value) {
        el.innerHTML = value;
    }
    static setAttr(el, options) {
        for (const id in options) {
            if (el.getAttribute(id) === options[id])
                continue;
            el.setAttribute(id, options[id]);
        }
    }
    static setStyle(el, styles) {
        for (const entry of Object.entries(styles)) {
            if (el.style[entry[0]] === entry[1])
                continue;
            el.style[entry[0]] = entry[1];
        }
    }
}

/* istanbul ignore file */
function createImageContext(width = 200, height = 200, action) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    action(ctx);
    return canvas.toDataURL();
}
function createCircle(options) {
    const size = options.size || 64;
    return createImageContext(size, size, ctx => {
        ctx.beginPath();
        ctx.lineWidth = options.lineWidth || 5;
        ctx.arc(size / 2, size / 2, size / 2 - ctx.lineWidth, 0, 2 * Math.PI);
        ctx.fillStyle = options.color || "#FFF";
        ctx.fill();
        ctx.strokeStyle = options.strokeColor || "#000";
        ctx.stroke();
    });
}

class Color {
    //#endregion Default Pallette
    constructor(h, s, l) {
        this.color = { h: Math.round(h), s: Math.round(s), l: Math.round(l) };
        this.validate();
    }
    //#endregion Default Colors
    //#region Default Pallette
    static americanPallette() {
        return [
            Color.fromRGB([85, 239, 196]),
            Color.fromRGB([0, 184, 148]),
            Color.fromRGB([255, 234, 167]),
            Color.fromRGB([253, 203, 110]),
            Color.fromRGB([129, 236, 236]),
            Color.fromRGB([0, 206, 201]),
            Color.fromRGB([250, 177, 160]),
            Color.fromRGB([225, 112, 85]),
            Color.fromRGB([116, 185, 255]),
            Color.fromRGB([9, 132, 227]),
            Color.fromRGB([255, 118, 117]),
            Color.fromRGB([214, 48, 49]),
            Color.fromRGB([162, 155, 254]),
            Color.fromRGB([108, 92, 231]),
            Color.fromRGB([253, 121, 168]),
            Color.fromRGB([232, 67, 147]),
            Color.fromRGB([223, 230, 233]),
            Color.fromRGB([178, 190, 195]),
            Color.fromRGB([99, 110, 114]),
            Color.fromRGB([45, 52, 54])
        ];
    }
    static flatPallette() {
        return [
            Color.fromRGB([26, 188, 156]),
            Color.fromRGB([22, 160, 133]),
            Color.fromRGB([241, 196, 15]),
            Color.fromRGB([243, 156, 18]),
            Color.fromRGB([46, 204, 113]),
            Color.fromRGB([39, 174, 96]),
            Color.fromRGB([230, 126, 34]),
            Color.fromRGB([211, 84, 0]),
            Color.fromRGB([52, 152, 219]),
            Color.fromRGB([41, 128, 185]),
            Color.fromRGB([231, 76, 60]),
            Color.fromRGB([192, 57, 43]),
            Color.fromRGB([155, 89, 182]),
            Color.fromRGB([142, 68, 173]),
            Color.fromRGB([236, 240, 241]),
            Color.fromRGB([189, 195, 199]),
            Color.fromRGB([52, 73, 94]),
            Color.fromRGB([44, 62, 80]),
            Color.fromRGB([149, 165, 166]),
            Color.fromRGB([127, 140, 141])
        ];
    }
    static germanPallette() {
        return [
            Color.fromRGB([252, 92, 101]),
            Color.fromRGB([253, 150, 68]),
            Color.fromRGB([254, 211, 48]),
            Color.fromRGB([38, 222, 129]),
            Color.fromRGB([43, 203, 186]),
            Color.fromRGB([235, 59, 90]),
            Color.fromRGB([250, 130, 49]),
            Color.fromRGB([247, 183, 49]),
            Color.fromRGB([32, 191, 107]),
            Color.fromRGB([15, 185, 177]),
            Color.fromRGB([69, 170, 242]),
            Color.fromRGB([75, 123, 236]),
            Color.fromRGB([165, 94, 234]),
            Color.fromRGB([209, 216, 224]),
            Color.fromRGB([119, 140, 163]),
            Color.fromRGB([45, 152, 218]),
            Color.fromRGB([56, 103, 214]),
            Color.fromRGB([136, 84, 208]),
            Color.fromRGB([165, 177, 194]),
            Color.fromRGB([75, 101, 132])
        ];
    }
    validate() {
        this.color.h = Math.max(this.color.h % 360, 0);
        this.color.s = clamp(this.color.s, 0, 100);
        this.color.l = clamp(this.color.l, 0, 100);
    }
    hue2rgb(p, q, t) {
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        if (t < 1 / 6)
            return p + (q - p) * 6 * t;
        if (t < 1 / 2)
            return q;
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
    clone() {
        return new Color(this.color.h, this.color.s, this.color.l);
    }
    equals(color) {
        return (numberEqual(this.color.h, color.color.h) &&
            numberEqual(this.color.s, color.color.s) &&
            numberEqual(this.color.l, color.color.l));
    }
    static random() {
        return new Color(rng.randRangeFloat(0, 360), rng.randRangeFloat(30, 95), rng.randRangeFloat(30, 95));
    }
    static gradient(start, end, num = 16) {
        let diffH = (end.color.h - start.color.h) / num;
        if (end.color.h - start.color.h >= 180) {
            diffH = (end.color.h - start.color.h - 360) / num;
        }
        else if (end.color.h - start.color.h <= -180) {
            diffH = (end.color.h - start.color.h + 360) / num;
        }
        const diffS = (end.color.s - start.color.s) / num;
        const diffL = (end.color.l - start.color.l) / num;
        const colors = [];
        for (let i = 0; i < num; i++) {
            const c = new Color(Math.round(start.color.h + diffH * i), Math.round(start.color.s + diffS * i), Math.round(start.color.l + diffL * i));
            colors.push(c);
        }
        return colors;
    }
    static palette(hue, level = 3, seed = -1) {
        const random = seed >= 0 ? rng.createSeededRandom(seed) : rng;
        const variations = [];
        for (let i = 1; i <= level; i++) {
            variations.push([random.randRangeFloat(30, 95), random.randRangeFloat(30, 95)]);
        }
        let value = random.randRangeFloat(0, 360);
        const colors = [];
        const diff = 360 / hue;
        while (hue > 0) {
            value += diff;
            for (const variation of variations) {
                colors.push(new Color(value, variation[0], variation[1]));
            }
            hue--;
        }
        return colors;
    }
    //#region Export color
    rgb() {
        const h = this.color.h / 360;
        const s = this.color.s / 100;
        const l = this.color.l / 100;
        let r = l;
        let g = l;
        let b = l;
        if (s !== 0) {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = this.hue2rgb(p, q, h + 1 / 3);
            g = this.hue2rgb(p, q, h);
            b = this.hue2rgb(p, q, h - 1 / 3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
    toHexByte(number) {
        let hexByte = number.toString(16);
        if (hexByte.length < 2)
            hexByte = "0" + hexByte;
        return hexByte.toUpperCase();
    }
    hex() {
        const rgb = this.rgb();
        return `#${this.toHexByte(rgb[0])}${this.toHexByte(rgb[1])}${this.toHexByte(rgb[2])}`;
    }
    hsl() {
        return [this.color.h, this.color.s, this.color.l];
    }
    //#endregion Export color
    //#region Import color
    static fromHSL(hsl) {
        return new Color(hsl[0], hsl[1], hsl[2]);
    }
    static fromHex(hex) {
        if (hex.substring(0, 1) == "#")
            hex = hex.substring(1);
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return Color.fromRGB([r, g, b]);
    }
    static fromRGB(rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = (max + min) / 2;
        let s = 0;
        let l = h;
        if (max == min) {
            h = 0;
            s = 0;
        }
        else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h = h / 6;
        }
        h = Math.round(360 * h);
        s = Math.round(100 * s);
        l = Math.round(100 * l);
        return new Color(h, s, l);
    }
}
//#region Default Colors
// gray scale
Color.white = () => Color.fromRGB([255, 255, 255]);
Color.silver = () => Color.fromRGB([192, 192, 192]);
Color.gray = () => Color.fromRGB([128, 128, 128]);
Color.black = () => Color.fromRGB([0, 0, 0]);
// rgb
Color.red = () => Color.fromRGB([255, 0, 0]);
Color.maroon = () => Color.fromRGB([128, 0, 0]);
Color.green = () => Color.fromRGB([0, 255, 0]);
Color.greenDeep = () => Color.fromRGB([0, 128, 0]);
Color.blue = () => Color.fromRGB([0, 0, 255]);
Color.navy = () => Color.fromRGB([0, 0, 128]);
// mix
Color.yellow = () => Color.fromRGB([255, 255, 0]);
Color.yellowPale = () => Color.fromRGB([255, 255, 128]);
Color.olive = () => Color.fromRGB([128, 128, 0]);
Color.aqua = () => Color.fromRGB([0, 255, 255]);
Color.cyan = () => Color.fromRGB([128, 255, 255]);
Color.teal = () => Color.fromRGB([0, 128, 128]);
Color.pink = () => Color.fromRGB([255, 0, 255]);
Color.purple = () => Color.fromRGB([128, 0, 128]);
Color.magenta = () => Color.fromRGB([255, 128, 255]);
// half mix
Color.orange = () => Color.fromRGB([255, 128, 0]);
Color.rose = () => Color.fromRGB([255, 0, 128]);
Color.flamingo = () => Color.fromRGB([255, 128, 128]);
Color.kiwi = () => Color.fromRGB([128, 255, 0]);
Color.greenLime = () => Color.fromRGB([0, 255, 128]);
Color.greenPale = () => Color.fromRGB([128, 255, 128]);
Color.blueBolt = () => Color.fromRGB([0, 128, 255]);
Color.violet = () => Color.fromRGB([128, 0, 255]);
Color.blueSky = () => Color.fromRGB([128, 128, 255]);

/* istanbul ignore file */
/**
 * Basic Transform class, provide (position, rotation, scale) and take care of transformation
 *
 * @export
 * @class TransformMatrix
 */
class TransformMatrix {
    constructor() {
        this._child = [];
        this.matrix = createMatrix();
        this.position = onChange(new DOMVector3(0, 0, 0), () => this.compute());
        this.rotation = onChange(new DOMVector3(0, 0, 0), () => this.compute());
        this.scale = onChange(new DOMVector3(1, 1, 1), () => this.compute());
        this.onChanged = new Event();
        this.onParentChanged = new Event();
    }
    get parent() {
        return this._parent;
    }
    set parent(p) {
        if (p === this._parent)
            return;
        if (this._parent) {
            ArrayExt.remove(this._parent._child, this);
        }
        this._parent = p;
        this.onParentChanged.emit(p);
        if (this._parent) {
            this._parent._child.push(this);
        }
    }
    get globalMatrix() {
        const mat = createMatrix(matrix3dValues(this.matrix));
        if (this.parent) {
            const el = this.parent;
            mat.multiplySelf(el.globalMatrix);
        }
        return mat;
    }
    compute() {
        resetMatrix(this.matrix);
        this.matrix.translateSelf(this.position.x, this.position.y, this.position.z);
        this.matrix.rotateSelf(this.rotation.x, this.rotation.y, this.rotation.z);
        this.matrix.scaleSelf(this.scale.x, this.scale.y, this.scale.z);
        this.onChanged.emit();
    }
    toCSS() {
        return {
            transform: matrix3dToCSS(this.matrix)
        };
    }
    toCSS2D() {
        return {
            transform: matrix2dToCSS(this.matrix)
        };
    }
}

/* istanbul ignore file */
/**
 * Extend Transform matrix and add simple layout system with pivot, anchor and size
 *
 * @export
 * @class RectTransformMatrix
 */
class RectTransformMatrix extends TransformMatrix {
    constructor(x = 1280, y = 720) {
        super();
        this._child = [];
        this.rectMatrix = createMatrix();
        this.computedtMatrix = createMatrix();
        this.skew = onChange(new DOMVector2(0, 0), () => this.computeRect());
        this.pivot = onChange(new DOMVector2(0.5, 0.5), () => this.computeRect());
        this.anchor = onChange(new DOMVector2(0.5, 0.5), () => this.computeRect());
        this.size = onChange(new DOMVector2(1, 1), () => this.computeRect());
        this.res = new DOMVector2(x, y);
    }
    get parent() {
        return this._parent;
    }
    set parent(p) {
        if (p === this._parent)
            return;
        if (this._parent) {
            ArrayExt.remove(this._parent._child, this);
        }
        this._parent = p;
        this.computeRect();
        this.onParentChanged.emit(p);
        if (this._parent) {
            this._parent._child.push(this);
        }
    }
    get angle() {
        return this.rotation.z;
    }
    set angle(val) {
        this.rotation.z = val;
    }
    get compensatedSize() {
        if (this.parent) {
            return this.parent.size.clone().invert();
        }
        return new DOMVector2((this.anchor.x - 0.5) * this.res.x, (this.anchor.y - 0.5) * this.res.y);
    }
    get localOrigin() {
        let point = new DOMPoint();
        point = point.matrixTransform(this.matrix);
        point.x /= this.res.x;
        point.y /= this.res.y;
        return point;
    }
    get globalOrigin() {
        let point = new DOMPoint();
        point = point.matrixTransform(this.globalMatrix);
        point.x /= this.res.x;
        point.y /= this.res.y;
        return point;
    }
    get globalMatrix() {
        const queue = [this];
        let self = this;
        while (self.parent) {
            queue.push(self.parent);
            self = self.parent;
        }
        const mat = createMatrix(matrix3dValues(queue[queue.length - 1].matrix));
        queue.pop();
        while (queue.length > 0) {
            const element = queue.pop();
            if (!element)
                continue;
            mat.multiplySelf(element.matrix);
        }
        return mat;
    }
    setParentFix(p) {
        const before = this.globalMatrix;
        const dec1 = decomposeMatrix(before);
        this.parent = p;
        const after = this.globalMatrix;
        if (!this.parent)
            return;
        const dec2 = decomposeMatrix(after);
        this.scale.x *= dec1.scale.x / dec2.scale.x;
        this.scale.y *= dec1.scale.y / dec2.scale.y;
        this.scale.z *= dec1.scale.z / dec2.scale.z;
        this.rotation.x += dec1.rotate.x - dec2.rotate.x;
        this.rotation.y += dec1.rotate.y - dec2.rotate.y;
        this.rotation.z += dec1.rotate.z - dec2.rotate.z;
        this.position.x += (dec1.translate.x - dec2.translate.x) / this.parent.size.x / this.res.x;
        this.position.y += (dec1.translate.y - dec2.translate.y) / this.parent.size.y / this.res.y;
        this.position.z += dec1.translate.z - dec2.translate.z;
    }
    computeRect(updateChild = false) {
        resetMatrix(this.rectMatrix);
        const piv = this.pivot
            .clone()
            .add(-0.5, -0.5)
            .scale(this.res.x, this.res.y);
        // compute
        this.rectMatrix.scaleSelf(this.size.x, this.size.y, 1);
        if (this.parent) {
            this.rectMatrix.scaleSelf(1 / this.parent.size.x, 1 / this.parent.size.y, 1);
        }
        this.rectMatrix.translateSelf(-piv.x, -piv.y, 0);
        this.compute();
        if (updateChild) {
            for (const child of this._child) {
                child.computeRect();
            }
        }
    }
    compute() {
        resetMatrix(this.computedtMatrix);
        const skew = this.skew.clone().scale(this.res.x, this.res.y);
        const pos = this.position.clone().scale(this.res.x, this.res.y, 1);
        const anc = this.anchor
            .clone()
            .add(-0.5, -0.5)
            .scale(this.res.x, this.res.y);
        this.computedtMatrix.translateSelf(anc.x, anc.y, 0);
        // compute
        this.computedtMatrix.translateSelf(pos.x, pos.y, pos.z);
        this.computedtMatrix.rotateSelf(this.rotation.x, this.rotation.y, this.rotation.z);
        if (skew.x !== 0)
            this.computedtMatrix.skewXSelf(skew.x);
        if (skew.y !== 0)
            this.computedtMatrix.skewYSelf(skew.y);
        this.computedtMatrix.scaleSelf(this.scale.x, this.scale.y, this.scale.z);
        // compute result
        resetMatrix(this.matrix);
        this.matrix.preMultiplySelf(this.computedtMatrix);
        this.matrix.multiplySelf(this.rectMatrix);
        this.onChanged.emit();
    }
}

const name = "Coopa";

export { ARRAY_TYPE, ArrayExt, BinarySearchTree, Color, DOM, DOMVector2, DOMVector3, DelayedEvent, EPSILON, Event, EventBus, EventBusChannel, EventBusChannelDelayed, EventBusChannelType, LogLevel, Logger, ObjectExt, PriorityQueue, PriorityQueueOrder, RANDOM, Random, RectTransformMatrix, SeededRandom, SquareGrid, SquareGridNodeType, SquareGridWall, StringExt, TransformMatrix, clamp, clamp01, createCircle, createImageContext, createMatrix, createPoint, createRect, decomposeMatrix, equals, inRange, logger, mapMatrix, matrix2dToCSS, matrix3dToCSS, matrix3dValues, name, now, numberEqual, onChange, perf, resetMatrix, rng, roundTo, toDegree, toRadian, uid };
