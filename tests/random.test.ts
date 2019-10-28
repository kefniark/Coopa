/// <reference types="jest" />
import { rng } from "../src/random"

test("Random", () => {
	const r1 = rng.rand()
	const r2 = rng.rand()
	expect(r1).not.toBe(r2)
	expect(r1).toBeGreaterThan(0)
	expect(r1).toBeLessThan(1)

	expect(rng.randArray([1, 2, 3])).toBeGreaterThan(0)
})

test("RandBool", () => {
	var list = [0, 0]
	for (var i = 0; i < 100000; i++) {
		const r = rng.randBool()
		list[r ? 0 : 1] += 1
	}
	for (var l of list) {
		expect(l).toBeGreaterThan(45000)
	}
})

test("randRangeFloat", () => {
	const r = rng.randRangeFloat(100, 102)
	expect(r).toBeGreaterThan(100)
	expect(r).toBeLessThan(102)
})

test("randRangeInt", () => {
	const r = rng.randRangeInt(100, 102)
	expect(r).toBeGreaterThanOrEqual(100)
	expect(r).toBeLessThanOrEqual(102)

	var list = [0, 0, 0, 0]
	for (var i = 0; i < 100000; i++) {
		const r = rng.randRangeInt(0, 3)
		list[r] += 1
	}
	for (var l of list) {
		expect(l).toBeGreaterThan(20000)
	}
})

test("randRangeInt", () => {
	const r = rng.randRangeInt(100, 102)
	expect(r).toBeGreaterThanOrEqual(100)
	expect(r).toBeLessThanOrEqual(102)

	var list = [0, 0, 0, 0]
	for (var i = 0; i < 100000; i++) {
		const r = rng.randRangeInt(0, 3)
		list[r] += 1
	}
	for (var l of list) {
		expect(l).toBeGreaterThan(20000)
	}
})

test("seededRandom", () => {
	const rng1 = rng.createSeededRandom(1234)
	const rng2 = rng.createSeededRandom(1234)
	const rng3 = rng.createSeededRandom(1235)

	for (var i = 0; i < 100; i++) {
		const r1 = rng1.rand()
		const r2 = rng2.rand()
		const r3 = rng3.rand()
		expect(r1).toBe(r2)
		expect(r1).not.toBe(r3)

		rng3.randBool()
		rng3.randRangeFloat(0, 2)
		rng3.randRangeInt(0, 2)
		rng3.randArray([1, 2, 3])
	}
})
