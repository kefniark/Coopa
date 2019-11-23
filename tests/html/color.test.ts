/// <reference types="jest" />
import { Color } from "../../src"

test("Default Colors", () => {
	expect(Color.white()).toBeDefined()
	expect(Color.black()).toBeDefined()
	expect(Color.gray()).toBeDefined()

	// rgb
	expect(Color.red()).toBeDefined()
	expect(Color.maroon()).toBeDefined()
	expect(Color.green()).toBeDefined()
	expect(Color.greenDeep()).toBeDefined()
	expect(Color.blue()).toBeDefined()
	expect(Color.navy()).toBeDefined()

	// mix
	expect(Color.yellow()).toBeDefined()
	expect(Color.yellowPale()).toBeDefined()
	expect(Color.olive()).toBeDefined()
	expect(Color.aqua()).toBeDefined()
	expect(Color.cyan()).toBeDefined()
	expect(Color.teal()).toBeDefined()
	expect(Color.pink()).toBeDefined()
	expect(Color.purple()).toBeDefined()
	expect(Color.rose()).toBeDefined()

	// half mix
	expect(Color.orange()).toBeDefined()
	expect(Color.magenta()).toBeDefined()
	expect(Color.flamingo()).toBeDefined()
	expect(Color.kiwi()).toBeDefined()
	expect(Color.greenLime()).toBeDefined()
	expect(Color.greenPale()).toBeDefined()
	expect(Color.blueBolt()).toBeDefined()
	expect(Color.violet()).toBeDefined()
	expect(Color.blueSky()).toBeDefined()

	// palette
	expect(Color.germanPalette()).toBeDefined()
	expect(Color.flatPalette()).toBeDefined()
	expect(Color.americanPalette()).toBeDefined()
})

test("Import / Export", () => {
	const color1 = new Color(125, 98, 50)
	const color2 = Color.fromHSL([125, 98, 50])
	const color3 = Color.fromHex(`#03FC17`)
	const color35 = Color.fromHex(`03FC17`)
	const color4 = Color.fromRGB([3, 252, 23])
	const colorWhite = Color.fromRGB([255, 255, 255])
	const colorBlack = Color.fromRGB([0, 0, 0])
	const colorR = Color.fromRGB([255, 0, 0])
	const colorG = Color.fromRGB([0, 255, 0])
	const colorB = Color.fromRGB([0, 0, 255])
	const colorA = Color.fromHSL([125, 0, 50])

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
	expect(color35.hex()).toEqual(`#03FC17`)
	expect(color1.hsl()).toEqual([125, 98, 50])

	expect(colorA.rgb()).toBeDefined()
	expect(colorA.hex()).toBeDefined()
	expect(colorA.hsl()).toBeDefined()

	for (var color of Color.germanPalette()) {
		expect(color.rgb()).toBeDefined()
		expect(color.hex()).toBeDefined()
		expect(color.hsl()).toBeDefined()
	}
})

test("Gradient", () => {
	const from = Color.random()
	const to = Color.random()
	const colors = Color.gradient(from, to, 12)
	expect(colors.length).toBe(12)

	const from2 = Color.fromRGB([0, 50, 50])
	const to2 = Color.fromRGB([185, 50, 50])
	const colors1 = Color.gradient(from2, to2)
	expect(colors1.length).toBe(16)
	const colors2 = Color.gradient(from2, to2, 12)
	expect(colors2.length).toBe(12)
	const colors3 = Color.gradient(to2, from2, 12)
	expect(colors3.length).toBe(12)
})

test("Palette", () => {
	const colors = Color.palette(8, 3)
	expect(colors.length).toBe(8 * 3)

	// pass a seed number, should have the same result
	const colors1 = Color.palette(8)
	const colors2 = Color.palette(8, 3, 5)
	const colors3 = Color.palette(8, 3, 5)

	expect(colors2).toEqual(colors3)
	expect(colors2).not.toEqual(colors1)
})
