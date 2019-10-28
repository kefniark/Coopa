"use strict";
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
