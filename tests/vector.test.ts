/// <reference types="jest" />
import { Vector2, Vector3 } from "../src/math/vector"

test("Create", () => {
	const v1 = new Vector2(2, 3)

	expect(v1.x).toBe(2)
	expect(v1.y).toBe(3)

	v1.x = 3
	v1.y = 4

	expect(v1.x).toBe(3)
	expect(v1.y).toBe(4)

	const v2 = new Vector3(2, 3, 1)

	expect(v2.x).toBe(2)
	expect(v2.y).toBe(3)
	expect(v2.z).toBe(1)

	v2.x = 3
	v2.y = 4
	v2.z = 5

	expect(v2.x).toBe(3)
	expect(v2.y).toBe(4)
	expect(v2.z).toBe(5)

	expect(v1.equals(v1.clone())).toBeTruthy()
	expect(v2.equals(v2.clone())).toBeTruthy()

	console.log(v1.toString(), v2.toString())
})

test("Test helpers", () => {
	expect(Vector2.zero.equals(new Vector2(0, 0))).toBeTruthy()
	expect(Vector2.up.equals(new Vector2(0, 1))).toBeTruthy()
	expect(Vector2.down.equals(new Vector2(0, -1))).toBeTruthy()
	expect(Vector2.left.equals(new Vector2(-1, 0))).toBeTruthy()
	expect(Vector2.right.equals(new Vector2(1, 0))).toBeTruthy()

	const v1 = new Vector2(3, 3).normalize()
	expect(v1.round(1).x).toBe(0.7)
	expect(v1.round().x).toBe(0.71)
})

test("Add / Substract", () => {
	const v1 = new Vector2(2, 3)
	const v2 = new Vector2(8, 7)
	const v3 = new Vector2(10, 10)

	expect(v1.add(v2).equals(v3)).toBeTruthy()
	expect(v2.add(v1).equals(v3)).toBeTruthy()
	expect(v3.subtract(v1).equals(v2)).toBeTruthy()

	const v4 = new Vector3(2, 3, 4)
	const v5 = new Vector3(8, 7, 6)
	const v6 = new Vector3(10, 10, 10)

	expect(v4.add(v5).equals(v6)).toBeTruthy()
	expect(v5.add(v4).equals(v6)).toBeTruthy()
	expect(v6.subtract(v4).equals(v5)).toBeTruthy()
})

test("Scale", () => {
	const v1 = new Vector2(2, 3)
	const v2 = new Vector3(2, 3, 4)
	expect(v1.scale(3).equals(new Vector2(6, 9))).toBeTruthy()
	expect(v1.scale(-1).equals(new Vector2(-2, -3))).toBeTruthy()
	expect(v2.scale(0).equals(new Vector3(0, 0, 0))).toBeTruthy()
})

test("Rotate", () => {
	const exp = new Vector2(-1, 0)
	const rotated = Vector2.up.rotate(Math.PI / 2)
	const eulerRotated = Vector2.up.rotateEuler(90)

	expect(rotated.equals(eulerRotated)).toBeTruthy()
	expect(rotated.equals(exp)).toBeTruthy()
	expect(Vector2.right.angle()).toBe(0)
	expect(Vector2.right.angleEuler()).toBe(0)
	expect(Vector2.up.angle()).toBe(Math.PI / 2)
	expect(Vector2.up.angleEuler()).toBe(90)
})

test("Normalize", () => {
	const v1 = new Vector2(3, 3)
	const v2 = new Vector2(3, 4)

	expect(v1.normalize().length()).toBe(1)
	expect(v1.distance(v2)).toBe(1)

	const v5 = new Vector2(1, 1).scale(1e-10)
	expect(v5.normalize().equals(Vector2.zero)).toBeTruthy()
	expect(v5.normalize().equals(Vector2.zero, true)).toBeTruthy()
})

test("Dot / Cross", () => {
	const v3 = new Vector2(42, 21)
	const v4 = new Vector2(44, 42)
	expect(v3.dot(v4)).toBe(2730)
	expect(v3.cross(v4)).toBe(840)
})
