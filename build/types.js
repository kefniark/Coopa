export function isString(val) {
    return Object.prototype.toString.call(val) === "[object String]";
}
export function isArray(val) {
    return Array.isArray(val);
}
export function isNumeric(value) {
    return !isNaN(value - parseFloat(value));
}
export function isObjectEmpty(obj) {
    if (!obj || typeof obj !== "object")
        return true;
    for (var a in obj)
        if (obj.hasOwnProperty(a))
            return false;
    return true;
}
export function clone(obj) {
    return Object.assign({}, obj);
}
