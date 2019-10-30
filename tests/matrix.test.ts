/// <reference types="jest" />
import { Matrix } from "../src/math/matrix"

test("Create", () => {
	// normal matrix
	const m1 = Matrix.create([1, 2, 3])

	expect(m1.el(1, 1)).toBe(1)
	expect(m1.el(2, 1)).toBe(2)
	expect(m1.el(3, 1)).toBe(3)

	// test clone & equality
	const m2 = m1.clone()
	expect(m1.equals(m2)).toBeTruthy()

	// create empty
	const m = Matrix.createZero(2, 3)
	expect(m.rows).toBe(2)
	expect(m.columns).toBe(3)
	expect(m.el(1, 1)).toBe(0)
	expect(m1.equals(m)).toBeFalsy()

	expect(m1.equals(Matrix.createRandom(3, 1))).toBeFalsy()
})

test("Create Identity", () => {
	const m1 = Matrix.createIdentity(3)

	expect(m1.el(1, 1)).toBe(1)
	expect(m1.el(2, 2)).toBe(1)
	expect(m1.el(3, 3)).toBe(1)
	expect(m1.el(1, 3)).toBe(0)
	expect(m1.el(3, 1)).toBe(0)

	console.log(m1.inspect(), m1.toString())
})

test("Create Diagonal", () => {
	const m1 = Matrix.createDiagonal([1, 2, 3])

	expect(m1.el(1, 1)).toBe(1)
	expect(m1.el(2, 2)).toBe(2)
	expect(m1.el(3, 3)).toBe(3)
	expect(m1.el(1, 3)).toBe(0)
	expect(m1.el(3, 1)).toBe(0)

	console.log(m1.inspect())
})

test("Add / Subtract", () => {
	const m1 = Matrix.create([[2, 5, 9, 3], [9, 2, 8, 5]])
	const m2 = Matrix.create([[7, 1, 0, 8], [0, 4, 3, 8]])
	const m = Matrix.create([[9, 6, 9, 11], [9, 6, 11, 13]])

	expect(m1.add(m2).equals(m)).toBeTruthy()
	expect(m2.add(m1).equals(m)).toBeTruthy()

	expect(m.subtract(m2).equals(m1)).toBeTruthy()
	expect(m.subtract(m1).equals(m2)).toBeTruthy()
})

test("Multiplication", () => {
	const m1 = Matrix.create([[2, 5, 9, 3], [9, 2, 8, 5]])
	const m2 = Matrix.create([[2, 9], [0, 2], [8, 1], [0, 6]])
	const m3 = Matrix.create([3, 3, 3])

	// check multiplication result
	const mul1 = m1.multiply(m2)
	const mul2 = m2.multiply(m1)
	expect(mul1.equals(Matrix.create([[76, 55], [82, 123]]))).toBeTruthy()
	expect(
		mul2.equals(Matrix.create([[85, 28, 90, 51], [18, 4, 16, 10], [25, 42, 80, 29], [54, 12, 48, 30]]))
	).toBeTruthy()

	expect(m1.isSquare()).toBeFalsy()
	expect(mul2.isSquare()).toBeTruthy()

	// check error if not doable
	expect(() => m3.multiply(m1)).toThrow()

	Matrix.create([
		[1, 2],
		[3, 4]
	]).scale(-1).equals(Matrix.create([
		[-1, -2],
		[-3, -4]
	]))
})
