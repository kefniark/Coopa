import { rng, clamp, numberEqual } from "../utils/index"

export class Color {
	color: { h: number; s: number; l: number }

	//#region Default Colors

	// gray scale
	static white = () => Color.fromRGB([255, 255, 255])
	static silver = () => Color.fromRGB([192, 192, 192])
	static gray = () => Color.fromRGB([128, 128, 128])
	static black = () => Color.fromRGB([0, 0, 0])

	// rgb
	static red = () => Color.fromRGB([255, 0, 0])
	static maroon = () => Color.fromRGB([128, 0, 0])
	static green = () => Color.fromRGB([0, 255, 0])
	static greenDeep = () => Color.fromRGB([0, 128, 0])
	static blue = () => Color.fromRGB([0, 0, 255])
	static navy = () => Color.fromRGB([0, 0, 128])

	// mix
	static yellow = () => Color.fromRGB([255, 255, 0])
	static yellowPale = () => Color.fromRGB([255, 255, 128])
	static olive = () => Color.fromRGB([128, 128, 0])
	static aqua = () => Color.fromRGB([0, 255, 255])
	static cyan = () => Color.fromRGB([128, 255, 255])
	static teal = () => Color.fromRGB([0, 128, 128])
	static pink = () => Color.fromRGB([255, 0, 255])
	static purple = () => Color.fromRGB([128, 0, 128])
	static magenta = () => Color.fromRGB([255, 128, 255])

	// half mix
	static orange = () => Color.fromRGB([255, 128, 0])
	static rose = () => Color.fromRGB([255, 0, 128])
	static flamingo = () => Color.fromRGB([255, 128, 128])
	static kiwi = () => Color.fromRGB([128, 255, 0])
	static greenLime = () => Color.fromRGB([0, 255, 128])
	static greenPale = () => Color.fromRGB([128, 255, 128])
	static blueBolt = () => Color.fromRGB([0, 128, 255])
	static violet = () => Color.fromRGB([128, 0, 255])
	static blueSky = () => Color.fromRGB([128, 128, 255])

	//#endregion Default Colors

	//#region Default Palette
	static americanPalette() {
		return [
			Color.fromRGB([85, 239, 196]),
			Color.fromRGB([0, 184, 148]),
			Color.fromRGB([255, 234, 167]),
			Color.fromRGB([253, 203, 110]),
			Color.fromRGB([129, 236, 236]),
			Color.fromRGB([0, 206, 201]),
			Color.fromRGB([250, 177, 160]),
			Color.fromRGB([225, 112, 85]),
			Color.fromRGB([116, 185, 255]),
			Color.fromRGB([9, 132, 227]),
			Color.fromRGB([255, 118, 117]),
			Color.fromRGB([214, 48, 49]),
			Color.fromRGB([162, 155, 254]),
			Color.fromRGB([108, 92, 231]),
			Color.fromRGB([253, 121, 168]),
			Color.fromRGB([232, 67, 147]),
			Color.fromRGB([223, 230, 233]),
			Color.fromRGB([178, 190, 195]),
			Color.fromRGB([99, 110, 114]),
			Color.fromRGB([45, 52, 54])
		]
	}

	static flatPalette() {
		return [
			Color.fromRGB([26, 188, 156]),
			Color.fromRGB([22, 160, 133]),
			Color.fromRGB([241, 196, 15]),
			Color.fromRGB([243, 156, 18]),
			Color.fromRGB([46, 204, 113]),
			Color.fromRGB([39, 174, 96]),
			Color.fromRGB([230, 126, 34]),
			Color.fromRGB([211, 84, 0]),
			Color.fromRGB([52, 152, 219]),
			Color.fromRGB([41, 128, 185]),
			Color.fromRGB([231, 76, 60]),
			Color.fromRGB([192, 57, 43]),
			Color.fromRGB([155, 89, 182]),
			Color.fromRGB([142, 68, 173]),
			Color.fromRGB([236, 240, 241]),
			Color.fromRGB([189, 195, 199]),
			Color.fromRGB([52, 73, 94]),
			Color.fromRGB([44, 62, 80]),
			Color.fromRGB([149, 165, 166]),
			Color.fromRGB([127, 140, 141])
		]
	}

	static germanPalette() {
		return [
			Color.fromRGB([252, 92, 101]),
			Color.fromRGB([253, 150, 68]),
			Color.fromRGB([254, 211, 48]),
			Color.fromRGB([38, 222, 129]),
			Color.fromRGB([43, 203, 186]),
			Color.fromRGB([235, 59, 90]),
			Color.fromRGB([250, 130, 49]),
			Color.fromRGB([247, 183, 49]),
			Color.fromRGB([32, 191, 107]),
			Color.fromRGB([15, 185, 177]),
			Color.fromRGB([69, 170, 242]),
			Color.fromRGB([75, 123, 236]),
			Color.fromRGB([165, 94, 234]),
			Color.fromRGB([209, 216, 224]),
			Color.fromRGB([119, 140, 163]),
			Color.fromRGB([45, 152, 218]),
			Color.fromRGB([56, 103, 214]),
			Color.fromRGB([136, 84, 208]),
			Color.fromRGB([165, 177, 194]),
			Color.fromRGB([75, 101, 132])
		]
	}
	//#endregion Default Palette

	constructor(h: number, s: number, l: number) {
		this.color = { h: Math.round(h), s: Math.round(s), l: Math.round(l) }
		this.validate()
	}

	private validate() {
		this.color.h = Math.max(this.color.h % 360, 0)
		this.color.s = clamp(this.color.s, 0, 100)
		this.color.l = clamp(this.color.l, 0, 100)
	}

	private hue2rgb(p: number, q: number, t: number) {
		if (t < 0) t += 1
		if (t > 1) t -= 1
		if (t < 1 / 6) return p + (q - p) * 6 * t
		if (t < 1 / 2) return q
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
		return p
	}

	public clone() {
		return new Color(this.color.h, this.color.s, this.color.l)
	}

	public equals(color: Color) {
		return (
			numberEqual(this.color.h, color.color.h) &&
			numberEqual(this.color.s, color.color.s) &&
			numberEqual(this.color.l, color.color.l)
		)
	}

	static random() {
		return new Color(rng.randRangeFloat(0, 360), rng.randRangeFloat(30, 95), rng.randRangeFloat(30, 95))
	}

	static gradient(start: Color, end: Color, num = 16) {
		let diffH = (end.color.h - start.color.h) / num
		if (end.color.h - start.color.h >= 180) {
			diffH = (end.color.h - start.color.h - 360) / num
		} else if (end.color.h - start.color.h <= -180) {
			diffH = (end.color.h - start.color.h + 360) / num
		}
		const diffS = (end.color.s - start.color.s) / num
		const diffL = (end.color.l - start.color.l) / num

		const colors: Color[] = []
		for (let i = 0; i < num; i++) {
			const c = new Color(
				Math.round(start.color.h + diffH * i),
				Math.round(start.color.s + diffS * i),
				Math.round(start.color.l + diffL * i)
			)
			colors.push(c)
		}
		return colors
	}

	static palette(hue: number, level = 3, seed = -1) {
		const random = seed >= 0 ? rng.createSeededRandom(seed) : rng

		const variations: number[][] = []
		for (let i = 1; i <= level; i++) {
			variations.push([random.randRangeFloat(30, 95), random.randRangeFloat(30, 95)])
		}

		let value = random.randRangeFloat(0, 360)
		const colors: Color[] = []
		const diff = 360 / hue
		while (hue > 0) {
			value += diff
			for (const variation of variations) {
				colors.push(new Color(value, variation[0], variation[1]))
			}
			hue--
		}

		return colors
	}

	//#region Export color

	public rgb() {
		const h = this.color.h / 360
		const s = this.color.s / 100
		const l = this.color.l / 100

		let r = l
		let g = l
		let b = l

		if (s !== 0) {
			const q = l < 0.5 ? l * (1 + s) : l + s - l * s
			const p = 2 * l - q
			r = this.hue2rgb(p, q, h + 1 / 3)
			g = this.hue2rgb(p, q, h)
			b = this.hue2rgb(p, q, h - 1 / 3)
		}

		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
	}

	private toHexByte(number: number) {
		let hexByte = number.toString(16)
		if (hexByte.length < 2) hexByte = "0" + hexByte
		return hexByte.toUpperCase()
	}

	public hex() {
		const rgb = this.rgb()
		return `#${this.toHexByte(rgb[0])}${this.toHexByte(rgb[1])}${this.toHexByte(rgb[2])}`
	}

	public hsl() {
		return [this.color.h, this.color.s, this.color.l]
	}

	//#endregion Export color

	//#region Import color

	static fromHSL(hsl: number[]) {
		return new Color(hsl[0], hsl[1], hsl[2])
	}

	static fromHex(hex: string) {
		if (hex.substring(0, 1) == "#") hex = hex.substring(1)
		const r = parseInt(hex.substring(0, 2), 16)
		const g = parseInt(hex.substring(2, 4), 16)
		const b = parseInt(hex.substring(4, 6), 16)
		return Color.fromRGB([r, g, b])
	}

	static fromRGB(rgb: number[]) {
		const r = rgb[0] / 255
		const g = rgb[1] / 255
		const b = rgb[2] / 255

		const max = Math.max(r, g, b)
		const min = Math.min(r, g, b)
		let h = (max + min) / 2
		let s = 0
		let l = h

		if (max == min) {
			h = 0
			s = 0
		} else {
			const d = max - min
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0)
					break
				case g:
					h = (b - r) / d + 2
					break
				case b:
					h = (r - g) / d + 4
					break
			}

			h = h / 6
		}

		h = Math.round(360 * h)
		s = Math.round(100 * s)
		l = Math.round(100 * l)

		return new Color(h, s, l)
	}

	//#endregion Import color
}
