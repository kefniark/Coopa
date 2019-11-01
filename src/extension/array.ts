export class ArrayExt {
	static createSimilar(n: number, val: number = 0) {
		return ArrayExt.create(n, () => val)
	}

	static createOrder(n: number, start: number = 1) {
		return ArrayExt.create(n, i => start + i)
	}

	static create(n: number, cb: (index: number) => number): number[] {
		const res: number[] = new Array(n)
		for (var i = 0; i < n; i++) {
			res[i] = cb(i)
		}
		return res
	}

	static isEmpty<T>(arr: T[]): boolean {
		if (arr.length === 0) {
			return true
		}
		return false
	}

	static clone<T>(arr: T[]) {
		return arr.slice()
	}

	static first<T>(arr: T[]) {
		return arr[0]
	}

	static last<T>(arr: T[]) {
		return arr[arr.length - 1]
	}

	static insert<T>(arr: T[], index: number, value: any) {
		const array = ArrayExt.clone(arr)
		array.splice(index, 0, value)
		return array
	}

	static removeIndex<T>(arr: T[], index: number) {
		const array = ArrayExt.clone(arr)
		array.splice(index, 1)
		return array
	}

	static remove<T>(arr: T[], element: any) {
		return ArrayExt.clone(arr).filter(x => x !== element)
	}

	static sum(arr: number[]) {
		return arr.reduce((prev, curr) => prev + curr)
	}

	static avg(arr: number[]) {
		return ArrayExt.sum(arr) / arr.length
	}

	static random<T>(arr: T[]) {
		const index = Math.floor(Math.random() * (Math.floor(arr.length - 1) + 1))
		return arr[index]
	}

	static shuffle<T>(arr: T[]) {
		return ArrayExt.clone(arr).sort(() => Math.random() - 0.5)
	}
}
