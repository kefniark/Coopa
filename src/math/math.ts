/* istanbul ignore file */

/**
 * Common utilities
 */

// Configuration Constants
export const EPSILON = 0.000001
export let ARRAY_TYPE = Array
export const RANDOM = Math.random
const degree = Math.PI / 180

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
export function toRadian(a: number) {
	return a * degree
}

export function toDegree(a: number) {
	return a / degree
}

/**
 * Number Equal, approximately (+-epsilon)
 *
 * @export
 * @param {number} a
 * @param {number} b
 */
export function numberEqual(a: number, b: number) {
	return Math.abs(a - b) < EPSILON
}

/**
 * Round to a certain amount of decimals
 *
 * @export
 * @param {number} value
 * @param {number} [decimals=2]
 */
export function roundTo(value: number, decimals: number = 2) {
	return +value.toFixed(decimals + EPSILON)
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
export function equals(a: number, b: number) {
	return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b))
}

export function forEach(mat: number[], cb: (index: number, value: number) => number) {
	for (var i = 0; i < mat.length; i++) {
		mat[i] = cb(i, mat[i])
	}
}

if (!Math.hypot) {
	Math.hypot = function() {
		var y = 0,
			i = arguments.length
		while (i--) y += arguments[i] * arguments[i]
		return Math.sqrt(y)
	}
}
