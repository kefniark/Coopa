"use strict";
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
//# sourceMappingURL=string.js.map