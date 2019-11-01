/* istanbul ignore file */

import * as glMatrix from "./common"

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
export function create() {
	let out = new glMatrix.ARRAY_TYPE(2)
	out[0] = 0
	out[1] = 0
	return out
}

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
export function clone(a: number[]) {
	let out = new glMatrix.ARRAY_TYPE(2)
	out[0] = a[0]
	out[1] = a[1]
	return out
}

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
export function fromValues(x: number, y: number) {
	let out = new glMatrix.ARRAY_TYPE(2)
	out[0] = x
	out[1] = y
	return out
}

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
export function copy(out: number[], a: number[]) {
	out[0] = a[0]
	out[1] = a[1]
	return out
}

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
export function set(out: number[], x: number, y: number) {
	out[0] = x
	out[1] = y
	return out
}

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
export function add(out: number[], a: number[], b: number[]) {
	out[0] = a[0] + b[0]
	out[1] = a[1] + b[1]
	return out
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
export function subtract(out: number[], a: number[], b: number[]) {
	out[0] = a[0] - b[0]
	out[1] = a[1] - b[1]
	return out
}

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
export function multiply(out: number[], a: number[], b: number[]) {
	out[0] = a[0] * b[0]
	out[1] = a[1] * b[1]
	return out
}

/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */
export function ceil(out: number[], a: number[]) {
	out[0] = Math.ceil(a[0])
	out[1] = Math.ceil(a[1])
	return out
}

/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */
export function floor(out: number[], a: number[]) {
	out[0] = Math.floor(a[0])
	out[1] = Math.floor(a[1])
	return out
}

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
export function min(out: number[], a: number[], b: number[]) {
	out[0] = Math.min(a[0], b[0])
	out[1] = Math.min(a[1], b[1])
	return out
}

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
export function max(out: number[], a: number[], b: number[]) {
	out[0] = Math.max(a[0], b[0])
	out[1] = Math.max(a[1], b[1])
	return out
}

/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
export function round(out: number[], a: number[]) {
	out[0] = Math.round(a[0])
	out[1] = Math.round(a[1])
	return out
}

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
export function scale(out: number[], a: number[], b: number) {
	out[0] = a[0] * b
	out[1] = a[1] * b
	return out
}

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
export function distance(a: number[], b: number[]) {
	var x = b[0] - a[0],
		y = b[1] - a[1]
	return Math.hypot(x, y)
}

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
export function squaredDistance(a: number[], b: number[]) {
	var x = b[0] - a[0],
		y = b[1] - a[1]
	return x * x + y * y
}

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
export function length(a: number[]) {
	var x = a[0],
		y = a[1]
	return Math.hypot(x, y)
}

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
export function squaredLength(a: number[]) {
	var x = a[0],
		y = a[1]
	return x * x + y * y
}

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
export function negate(out: number[], a: number[]) {
	out[0] = -a[0]
	out[1] = -a[1]
	return out
}

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
export function inverse(out: number[], a: number[]) {
	out[0] = 1.0 / a[0]
	out[1] = 1.0 / a[1]
	return out
}

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
export function normalize(out: number[], a: number[]) {
	var x = a[0],
		y = a[1]
	var len = x * x + y * y
	if (len > 0) {
		//TODO: evaluate use of glm_invsqrt here?
		len = 1 / Math.sqrt(len)
	}
	out[0] = a[0] * len
	out[1] = a[1] * len
	return out
}

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
export function dot(a: number[], b: number[]) {
	return a[0] * b[0] + a[1] * b[1]
}

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
export function cross(out: number[], a: number[], b: number[]) {
	var z = a[0] * b[1] - a[1] * b[0]
	out[0] = out[1] = 0
	out[2] = z
	return out
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
export function random(out: number[], scale?: number) {
	scale = scale || 1.0
	var r = glMatrix.RANDOM() * 2.0 * Math.PI
	out[0] = Math.cos(r) * scale
	out[1] = Math.sin(r) * scale
	return out
}

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
export function transformMat2(out: number[], a: number[], m: number[]) {
	var x = a[0],
		y = a[1]
	out[0] = m[0] * x + m[2] * y
	out[1] = m[1] * x + m[3] * y
	return out
}

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
export function transformMat2d(out: number[], a: number[], m: number[]) {
	var x = a[0],
		y = a[1]
	out[0] = m[0] * x + m[2] * y + m[4]
	out[1] = m[1] * x + m[3] * y + m[5]
	return out
}

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
export function transformMat3(out: number[], a: number[], m: number[]) {
	var x = a[0],
		y = a[1]
	out[0] = m[0] * x + m[3] * y + m[6]
	out[1] = m[1] * x + m[4] * y + m[7]
	return out
}

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
export function transformMat4(out: number[], a: number[], m: number[]) {
	let x = a[0]
	let y = a[1]
	out[0] = m[0] * x + m[4] * y + m[12]
	out[1] = m[1] * x + m[5] * y + m[13]
	return out
}

/**
 * Rotate a 2D vector
 * @param {vec2} out The receiving vec2
 * @param {vec2} a The vec2 point to rotate
 * @param {vec2} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec2} out
 */
export function rotate(out: number[], a: number[], b: number[], rad: number) {
	//Translate point to the origin
	let p0 = a[0] - b[0],
		p1 = a[1] - b[1],
		sinC = Math.sin(rad),
		cosC = Math.cos(rad)

	//perform rotation and translate to correct position
	out[0] = p0 * cosC - p1 * sinC + b[0]
	out[1] = p0 * sinC + p1 * cosC + b[1]

	return out
}

/**
 * Get the angle between two 2D vectors
 * @param {vec2} a The first operand
 * @param {vec2} b The second operand
 * @returns {Number} The angle in radians
 */
export function angle(a: number[], b: number[]) {
	let x1 = a[0],
		y1 = a[1],
		x2 = b[0],
		y2 = b[1]

	let len1 = x1 * x1 + y1 * y1
	if (len1 > 0) {
		//TODO: evaluate use of glm_invsqrt here?
		len1 = 1 / Math.sqrt(len1)
	}

	let len2 = x2 * x2 + y2 * y2
	if (len2 > 0) {
		//TODO: evaluate use of glm_invsqrt here?
		len2 = 1 / Math.sqrt(len2)
	}

	let cosine = (x1 * x2 + y1 * y2) * len1 * len2

	if (cosine > 1.0) {
		return 0
	} else if (cosine < -1.0) {
		return Math.PI
	} else {
		return Math.acos(cosine)
	}
}

/**
 * Set the components of a vec2 to zero
 *
 * @param {vec2} out the receiving vector
 * @returns {vec2} out
 */
export function zero(out: number[]) {
	out[0] = 0.0
	out[1] = 0.0
	return out
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
export function str(a: number[]) {
	return "vec2(" + a[0] + ", " + a[1] + ")"
}

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export function exactEquals(a: number[], b: number[]) {
	return a[0] === b[0] && a[1] === b[1]
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export function equals(a: number[], b: number[]) {
	let a0 = a[0],
		a1 = a[1]
	let b0 = b[0],
		b1 = b[1]
	return (
		Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
		Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1))
	)
}

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
export const forEach = (function() {
	let vec = create()

	return function(
		a: number[],
		stride: number,
		offset: number,
		count: number,
		fn: (a: number[], b: number[], c: number[]) => void,
		arg?: any
	) {
		let i, l
		if (!stride) {
			stride = 2
		}

		if (!offset) {
			offset = 0
		}

		l = count ? Math.min(count * stride + offset, a.length) : a.length

		for (i = offset; i < l; i += stride) {
			vec[0] = a[i]
			vec[1] = a[i + 1]
			fn(vec, vec, arg)
			a[i] = vec[0]
			a[i + 1] = vec[1]
		}

		return a
	}
})()
