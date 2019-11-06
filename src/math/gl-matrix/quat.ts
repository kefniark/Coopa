/* istanbul ignore file */

import * as glMatrix from "../math"
// import * as mat3 from "./mat3"
// import * as vec3 from "./vec3"
// import * as vec4 from "./vec4"

/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
export function create() {
	let out = new glMatrix.ARRAY_TYPE(4)
	out[0] = 0
	out[1] = 0
	out[2] = 0
	out[3] = 1
	return out
}

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
export function identity(out: number[]) {
	out[0] = 0
	out[1] = 0
	out[2] = 0
	out[3] = 1
	return out
}

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
export function setAxisAngle(out: number[], axis: number[], rad: number) {
	rad = rad * 0.5
	let s = Math.sin(rad)
	out[0] = s * axis[0]
	out[1] = s * axis[1]
	out[2] = s * axis[2]
	out[3] = Math.cos(rad)
	return out
}

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */
export function getAxisAngle(out_axis: number[], q: number[]) {
	let rad = Math.acos(q[3]) * 2.0
	let s = Math.sin(rad / 2.0)
	if (s > glMatrix.EPSILON) {
		out_axis[0] = q[0] / s
		out_axis[1] = q[1] / s
		out_axis[2] = q[2] / s
	} else {
		// If s is zero, return any axis (no rotation - axis does not matter)
		out_axis[0] = 1
		out_axis[1] = 0
		out_axis[2] = 0
	}
	return rad
}

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
export function multiply(out: number[], a: number[], b: number[]) {
	let ax = a[0],
		ay = a[1],
		az = a[2],
		aw = a[3]
	let bx = b[0],
		by = b[1],
		bz = b[2],
		bw = b[3]

	out[0] = ax * bw + aw * bx + ay * bz - az * by
	out[1] = ay * bw + aw * by + az * bx - ax * bz
	out[2] = az * bw + aw * bz + ax * by - ay * bx
	out[3] = aw * bw - ax * bx - ay * by - az * bz
	return out
}

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
export function rotateX(out: number[], a: number[], rad: number) {
	rad *= 0.5

	let ax = a[0],
		ay = a[1],
		az = a[2],
		aw = a[3]
	let bx = Math.sin(rad),
		bw = Math.cos(rad)

	out[0] = ax * bw + aw * bx
	out[1] = ay * bw + az * bx
	out[2] = az * bw - ay * bx
	out[3] = aw * bw - ax * bx
	return out
}

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
export function rotateY(out: number[], a: number[], rad: number) {
	rad *= 0.5

	let ax = a[0],
		ay = a[1],
		az = a[2],
		aw = a[3]
	let by = Math.sin(rad),
		bw = Math.cos(rad)

	out[0] = ax * bw - az * by
	out[1] = ay * bw + aw * by
	out[2] = az * bw + ax * by
	out[3] = aw * bw - ay * by
	return out
}

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
export function rotateZ(out: number[], a: number[], rad: number) {
	rad *= 0.5

	let ax = a[0],
		ay = a[1],
		az = a[2],
		aw = a[3]
	let bz = Math.sin(rad),
		bw = Math.cos(rad)

	out[0] = ax * bw + ay * bz
	out[1] = ay * bw - ax * bz
	out[2] = az * bw + aw * bz
	out[3] = aw * bw - az * bz
	return out
}

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
export function calculateW(out: number[], a: number[]) {
	let x = a[0],
		y = a[1],
		z = a[2]

	out[0] = x
	out[1] = y
	out[2] = z
	out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z))
	return out
}

/**
 * Calculate the exponential of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate the exponential of
 * @returns {quat} out
 */
export function exp(out: number[], a: number[]) {
	let x = a[0],
		y = a[1],
		z = a[2],
		w = a[3]

	let r = Math.sqrt(x * x + y * y + z * z)
	let et = Math.exp(w)
	let s = r > 0 ? (et * Math.sin(r)) / r : 0

	out[0] = x * s
	out[1] = y * s
	out[2] = z * s
	out[3] = et * Math.cos(r)

	return out
}

/**
 * Calculate the natural logarithm of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate the exponential of
 * @returns {quat} out
 */
export function ln(out: number[], a: number[]) {
	let x = a[0],
		y = a[1],
		z = a[2],
		w = a[3]

	let r = Math.sqrt(x * x + y * y + z * z)
	let t = r > 0 ? Math.atan2(r, w) / r : 0

	out[0] = x * t
	out[1] = y * t
	out[2] = z * t
	out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w)

	return out
}

/**
 * Generates a random unit quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
export function random(out: number[]) {
	// Implementation of http://planning.cs.uiuc.edu/node198.html
	// TODO: Calling random 3 times is probably not the fastest solution
	let u1 = glMatrix.RANDOM()
	let u2 = glMatrix.RANDOM()
	let u3 = glMatrix.RANDOM()

	let sqrt1MinusU1 = Math.sqrt(1 - u1)
	let sqrtU1 = Math.sqrt(u1)

	out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2)
	out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2)
	out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3)
	out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3)
	return out
}

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
export function invert(out: number[], a: number[]) {
	let a0 = a[0],
		a1 = a[1],
		a2 = a[2],
		a3 = a[3]
	let dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3
	let invDot = dot ? 1.0 / dot : 0

	// TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

	out[0] = -a0 * invDot
	out[1] = -a1 * invDot
	out[2] = -a2 * invDot
	out[3] = a3 * invDot
	return out
}

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
export function conjugate(out: number[], a: number[]) {
	out[0] = -a[0]
	out[1] = -a[1]
	out[2] = -a[2]
	out[3] = a[3]
	return out
}

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
export function fromMat3(out: number[], m: number[]) {
	// Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
	// article "Quaternion Calculus and Fast Animation".
	let fTrace = m[0] + m[4] + m[8]
	let fRoot

	if (fTrace > 0.0) {
		// |w| > 1/2, may as well choose w > 1/2
		fRoot = Math.sqrt(fTrace + 1.0) // 2w
		out[3] = 0.5 * fRoot
		fRoot = 0.5 / fRoot // 1/(4w)
		out[0] = (m[5] - m[7]) * fRoot
		out[1] = (m[6] - m[2]) * fRoot
		out[2] = (m[1] - m[3]) * fRoot
	} else {
		// |w| <= 1/2
		let i = 0
		if (m[4] > m[0]) i = 1
		if (m[8] > m[i * 3 + i]) i = 2
		let j = (i + 1) % 3
		let k = (i + 2) % 3

		fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0)
		out[i] = 0.5 * fRoot
		fRoot = 0.5 / fRoot
		out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot
		out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot
		out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot
	}

	return out
}

/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} Angle to rotate around X axis in degrees.
 * @param {y} Angle to rotate around Y axis in degrees.
 * @param {z} Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */
export function fromEuler(out: number[], x: number, y: number, z: number) {
	let halfToRad = (0.5 * Math.PI) / 180.0
	x *= halfToRad
	y *= halfToRad
	z *= halfToRad

	let sx = Math.sin(x)
	let cx = Math.cos(x)
	let sy = Math.sin(y)
	let cy = Math.cos(y)
	let sz = Math.sin(z)
	let cz = Math.cos(z)

	out[0] = sx * cy * cz - cx * sy * sz
	out[1] = cx * sy * cz + sx * cy * sz
	out[2] = cx * cy * sz - sx * sy * cz
	out[3] = cx * cy * cz + sx * sy * sz

	return out
}

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
export function str(a: number[]) {
	return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
}
