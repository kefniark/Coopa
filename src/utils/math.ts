/* istanbul ignore file */

/**
 * Common utilities
 */

// Configuration Constants
export const EPSILON = 0.000001
export const ARRAY_TYPE = Array
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

export function clamp(val: number, min: number, max: number) {
	return Math.max(Math.min(val, max), min)
}

export function clamp01(val: number) {
	return clamp(val, 0, 1)
}

export function inRange(val: number, min: number, max: number) {
	return val >= min && val <= max
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
export function roundTo(value: number, decimals = 2) {
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
