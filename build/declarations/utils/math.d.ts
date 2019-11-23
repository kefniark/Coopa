/**
 * Common utilities
 */
export declare const EPSILON = 0.000001;
export declare const ARRAY_TYPE: ArrayConstructor;
export declare const RANDOM: () => number;
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
export declare function toRadian(a: number): number;
export declare function toDegree(a: number): number;
export declare function clamp(val: number, min: number, max: number): number;
export declare function clamp01(val: number): number;
export declare function inRange(val: number, min: number, max: number): boolean;
/**
 * Number Equal, approximately (+-epsilon)
 *
 * @export
 * @param {number} a
 * @param {number} b
 */
export declare function numberEqual(a: number, b: number): boolean;
/**
 * Round to a certain amount of decimals
 *
 * @export
 * @param {number} value
 * @param {number} [decimals=2]
 */
export declare function roundTo(value: number, decimals?: number): number;
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
export declare function equals(a: number, b: number): boolean;
