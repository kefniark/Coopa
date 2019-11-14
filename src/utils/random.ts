export class Random {
	public rand() {
		return Math.random()
	}

	public randBool(): boolean {
		return this.randRangeInt(0, 1) === 0
	}

	public randRangeFloat(min: number, max: number, rng?: number): number {
		if (!rng) rng = Math.random()
		return rng * (max - min) + min
	}

	public randRangeInt(min: number, max: number, rng?: number): number {
		if (!rng) rng = Math.random()
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(rng * (max - min + 1)) + min
	}

	public randArray<T>(arr: T[]): T {
		const index = this.randRangeInt(0, arr.length - 1)
		return arr[index]
	}

	public createSeededRandom(seed: number = -1) {
		return new SeededRandom(seed)
	}
}

export class SeededRandom {
	private seed: number

	constructor(seed: number) {
		this.seed = seed
	}

	private next() {
		this.seed = (this.seed * 9301 + 49297) % 233280
		return this.seed / 233280.0
	}

	public rand() {
		return this.next()
	}

	public randBool(): boolean {
		return this.randRangeInt(0, 1) === 0
	}

	public randRangeFloat(min: number, max: number): number {
		return rng.randRangeFloat(min, max, this.next())
	}

	public randRangeInt(min: number, max: number): number {
		return rng.randRangeInt(min, max, this.next())
	}

	public randArray<T>(arr: T[]): T {
		const index = rng.randRangeInt(0, arr.length - 1)
		return arr[index]
	}
}

export const rng = new Random()
