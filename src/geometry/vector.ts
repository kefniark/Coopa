import { roundTo } from "../math/math"

export class DOMVector2 {
	get length() {
		return Math.hypot(this.x, this.y)
	}

	get lengthSquared() {
		return this.x * this.x + this.y * this.y
	}

	x: number
	y: number

	constructor(x = 0, y = 0) {
		this.x = x
		this.y = y
	}

	clone() {
		return new DOMVector3(this.x, this.y)
	}

	set(x: number, y: number) {
		if (!isNaN(x)) this.x = x
		if (!isNaN(y)) this.y = y
		return this
	}

	invert() {
		this.x = 1 / this.x
		this.y = 1 / this.y
		return this
	}

	negate() {
		this.x *= -1
		this.y *= -1
		return this
	}

	normalize() {
		let len = this.lengthSquared
		if (len > 0) len = 1 / Math.sqrt(this.length)
		this.x *= len
		this.y *= len
		return this
	}

	add(x: number = 0, y: number = 0) {
		this.x += x
		this.y += y
		return this
	}

	round(decimals = 4) {
		this.x = roundTo(this.x, decimals)
		this.y = roundTo(this.y, decimals)
		return this
	}

	scale(x = 1, y = 1) {
		this.x *= x
		this.y *= y
		return this
	}

	toString() {
		return `[Vector ${this.x}, ${this.y}]`
	}
}

export class DOMVector3 {
	get length() {
		return Math.hypot(this.x, this.y, this.z)
	}

	get lengthSquared() {
		return this.x * this.x + this.y * this.y + this.z * this.z
	}

	x: number
	y: number
	z: number

	constructor(x = 0, y = 0, z = 0) {
		this.x = x
		this.y = y
		this.z = z
	}

	clone() {
		return new DOMVector3(this.x, this.y, this.z)
	}

	set(x: number, y: number, z: number) {
		if (!isNaN(x)) this.x = x
		if (!isNaN(y)) this.y = y
		if (!isNaN(z)) this.z = z
		return this
	}

	invert() {
		this.x = 1 / this.x
		this.y = 1 / this.y
		this.z = 1 / this.z
		return this
	}

	negate() {
		this.x *= -1
		this.y *= -1
		this.z *= -1
		return this
	}

	normalize() {
		let len = this.lengthSquared
		if (len > 0) len = 1 / Math.sqrt(this.length)
		this.x *= len
		this.y *= len
		this.z *= len
		return this
	}

	add(x = 0, y = 0, z = 0) {
		this.x += x
		this.y += y
		this.z += z
		return this
	}

	addVec(vec: DOMVector3) {
		this.add(vec.x, vec.y, vec.z)
	}

	round(decimals = 4) {
		this.x = roundTo(this.x, decimals)
		this.y = roundTo(this.y, decimals)
		this.z = roundTo(this.z, decimals)
		return this
	}

	scaleTo(val = 1) {
		return this.scale(val, val, val)
	}

	scale(x = 1, y = 1, z = 1) {
		this.x *= x
		this.y *= y
		this.z *= z
		return this
	}

	dot(vec: DOMVector3) {
		return this.x * vec.x + this.y * vec.y + this.z * vec.z
	}

	cross(vec: DOMVector3) {
		this.x = this.y * vec.z - this.z * vec.y
		this.y = this.z * vec.x - this.x * vec.z
		this.z = this.x * vec.y - this.y * vec.x
		return this
	}

	toString() {
		return `[Vector ${this.x}, ${this.y}, ${this.z}]`
	}
}
