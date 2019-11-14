// [COOPA] Build: 0.1.7 - November 15, 2019
// inspired by https://algs4.cs.princeton.edu/31elementary/
class TreeNode {
    constructor(key, val) {
        this.key = key;
        this.val = val;
    }
    toString() {
        this.print("", this, false);
    }
    print(prefix, node, isLeft) {
        if (node != null) {
            console.log(prefix + (isLeft ? "|-- " : "\\-- ") + node.key);
            this.print(prefix + (isLeft ? "|   " : "    "), node.left, true);
            this.print(prefix + (isLeft ? "|   " : "    "), node.right, false);
        }
    }
}
/**
 * Binary search tree
 * @template Key
 * @template Val
 */
class BinarySearchTree {
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
            var t = node;
            node = this.min(node.right);
            node.right = this.recursiveDelMin(t.right);
            node.left = t.left;
        }
        return node;
    }
    min(node) {
        if (node.left == null) {
            return node;
        }
        return this.min(node.left);
    }
    /**
     * Return all tree nodes in binary search tree
     * @returns entries
     */
    entries() {
        var array = [];
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
        var array = [];
        this.entriesRecursively(this.root, array);
        return array.map(x => x.key);
    }
    /**
     * Return true if binary search tree contains key
     * @param key
     * @returns true if has
     */
    has(key) {
        var keys = this.keys();
        return keys.indexOf(key) > -1;
    }
    /**
     * Return all values in binary search tree
     * @returns values
     */
    values() {
        var array = [];
        this.entriesRecursively(this.root, array);
        return array.map(x => x.val);
    }
    /**
     * Prints binary search tree
     * @returns
     */
    print() {
        if (this.root != null) {
            return this.root.toString();
        }
        return "";
    }
}

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
let parseMatrix = (init) => {
    let parsed = init.replace(/matrix\(/, "");
    parsed = parsed.split(/,/, 7);
    if (parsed.length !== 6) {
        throw new Error(`Failed to parse ${init}`);
    }
    parsed = parsed.map(parseFloat);
    return [parsed[0], parsed[1], 0, 0, parsed[2], parsed[3], 0, 0, 0, 0, 1, 0, parsed[4], parsed[5], 0, 1];
};
let parseMatrix3d = (init) => {
    let parsed = init.replace(/matrix3d\(/, "");
    parsed = parsed.split(/,/, 17);
    if (parsed.length !== 16) {
        throw new Error(`Failed to parse ${init}`);
    }
    return parsed.map(parseFloat);
};
let parseTransform = (tform) => {
    let type = tform.split(/\(/, 1)[0];
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
let getNumber = (receiver, index) => {
    return receiver.values[index];
};
let setNumber2D = (receiver, index, value) => {
    if (typeof value !== "number") {
        throw new TypeError("Expected number");
    }
    receiver.values[index] = value;
};
let setNumber3D = (receiver, index, value) => {
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
let newInstance = (values) => {
    let instance = Object.create(DOMMatrix$1.prototype);
    instance.constructor = DOMMatrix$1;
    instance.is2D = true;
    instance.values = values;
    return instance;
};
let multiply = (first, second) => {
    let dest = new Float64Array(16);
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
                let tforms = init.split(/\)\s+/, 20).map(parseTransform);
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
        var arr = init;
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
        let values = this.values;
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
        let theta = x === 0 && y === 0 ? 0 : Math.atan2(y, x) * DEGREE_PER_RAD;
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
        let length = Math.sqrt(x * x + y * y + z * z);
        if (length === 0) {
            return this;
        }
        if (length !== 1) {
            x /= length;
            y /= length;
            z /= length;
        }
        angle *= RAD_PER_DEGREE;
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        let t = 1 - c;
        let tx = t * x;
        let ty = t * y;
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
        let t = Math.tan(sx * RAD_PER_DEGREE);
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
        let t = Math.tan(sy * RAD_PER_DEGREE);
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
        let temp = new DOMMatrix$1(transformList);
        this.values = temp.values;
        this.is2D = temp.is2D;
        return this;
    }
    transformPoint(point) {
        let x = point.x;
        let y = point.y;
        let z = point.z;
        let w = point.w;
        let values = this.values;
        let nx = values[Matrix3D.M11] * x + values[Matrix3D.M21] * y + values[Matrix3D.M31] * z + values[Matrix3D.M41] * w;
        let ny = values[Matrix3D.M12] * x + values[Matrix3D.M22] * y + values[Matrix3D.M32] * z + values[Matrix3D.M42] * w;
        let nz = values[Matrix3D.M13] * x + values[Matrix3D.M23] * y + values[Matrix3D.M33] * z + values[Matrix3D.M43] * w;
        let nw = values[Matrix3D.M14] * x + values[Matrix3D.M24] * y + values[Matrix3D.M34] * z + values[Matrix3D.M44] * w;
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

// @info
//   DOMPoint polyfill
// @src
//   https://drafts.fxtf.org/geometry/#DOMPoint
//   https://github.com/chromium/chromium/blob/master/third_party/blink/renderer/core/geometry/dom_point_read_only.cc
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

var math = /*#__PURE__*/Object.freeze({
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
        return new DOMVector3(this.x, this.y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    negate() {
        this.x *= -1;
        this.y *= -1;
    }
    normalize() {
        let len = this.lengthSquared;
        if (len > 0)
            len = 1 / Math.sqrt(this.length);
        this.x *= len;
        this.y *= len;
    }
    add(x = 0, y = 0) {
        this.x += x;
        this.y += y;
    }
    round(decimals = 4) {
        this.x = roundTo(this.x, decimals);
        this.y = roundTo(this.y, decimals);
    }
    scale(x = 1, y = 1) {
        this.x *= x;
        this.y *= y;
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
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    negate() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
    }
    normalize() {
        let len = this.lengthSquared;
        if (len > 0)
            len = 1 / Math.sqrt(this.length);
        this.x *= len;
        this.y *= len;
    }
    add(x = 0, y = 0, z = 0) {
        this.x += x;
        this.y += y;
        this.z += z;
    }
    round(decimals = 4) {
        this.x = roundTo(this.x, decimals);
        this.y = roundTo(this.y, decimals);
        this.z = roundTo(this.z, decimals);
    }
    scale(x = 1, y = 1, z = 1) {
        this.x *= x;
        this.y *= y;
        this.z *= z;
    }
    toString() {
        return `[Vector ${this.x}, ${this.y}, ${this.z}]`;
    }
}

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
    return `matrix2d(${[matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f].join(",")})`;
};

class DOM {
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
        var el = DOM.doc.createElement(tagName, options);
        return el;
    }
    static createText(value) {
        var el = DOM.createElement("span");
        DOM.setText(el, value);
        return el;
    }
    static setText(el, value) {
        el.innerHTML = value;
    }
    static setAttr(el, options) {
        for (var id in options) {
            if (el.getAttribute(id) === options[id])
                continue;
            el.setAttribute(id, options[id]);
        }
    }
    static setStyle(el, styles) {
        for (var entry of Object.entries(styles)) {
            if (el.style[entry[0]] === entry[1])
                continue;
            el.style[entry[0]] = entry[1];
        }
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

/**
 * Basic Transform class, provide (position, rotation, scale) and take care of transformation
 *
 * @export
 * @class TransformMatrix
 */
class TransformMatrix {
    constructor() {
        this.matrix = createMatrix();
        this.position = onChange([0, 0, 0], () => this.compute());
        this.rotation = onChange([0, 0, 0], () => this.compute());
        this.scale = onChange([1, 1, 1], () => this.compute());
    }
    get global() {
        let mat = createMatrix(matrix3dValues(this.matrix));
        let el = this;
        while (!!el.parent) {
            el = el.parent;
            mat.multiply(el.matrix);
        }
        return mat;
    }
    compute(reset = true) {
        if (reset)
            resetMatrix(this.matrix);
        this.matrix.translateSelf(this.position[0], this.position[1], this.position[2]);
        this.matrix.rotateSelf(this.rotation[0], this.rotation[1], this.rotation[2]);
        this.matrix.scaleSelf(this.scale[0], this.scale[1], this.scale[2]);
    }
    toCSS() {
        return matrix3dToCSS(this.matrix);
    }
}

/**
 * Extend Transform matrix and add simple layout system with pivot, anchor and size
 *
 * @export
 * @class RectTransformMatrix
 */
class RectTransformMatrix extends TransformMatrix {
    constructor() {
        super();
        this.rect = createRect();
        this.pivot = onChange(new DOMVector2(0.5, 0.5), () => this.computeRect());
        this.anchor = onChange(new DOMVector2(0.5, 0.5), () => this.computeRect());
        this.size = onChange(new DOMVector2(1, 1), () => this.computeRect());
    }
    // setPivotFix(x: number, y: number) {
    // }
    // setAnchorFix(x: number, y: number) {
    // }
    // setSizeFix(x: number, y: number) {
    // }
    computeRect() {
        var w = this.parent ? this.parent.size.x : 1;
        var h = this.parent ? this.parent.size.y : 1;
        this.rect.width = this.size.x;
        this.rect.height = this.size.y;
        this.rect.x = this.anchor.x * w - this.pivot.x * this.size.x;
        this.rect.y = this.anchor.y * h - this.pivot.y * this.size.y;
        this.compute();
    }
    compute(reset = true) {
        if (reset)
            resetMatrix(this.matrix);
        // compute
        this.matrix.translateSelf(this.pivot.x, this.pivot.y);
        super.compute(false);
        this.matrix.translateSelf(-this.pivot.x, -this.pivot.y);
        this.matrix.translateSelf(-this.rect.x / 2, -this.rect.y / 2);
    }
}

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

export { ArrayExt, BinarySearchTree, DOM, DOMVector2, DOMVector3, Event, LogLevel, ObjectExt, Random, RectTransformMatrix, SeededRandom, StringExt, TransformMatrix, createMatrix, createPoint, createRect, logger, mapMatrix, math, matrix2dToCSS, matrix3dToCSS, matrix3dValues, name, now, onChange, perf, resetMatrix, rng, uid };
