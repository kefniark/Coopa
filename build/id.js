"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.uid = uid;
//# sourceMappingURL=id.js.map