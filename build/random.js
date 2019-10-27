"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.Random = Random;
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
        return exports.rng.randRangeFloat(min, max, this.next());
    }
    randRangeInt(min, max) {
        return exports.rng.randRangeInt(min, max, this.next());
    }
    randArray(arr) {
        const index = exports.rng.randRangeInt(0, arr.length - 1);
        return arr[index];
    }
}
exports.SeededRandom = SeededRandom;
exports.rng = new Random();
//# sourceMappingURL=random.js.map