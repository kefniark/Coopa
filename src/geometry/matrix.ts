// Used only as a polyfill for DOMMatrix
/* istanbul ignore file */
/* eslint @typescript-eslint/no-use-before-define: 0 */

const enum Matrix3D {
	M11 = 0,
	M12 = 1,
	M13 = 2,
	M14 = 3,
	M21 = 4,
	M22 = 5,
	M23 = 6,
	M24 = 7,
	M31 = 8,
	M32 = 9,
	M33 = 10,
	M34 = 11,
	M41 = 12,
	M42 = 13,
	M43 = 14,
	M44 = 15
}
const enum Matrix2D {
	A = Matrix3D.M11,
	B = Matrix3D.M12,
	C = Matrix3D.M21,
	D = Matrix3D.M22,
	E = Matrix3D.M41,
	F = Matrix3D.M42
}

const DEGREE_PER_RAD = 180 / Math.PI
const RAD_PER_DEGREE = Math.PI / 180

const parseMatrix = (init: any) => {
	let parsed = init.replace(/matrix\(/, "")
	parsed = parsed.split(/,/, 7)

	if (parsed.length !== 6) {
		throw new Error(`Failed to parse ${init}`)
	}

	parsed = parsed.map(parseFloat)

	return [parsed[0], parsed[1], 0, 0, parsed[2], parsed[3], 0, 0, 0, 0, 1, 0, parsed[4], parsed[5], 0, 1]
}

const parseMatrix3d = (init: any) => {
	let parsed = init.replace(/matrix3d\(/, "")
	parsed = parsed.split(/,/, 17)

	if (parsed.length !== 16) {
		throw new Error(`Failed to parse ${init}`)
	}

	return parsed.map(parseFloat)
}

const parseTransform = (tform: any) => {
	const type = tform.split(/\(/, 1)[0]

	if (type === "matrix") {
		return parseMatrix(tform)
	} else if (type === "matrix3d") {
		return parseMatrix3d(tform)
	} else {
		throw new Error(`${type} parsing not implemented`)
	}
}

const getNumber = (receiver: DOMMatrix | any, index: number) => {
	return receiver.values[index]
}
const setNumber2D = (receiver: DOMMatrix | any, index: number, value: number) => {
	if (typeof value !== "number") {
		throw new TypeError("Expected number")
	}

	receiver.values[index] = value
}

const setNumber3D = (receiver: DOMMatrix | any, index: number, value: number) => {
	if (typeof value !== "number") {
		throw new TypeError("Expected number")
	}

	if (index === Matrix3D.M33 || index === Matrix3D.M44) {
		if (value !== 1) {
			receiver.is2D = false
		}
	} else if (value !== 0) {
		receiver.is2D = false
	}

	receiver.values[index] = value
}

const newInstance = (values: Float64Array) => {
	const instance = Object.create(DOMMatrix.prototype)
	instance.constructor = DOMMatrix
	instance.is2D = true
	instance.values = values

	return instance
}

const multiply = (first: Float64Array | number[], second: Float64Array | number[]) => {
	const dest = new Float64Array(16)

	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			let sum = 0

			for (let k = 0; k < 4; k++) {
				sum += first[i * 4 + k] * second[k * 4 + j]
			}

			dest[i * 4 + j] = sum
		}
	}

	return dest
}

export class DOMMatrix {
	get m11() {
		return getNumber(this, Matrix3D.M11)
	}
	set m11(value) {
		setNumber2D(this, Matrix3D.M11, value)
	}
	get m12() {
		return getNumber(this, Matrix3D.M12)
	}
	set m12(value) {
		setNumber2D(this, Matrix3D.M12, value)
	}
	get m13() {
		return getNumber(this, Matrix3D.M13)
	}
	set m13(value) {
		setNumber2D(this, Matrix3D.M13, value)
	}
	get m14() {
		return getNumber(this, Matrix3D.M14)
	}
	set m14(value) {
		setNumber2D(this, Matrix3D.M14, value)
	}

	get m21() {
		return getNumber(this, Matrix3D.M21)
	}
	set m21(value) {
		setNumber2D(this, Matrix3D.M21, value)
	}
	get m22() {
		return getNumber(this, Matrix3D.M22)
	}
	set m22(value) {
		setNumber2D(this, Matrix3D.M22, value)
	}
	get m23() {
		return getNumber(this, Matrix3D.M23)
	}
	set m23(value) {
		setNumber2D(this, Matrix3D.M23, value)
	}
	get m24() {
		return getNumber(this, Matrix3D.M24)
	}
	set m24(value) {
		setNumber2D(this, Matrix3D.M24, value)
	}

	get m31() {
		return getNumber(this, Matrix3D.M31)
	}
	set m31(value) {
		setNumber2D(this, Matrix3D.M31, value)
	}
	get m32() {
		return getNumber(this, Matrix3D.M32)
	}
	set m32(value) {
		setNumber2D(this, Matrix3D.M32, value)
	}
	get m33() {
		return getNumber(this, Matrix3D.M33)
	}
	set m33(value) {
		setNumber2D(this, Matrix3D.M33, value)
	}
	get m34() {
		return getNumber(this, Matrix3D.M34)
	}
	set m34(value) {
		setNumber2D(this, Matrix3D.M34, value)
	}

	get m41() {
		return getNumber(this, Matrix3D.M41)
	}
	set m41(value) {
		setNumber2D(this, Matrix3D.M41, value)
	}
	get m42() {
		return getNumber(this, Matrix3D.M42)
	}
	set m42(value) {
		setNumber2D(this, Matrix3D.M42, value)
	}
	get m43() {
		return getNumber(this, Matrix3D.M43)
	}
	set m43(value) {
		setNumber2D(this, Matrix3D.M43, value)
	}
	get m44() {
		return getNumber(this, Matrix3D.M44)
	}
	set m44(value) {
		setNumber2D(this, Matrix3D.M44, value)
	}

	get a() {
		return getNumber(this, Matrix2D.A)
	}
	set a(value) {
		setNumber2D(this, Matrix2D.A, value)
	}
	get b() {
		return getNumber(this, Matrix2D.B)
	}
	set b(value) {
		setNumber2D(this, Matrix2D.B, value)
	}
	get c() {
		return getNumber(this, Matrix2D.C)
	}
	set c(value) {
		setNumber2D(this, Matrix2D.C, value)
	}
	get d() {
		return getNumber(this, Matrix2D.D)
	}
	set d(value) {
		setNumber2D(this, Matrix2D.D, value)
	}
	get e() {
		return getNumber(this, Matrix2D.E)
	}
	set e(value) {
		setNumber2D(this, Matrix2D.E, value)
	}
	get f() {
		return getNumber(this, Matrix2D.F)
	}
	set f(value) {
		setNumber2D(this, Matrix2D.F, value)
	}

	values: Float64Array
	is2D: boolean

	get isIdentity() {
		const values = this.values

		return (
			values[Matrix3D.M11] === 1 &&
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
			values[Matrix3D.M44] === 1
		)
	}

	static fromMatrix(init: DOMMatrix | SVGMatrix) {
		if (init instanceof DOMMatrix) {
			return new DOMMatrix(init.values)
		} else if (init instanceof SVGMatrix) {
			return new DOMMatrix([init.a, init.b, init.c, init.d, init.e, init.f])
		} else {
			throw new TypeError("Expected DOMMatrix")
		}
	}

	static fromFloat32Array(init: Float32Array) {
		if (!(init instanceof Float32Array)) throw new TypeError("Expected Float32Array")
		return new DOMMatrix(init)
	}

	static fromFloat64Array(init: Float64Array) {
		if (!(init instanceof Float64Array)) throw new TypeError("Expected Float64Array")
		return new DOMMatrix(init)
	}

	// @type
	// (Float64Array) => void
	constructor(init?: Float64Array | Float32Array | number[] | string) {
		this.is2D = true
		this.values = new Float64Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])

		// Parse CSS transformList
		if (typeof init === "string") {
			if (init === "") {
				return
			} else {
				const tforms = init.split(/\)\s+/, 20).map(parseTransform)

				if (tforms.length === 0) {
					return
				}

				init = tforms[0]

				for (let i = 1; i < tforms.length; i++) {
					init = multiply(tforms[i], init as any)
				}
			}
		}

		let i = 0
		const arr = init as number[]
		if (init && init.length === 6) {
			setNumber2D(this, Matrix2D.A, arr[i++])
			setNumber2D(this, Matrix2D.B, arr[i++])
			setNumber2D(this, Matrix2D.C, arr[i++])
			setNumber2D(this, Matrix2D.D, arr[i++])
			setNumber2D(this, Matrix2D.E, arr[i++])
			setNumber2D(this, Matrix2D.F, arr[i++])
		} else if (init && init.length === 16) {
			setNumber2D(this, Matrix3D.M11, arr[i++])
			setNumber2D(this, Matrix3D.M12, arr[i++])
			setNumber3D(this, Matrix3D.M13, arr[i++])
			setNumber3D(this, Matrix3D.M14, arr[i++])
			setNumber2D(this, Matrix3D.M21, arr[i++])
			setNumber2D(this, Matrix3D.M22, arr[i++])
			setNumber3D(this, Matrix3D.M23, arr[i++])
			setNumber3D(this, Matrix3D.M24, arr[i++])
			setNumber3D(this, Matrix3D.M31, arr[i++])
			setNumber3D(this, Matrix3D.M32, arr[i++])
			setNumber3D(this, Matrix3D.M33, arr[i++])
			setNumber3D(this, Matrix3D.M34, arr[i++])
			setNumber2D(this, Matrix3D.M41, arr[i++])
			setNumber2D(this, Matrix3D.M42, arr[i++])
			setNumber3D(this, Matrix3D.M43, arr[i++])
			setNumber3D(this, Matrix3D.M44, arr[i])
		} else if (init !== undefined) {
			throw new TypeError("Expected string or array.")
		}
	}

	inspect(depth: number) {
		if (depth < 0) {
			return "[DOMMatrix]"
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
        isIdentity: ${this.isIdentity} ]`
	}

	multiply(other: DOMMatrix) {
		return newInstance(this.values).multiplySelf(other)
	}

	multiplySelf(other: DOMMatrix) {
		this.values = multiply(other.values, this.values)

		if (!other.is2D) {
			this.is2D = false
		}

		return this
	}

	preMultiplySelf(other: DOMMatrix) {
		this.values = multiply(this.values, other.values)

		if (!other.is2D) {
			this.is2D = false
		}

		return this
	}

	translate(tx = 0, ty = 0, tz = 0) {
		return newInstance(this.values).translateSelf(tx, ty, tz)
	}

	translateSelf(tx = 0, ty = 0, tz = 0) {
		this.values = multiply([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1], this.values)

		if (tz !== 0) {
			this.is2D = false
		}

		return this
	}

	scale(scaleX?: number, scaleY?: number, scaleZ?: number, originX?: number, originY?: number, originZ?: number) {
		return newInstance(this.values).scaleSelf(scaleX, scaleY, scaleZ, originX, originY, originZ)
	}

	scale3d(scale?: number, originX?: number, originY?: number, originZ?: number) {
		return newInstance(this.values).scale3dSelf(scale, originX, originY, originZ)
	}

	scale3dSelf(scale?: number, originX?: number, originY?: number, originZ?: number) {
		return this.scaleSelf(scale, scale, scale, originX, originY, originZ)
	}

	scaleSelf(scaleX?: number, scaleY?: number, scaleZ?: number, originX?: number, originY?: number, originZ?: number) {
		// Not redundant with translate's checks because we need to negate the values later.
		if (typeof originX !== "number") originX = 0
		if (typeof originY !== "number") originY = 0
		if (typeof originZ !== "number") originZ = 0

		this.translateSelf(originX, originY, originZ)

		if (typeof scaleX !== "number") scaleX = 1
		if (typeof scaleY !== "number") scaleY = scaleX
		if (typeof scaleZ !== "number") scaleZ = 1

		this.values = multiply([scaleX, 0, 0, 0, 0, scaleY, 0, 0, 0, 0, scaleZ, 0, 0, 0, 0, 1], this.values)

		this.translateSelf(-originX, -originY, -originZ)

		if (scaleZ !== 1 || originZ !== 0) {
			this.is2D = false
		}

		return this
	}

	rotateFromVector(x?: number, y?: number) {
		return newInstance(this.values).rotateFromVectorSelf(x, y)
	}

	rotateFromVectorSelf(x = 0, y = 0) {
		const theta = x === 0 && y === 0 ? 0 : Math.atan2(y, x) * DEGREE_PER_RAD
		return this.rotateSelf(theta)
	}

	rotate(rotX?: number, rotY?: number, rotZ?: number) {
		return newInstance(this.values).rotateSelf(rotX, rotY, rotZ)
	}

	rotateSelf(rotX = 0, rotY = 0, rotZ = 0) {
		if (rotY === undefined && rotZ === undefined) {
			rotZ = rotX
			rotX = rotY = 0
		}

		if (typeof rotY !== "number") rotY = 0
		if (typeof rotZ !== "number") rotZ = 0

		if (rotX !== 0 || rotY !== 0) {
			this.is2D = false
		}

		rotX *= RAD_PER_DEGREE
		rotY *= RAD_PER_DEGREE
		rotZ *= RAD_PER_DEGREE

		let c = Math.cos(rotZ)
		let s = Math.sin(rotZ)

		this.values = multiply([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.values)

		c = Math.cos(rotY)
		s = Math.sin(rotY)

		this.values = multiply([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1], this.values)

		c = Math.cos(rotX)
		s = Math.sin(rotX)

		this.values = multiply([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1], this.values)

		return this
	}

	rotateAxisAngle(x: number, y: number, z: number, angle: number) {
		return newInstance(this.values).rotateAxisAngleSelf(x, y, z, angle)
	}

	rotateAxisAngleSelf(x = 0, y = 0, z = 0, angle = 0) {
		const length = Math.sqrt(x * x + y * y + z * z)

		if (length === 0) {
			return this
		}

		if (length !== 1) {
			x /= length
			y /= length
			z /= length
		}

		angle *= RAD_PER_DEGREE

		const c = Math.cos(angle)
		const s = Math.sin(angle)
		const t = 1 - c
		const tx = t * x
		const ty = t * y

		this.values = multiply(
			[
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
			],
			this.values
		)

		if (x !== 0 || y !== 0) {
			this.is2D = false
		}

		return this
	}

	skewX(sx: number) {
		return newInstance(this.values).skewXSelf(sx)
	}

	skewXSelf(sx: number) {
		if (typeof sx !== "number") {
			return this
		}

		const t = Math.tan(sx * RAD_PER_DEGREE)

		this.values = multiply([1, 0, 0, 0, t, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.values)

		return this
	}

	skewY(sy: number) {
		return newInstance(this.values).skewYSelf(sy)
	}

	skewYSelf(sy: number) {
		if (typeof sy !== "number") {
			return this
		}

		const t = Math.tan(sy * RAD_PER_DEGREE)

		this.values = multiply([1, t, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.values)

		return this
	}

	flipX() {
		return newInstance(multiply([-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.values))
	}

	flipY() {
		return newInstance(multiply([1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.values))
	}

	inverse() {
		return newInstance(this.values).invertSelf()
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

	setMatrixValue(transformList: string) {
		const temp = new DOMMatrix(transformList)

		this.values = temp.values
		this.is2D = temp.is2D

		return this
	}

	transformPoint(point: DOMPoint) {
		const x = point.x
		const y = point.y
		const z = point.z
		const w = point.w

		const values = this.values

		const nx =
			values[Matrix3D.M11] * x + values[Matrix3D.M21] * y + values[Matrix3D.M31] * z + values[Matrix3D.M41] * w
		const ny =
			values[Matrix3D.M12] * x + values[Matrix3D.M22] * y + values[Matrix3D.M32] * z + values[Matrix3D.M42] * w
		const nz =
			values[Matrix3D.M13] * x + values[Matrix3D.M23] * y + values[Matrix3D.M33] * z + values[Matrix3D.M43] * w
		const nw =
			values[Matrix3D.M14] * x + values[Matrix3D.M24] * y + values[Matrix3D.M34] * z + values[Matrix3D.M44] * w

		return new DOMPoint(nx, ny, nz, nw)
	}

	toFloat32Array() {
		return Float32Array.from(this.values)
	}

	toFloat64Array() {
		return this.values.slice(0)
	}

	toString() {
		if (this.is2D) {
			return `matrix(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.e}, ${this.f})`
		} else {
			return `matrix3d(${this.values.join(", ")})`
		}
	}
}
