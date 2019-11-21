/// <reference types="jest" />
import { Color } from "../../src"

test("Import / Export", () => {
	const color1 = new Color(125, 98, 50)
	const color2 = Color.fromHSL([125, 98, 50])
	const color3 = Color.fromHex(`#03FC17`)
	const color4 = Color.fromRGB([3, 252, 23])
	const colorWhite = Color.fromRGB([255, 255, 255])
	const colorBlack = Color.fromRGB([0, 0, 0])
	const colorR = Color.fromRGB([255, 0, 0])
	const colorG = Color.fromRGB([0, 255, 0])
	const colorB = Color.fromRGB([0, 0, 255])

	for (const color of [colorWhite, colorBlack, colorR, colorG, colorB]) {
		color.hsl()
	}

	expect(colorWhite.equals(colorBlack)).toBeFalsy()
	expect(colorWhite.equals(colorWhite.clone())).toBeTruthy()

	expect(color1.equals(color2)).toBeTruthy()
	expect(color1.equals(color3)).toBeTruthy()
	expect(color1.equals(color4)).toBeTruthy()

	expect(color1.rgb()).toEqual([3, 252, 23])
	expect(color1.hex()).toEqual(`#03FC17`)
	expect(color1.hsl()).toEqual([125, 98, 50])
})

test("Gradient", () => {
	const from = Color.random()
	const to = Color.random()
	const colors = Color.gradient(from, to, 12)
	expect(colors.length).toBe(12)

	const from2 = Color.fromRGB([0, 50, 50])
	const to2 = Color.fromRGB([185, 50, 50])
	const colors2 = Color.gradient(from2, to2, 12)
	expect(colors2.length).toBe(12)
	const colors3 = Color.gradient(to2, from2, 12)
	expect(colors3.length).toBe(12)
})

test("Palette", () => {
	const colors = Color.palette(8, 3)
	expect(colors.length).toBe(8 * 3)
})
