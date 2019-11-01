/// <reference types="jest" />
import { ArrayExt } from "../../src"

test("is-empty", () => {
	expect(ArrayExt.isEmpty([])).toBeTruthy()
	expect(ArrayExt.isEmpty([1, 2])).toBeFalsy()
})

test("create", () => {
	const zero = ArrayExt.createSimilar(16)
	const one = ArrayExt.createSimilar(9, 1)
	const order = ArrayExt.createOrder(5)

	expect(zero.length).toBe(16)
	expect(ArrayExt.first(zero)).toBe(0)
	expect(ArrayExt.last(zero)).toBe(0)

	expect(one.length).toBe(9)
	expect(ArrayExt.first(one)).toBe(1)
	expect(ArrayExt.last(one)).toBe(1)

	expect(order.length).toBe(5)
	expect(ArrayExt.first(order)).toBe(1)
	expect(ArrayExt.last(order)).toBe(5)
})

test("clone", () => {
	const src = [1, 2, 3]
	const dest = ArrayExt.clone(src)

	expect(ArrayExt.first(dest)).toBe(1)
	expect(ArrayExt.last(dest)).toBe(3)
	expect(src).toEqual(dest)

	expect(ArrayExt.sum(dest)).toBe(6)
	expect(ArrayExt.avg(dest)).toBe(2)
	dest.pop()
	expect(src).not.toEqual(dest)
})

test("remove", () => {
	const src = [1, 2, 3, 4, 5]
	const arr1 = ArrayExt.removeIndex(src, 2)
	const arr2 = ArrayExt.remove(src, 3)

	expect(arr1).toEqual(arr2)
	expect(arr1.length).toEqual(4)

	const arr3 = ArrayExt.insert(arr1, 2, 3)
	expect(src).toEqual(arr3)
})

test("random", () => {
	const src = ArrayExt.createOrder(500)
	const rnd = ArrayExt.random(src)
	const shu = ArrayExt.shuffle(src)

	expect(shu.length).toBe(src.length)
	expect(rnd).toBeLessThanOrEqual(500)
	expect(rnd).toBeGreaterThan(0)
})
