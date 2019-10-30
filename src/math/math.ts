export const PI = Math.PI
export const PI_OVER_TWO = Math.PI / 2
export const PI_TWO = Math.PI * 2
export const EPSILON = 0.0000001

/**
 * Convert degree to radian
 *
 * @export
 * @param {number} euler
 */
export function eulerToRadian(euler: number) {
	return (euler * PI_TWO) / 360
}

/**
 * Convert radian into degree
 *
 * @export
 * @param {number} radian
 */
export function radianToEuler(radian: number) {
	return (radian * 360) / PI_TWO
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
	return +value.toFixed(decimals)
}
