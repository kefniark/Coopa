// [COOPA] Build: 0.2.2 - November 19, 2019
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.Coopa = {}));
}(this, (function (exports) { 'use strict';

	// inspired by https://algs4.cs.princeton.edu/31elementary/
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

	var math = /*#__PURE__*/Object.freeze({
		__proto__: null,
		EPSILON: EPSILON,
		ARRAY_TYPE: ARRAY_TYPE,
		RANDOM: RANDOM,
		toRadian: toRadian,
		toDegree: toDegree,
		numberEqual: numberEqual,
		roundTo: roundTo,
		equals: equals
	});

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
	    return `matrix2d(${[matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f].join(",")})`;
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
	/**
	 * Delay event to be processed later
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
	        for (const evt of this.queue) {
	            this.ouput.emit(evt);
	        }
	        this.queue.length = 0;
	    }
	    emit(event, force = false) {
	        if (force)
	            return this.ouput.emit(event);
	        if (this.distinct) {
	            if (this.queue.includes(event))
	                return;
	        }
	        this.queue.push(event);
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
	    toCSS() {
	        return super.toCSS();
	    }
	}

	const name = "Coopa";

	exports.ArrayExt = ArrayExt;
	exports.BinarySearchTree = BinarySearchTree;
	exports.DOM = DOM;
	exports.DOMVector2 = DOMVector2;
	exports.DOMVector3 = DOMVector3;
	exports.DelayedEvent = DelayedEvent;
	exports.Event = Event;
	exports.ObjectExt = ObjectExt;
	exports.Random = Random;
	exports.RectTransformMatrix = RectTransformMatrix;
	exports.SeededRandom = SeededRandom;
	exports.StringExt = StringExt;
	exports.TransformMatrix = TransformMatrix;
	exports.createCircle = createCircle;
	exports.createImageContext = createImageContext;
	exports.createMatrix = createMatrix;
	exports.createPoint = createPoint;
	exports.createRect = createRect;
	exports.decomposeMatrix = decomposeMatrix;
	exports.logger = logger;
	exports.mapMatrix = mapMatrix;
	exports.math = math;
	exports.matrix2dToCSS = matrix2dToCSS;
	exports.matrix3dToCSS = matrix3dToCSS;
	exports.matrix3dValues = matrix3dValues;
	exports.name = name;
	exports.now = now;
	exports.onChange = onChange;
	exports.perf = perf;
	exports.resetMatrix = resetMatrix;
	exports.rng = rng;
	exports.uid = uid;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
