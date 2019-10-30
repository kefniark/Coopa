import { Matrix } from "./matrix"
import { eulerToRadian, radianToEuler, roundTo } from "./math"

export class Vector2 extends Matrix {
	static get zero() {
		return new Vector2(0, 0)
	}
	static get up() {
		return new Vector2(0, 1)
	}
	static get down() {
		return new Vector2(0, -1)
	}
	static get left() {
		return new Vector2(-1, 0)
	}
	static get right() {
		return new Vector2(1, 0)
	}

	get x() {
		return this.elements[0][0]
	}
	set x(val: number) {
		this.elements[0][0] = val
	}

	get y() {
		return this.elements[0][1]
	}
	set y(val: number) {
		this.elements[0][1] = val
	}

	constructor(x: number = 0, y: number = 0) {
		super([[x, y, 0]])
	}

	add(vec: Vector2): Vector2 {
		return this.addInto(vec, new Vector2())
	}

	subtract(vec: Vector2): Vector2 {
		return this.subtractInto(vec, new Vector2())
	}

	scale(scalar: number) {
		return this.scaleInto(scalar, new Vector2())
	}

	clone(): Vector2 {
		return new Vector2(this.x, this.y)
	}

	dot(vector: Vector2) {
		return this.x * vector.x + this.y * vector.y
	}

	cross(vector: Vector2) {
		return this.x * vector.y - this.y * vector.x
	}

	round(decimal: number = 2) {
		return new Vector2(roundTo(this.x, decimal), roundTo(this.y, decimal))
	}

	length() {
		return Math.sqrt(this.lengthSqr())
	}

	lengthSqr() {
		return this.x * this.x + this.y * this.y
	}

	distance(vector: Vector2) {
		return Math.sqrt(this.distanceSqr(vector))
	}

	distanceSqr(vector: Vector2) {
		const deltaX = this.x - vector.x
		const deltaY = this.y - vector.y
		return deltaX * deltaX + deltaY * deltaY
	}

	normalize() {
		const mag = this.length()
		const vector = this.clone()
		if (Math.abs(mag) < 1e-9) {
			vector.x = 0
			vector.y = 0
		} else {
			vector.x /= mag
			vector.y /= mag
		}
		return vector
	}

	angle() {
		return Math.atan2(this.y, this.x)
	}

	angleEuler() {
		return radianToEuler(Math.atan2(this.y, this.x))
	}

	rotateEuler(angle: number) {
		return this.rotate(eulerToRadian(angle))
	}

	rotate(alpha: number) {
		const cos = Math.cos(alpha)
		const sin = Math.sin(alpha)
		const vector = new Vector2()
		vector.x = this.x * cos - this.y * sin
		vector.y = this.x * sin + this.y * cos
		return vector
	}

	toString(): string {
		return `Vector2 { x: ${this.x}, y: ${this.y} }`
	}
}

export class Vector3 extends Matrix {
	get x() {
		return this.elements[0][0]
	}
	set x(val: number) {
		this.elements[0][0] = val
	}

	get y() {
		return this.elements[0][1]
	}
	set y(val: number) {
		this.elements[0][1] = val
	}

	get z() {
		return this.elements[0][2]
	}
	set z(val: number) {
		this.elements[0][2] = val
	}

	constructor(x: number = 0, y: number = 0, z: number = 0) {
		super([[x, y, z]])
	}

	add(vec: Vector2 | Vector3): Vector3 {
		return this.addInto(vec as Vector3, new Vector3())
	}

	subtract(vec: Vector2 | Vector3): Vector3 {
		return this.subtractInto(vec as Vector3, new Vector3())
	}

	clone(): Vector3 {
		return new Vector3(this.x, this.y, this.z)
	}

	scale(scalar: number) {
		return this.scaleInto(scalar, new Vector3())
	}

	toString(): string {
		return `Vector3 { x: ${this.x}, y: ${this.y}, z: ${this.z} }`
	}
}
