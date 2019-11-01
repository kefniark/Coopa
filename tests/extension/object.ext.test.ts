/// <reference types="jest" />
import { ObjectExt } from "../../src"

test("is-string", () => {
	expect(ObjectExt.isString(0)).toBeFalsy()
	expect(ObjectExt.isString(1)).toBeFalsy()
	expect(ObjectExt.isString(undefined)).toBeFalsy()
	expect(ObjectExt.isString(null)).toBeFalsy()
	expect(ObjectExt.isString("")).toBeTruthy()
	expect(ObjectExt.isString(" ")).toBeTruthy()
	expect(ObjectExt.isString("lol")).toBeTruthy()
	expect(ObjectExt.isString([])).toBeFalsy()
	expect(ObjectExt.isString([1, 2, 3])).toBeFalsy()
	expect(ObjectExt.isString({})).toBeFalsy()
})

test("is-array", () => {
	expect(ObjectExt.isArray(0)).toBeFalsy()
	expect(ObjectExt.isArray(1)).toBeFalsy()
	expect(ObjectExt.isArray(undefined)).toBeFalsy()
	expect(ObjectExt.isArray(null)).toBeFalsy()
	expect(ObjectExt.isArray("")).toBeFalsy()
	expect(ObjectExt.isArray(" ")).toBeFalsy()
	expect(ObjectExt.isArray("lol")).toBeFalsy()
	expect(ObjectExt.isArray([])).toBeTruthy()
	expect(ObjectExt.isArray([1, 2, 3])).toBeTruthy()
	expect(ObjectExt.isArray({})).toBeFalsy()
})

test("is-numeric", () => {
	expect(ObjectExt.isNumeric(0)).toBeTruthy()
	expect(ObjectExt.isNumeric(1)).toBeTruthy()
	expect(ObjectExt.isNumeric(undefined)).toBeFalsy()
	expect(ObjectExt.isNumeric(null)).toBeFalsy()
	expect(ObjectExt.isNumeric("")).toBeFalsy()
	expect(ObjectExt.isNumeric(" ")).toBeFalsy()
	expect(ObjectExt.isNumeric("lol")).toBeFalsy()
	expect(ObjectExt.isNumeric([])).toBeFalsy()
	expect(ObjectExt.isNumeric([1, 2, 3])).toBeFalsy()
	expect(ObjectExt.isNumeric({})).toBeFalsy()
})

test("clone", () => {
	const obj = { a: 1, b: 2, c: 3 }
	const obj2 = ObjectExt.clone(obj)
	expect(obj).toEqual(obj2)
})
