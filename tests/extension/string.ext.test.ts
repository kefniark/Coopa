/// <reference types="jest" />
import { StringExt } from "../../src"

test("is-empty", () => {
	expect(StringExt.isNullOrEmpty(undefined)).toBeTruthy()
	expect(StringExt.isNullOrEmpty(null)).toBeTruthy()
	expect(StringExt.isNullOrEmpty("")).toBeTruthy()
	expect(StringExt.isNullOrEmpty(" ")).toBeTruthy()
	expect(StringExt.isNullOrEmpty("a")).toBeFalsy()
	expect(StringExt.isNullOrEmpty("1")).toBeFalsy()
})

test("capitalize", () => {
	expect(StringExt.capitalize("hello")).toBe("Hello")
	expect(StringExt.capitalize("h")).toBe("H")
	expect(StringExt.capitalize("")).toBe("")

	expect(StringExt.capitalizeWords("hello world!")).toBe("Hello World!")
	expect(StringExt.capitalizeWords("hello")).toBe("Hello")
	expect(StringExt.capitalizeWords("h")).toBe("H")
	expect(StringExt.capitalizeWords("")).toBe("")
})

test("contains", () => {
	expect(StringExt.contains("hello", "hel")).toBeTruthy()
	expect(StringExt.contains("hello", "heb")).toBeFalsy()
	expect(StringExt.contains("hel", "hello")).toBeFalsy()
})

test("slugify", () => {
	expect(StringExt.slugify("John rambo", false)).toBe("John-rambo")
	expect(StringExt.slugify("John rambo", true)).toBe("john-rambo")
	expect(StringExt.slugify("John rambo")).toBe("john-rambo")
})
