import { clamp, numberEqual } from "../math/math"
import { rng } from "../utils"

export class Color {
	color: { h: number; s: number; l: number }

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
		let s = h
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
