import { roundTo } from "../math/math";

export class DOMVector2 {

	get length() {
		return Math.hypot(this.x, this.y);
	}

	get lengthSquared() {
		return this.x * this.x + this.y * this.y
	}

	x: number;
	y: number;

	constructor(x = 0, y = 0) {
		this.x = x
		this.y = y
	}

	clone() {
		return new DOMVector3(this.x, this.y)
	}

	set(x: number, y: number) {
		this.x = x
		this.y = y
	}

	negate() {
		this.x *= -1
		this.y *= -1
	}

	normalize() {
		let len = this.lengthSquared
		if (len > 0) len = 1 / Math.sqrt(this.length)
		this.x *= len
		this.y *= len
	}

	add(x: number = 0, y: number = 0) {
		this.x += x
		this.y += y
	}

	round(decimals = 4) {
		this.x = roundTo(this.x, decimals)
		this.y = roundTo(this.y, decimals)
	}

	scale(x = 1, y = 1) {
		this.x *= x
		this.y *= y
	}

	toString() {
		return `[Vector ${this.x}, ${this.y}]`
	}
}

export class DOMVector3 {

	get length() {
		return Math.hypot(this.x, this.y, this.z);
	}

	get lengthSquared() {
		return this.x * this.x + this.y * this.y + this.z * this.z
	}

	x: number;
	y: number;
	z: number;

	constructor(x = 0, y = 0, z = 0) {
		this.x = x
		this.y = y
		this.z = z
	}

	clone() {
		return new DOMVector3(this.x, this.y, this.z)
	}

	set(x: number, y: number, z: number) {
		this.x = x
		this.y = y
		this.z = z
	}

	negate() {
		this.x *= -1
		this.y *= -1
		this.z *= -1
	}

	normalize() {
		let len = this.lengthSquared
		if (len > 0) len = 1 / Math.sqrt(this.length)
		this.x *= len
		this.y *= len
	}

	add(x = 0, y = 0, z = 0) {
		this.x += x
		this.y += y
		this.z += z
	}

	round(decimals = 4) {
		this.x = roundTo(this.x, decimals)
		this.y = roundTo(this.y, decimals)
		this.z = roundTo(this.z, decimals)
	}

	scale(x = 1, y = 1, z = 1) {
		this.x *= x
		this.y *= y
		this.z *= z
	}

	toString() {
		return `[Vector ${this.x}, ${this.y}, ${this.z}]`
	}
}
