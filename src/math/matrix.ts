import { rng } from "../random"
import { numberEqual } from "./math"

/**
 * Basic Matrix class
 *
 * @export
 */
export class Matrix {
	get type() {
		return `(${this.rows} x ${this.columns})`
	}

	get rows() {
		return this.elements.length
	}

	get columns() {
		return this.elements[0].length
	}

	constructor(elements?: number[][]) {
		if (elements) this.set(elements)
	}

	protected elements: number[][] = []

	/**
	 * Create a matrix with values
	 *
	 * @static
	 * @param {(number[][] | number[])} elements
	 * @returns
	 */
	static create(elements: number[][] | number[]) {
		const m = new Matrix()
		return m.set(elements)
	}

	/**
	 * Create an empty matrix based on the size
	 *
	 * @static
	 * @param {number} n number of row
	 * @param {number} m number of column
	 * @returns {Matrix}
	 */
	static createZero(n: number, m: number) {
		const elem: number[][] = []
		for (let i = 0; i < n; i++) {
			elem[i] = []
			for (let j = 0; j < m; j++) {
				elem[i][j] = 0
			}
		}
		return Matrix.create(elem)
	}

	/**
	 * Create a matrix from diagonal values
	 *
	 * @static
	 * @param {number[]} val
	 * @returns {Matrix}
	 */
	static createDiagonal(val: number[]) {
		let i = val.length
		const m = Matrix.createIdentity(i)
		while (i--) {
			m.elements[i][i] = val[i]
		}
		return m
	}

	/**
	 * Create an identity matrix
	 *
	 * @static
	 * @param {number} n size
	 * @returns {Matrix}
	 */
	static createIdentity(n: number) {
		let els: number[][] = [],
			i = n,
			j
		while (i--) {
			j = n
			els[i] = []
			while (j--) {
				els[i][j] = i === j ? 1 : 0
			}
		}
		return Matrix.create(els)
	}

	/**
	 * Create Random matrix
	 *
	 * @static
	 * @param {number} n number of row
	 * @param {number} m number of column
	 * @returns {Matrix}
	 */
	static createRandom(n: number, m: number) {
		return Matrix.createZero(n, m).map(() => rng.rand(), Matrix.create([]))
	}

	/**
	 * Get a value by row/col
	 * Important: use math indexes (start at 1,1 and not 0,0)
	 *
	 * @param {number} i
	 * @param {number} j
	 * @returns {number}
	 */
	el(i: number, j: number) {
		if (i < 1 || i > this.elements.length || j < 1 || j > this.elements[0].length) return undefined
		return this.elements[i - 1][j - 1]
	}

	/**
	 * Create a new matrix with same values
	 *
	 * @returns {Matrix}
	 */
	clone(): Matrix {
		return Matrix.create(this.elements)
	}

	scale(scalar: number) {
		return this.map(x => x * scalar, Matrix.create([]))
	}

	scaleInto<T extends Matrix>(scalar: number, into: T): T {
		return this.map(x => x * scalar, into) as T
	}

	/**
	 * Add another matrix (and return a new one)
	 *
	 * @param {Matrix} matrix
	 * @returns {Matrix} new matrix
	 */
	add(matrix: Matrix): Matrix {
		return this._add(matrix, Matrix.create([]))
	}

	addInto<T extends Matrix>(matrix: T, into: T): T {
		return this._add(matrix, into) as T
	}

	/**
	 * Subtract another matrix (and return a new one)
	 *
	 * @param {Matrix} matrix
	 * @returns {Matrix} new matrix
	 */
	subtract(matrix: Matrix): Matrix {
		return this._subtract(matrix, Matrix.create([]))
	}

	subtractInto<T extends Matrix>(matrix: T, into: T): T {
		return this._subtract(matrix, into) as T
	}

	/**
	 * Multiply with another matrix
	 *
	 * @param {Matrix} matrix
	 * @returns {Matrix} new matrix
	 */
	multiply(matrix: Matrix): Matrix {
		return this._multiply(matrix, Matrix.create([]))
	}

	/**
	 * Check equality
	 *
	 * @param {Matrix} matrix
	 * @returns {boolean}
	 */
	equals(matrix: Matrix, exact: boolean = false): boolean {
		if (!this.isSameSize(matrix)) return false
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.columns; j++) {
				if (exact) {
					if (this.elements[i][j] !== matrix.elements[i][j]) return false
				} else {
					if (!numberEqual(this.elements[i][j], matrix.elements[i][j])) return false
				}
			}
		}
		return true
	}

	/**
	 * Check that different matrics have the same size
	 *
	 * @param {Matrix} matrix
	 * @returns {boolean}
	 */
	isSameSize(matrix: Matrix): boolean {
		return this.rows === matrix.rows && this.columns === matrix.columns
	}

	/**
	 * Check if the matrix is a square or not
	 *
	 * @returns {boolean}
	 */
	isSquare() {
		return this.rows === this.columns
	}

	/**
	 * Inspect the content of the matrix
	 *
	 * a string with the form:
	 *  [0, 0, 0]
	 *  [1, 2, 3]
	 *
	 * @returns {string}
	 */
	inspect(): string {
		const matrix_rows: string[] = []
		if (this.rows === 0) return "[]"
		for (let i = 0; i < this.rows; i++) {
			matrix_rows.push(`[ ${this.elements[i].join(", ")} ]`)
		}
		return matrix_rows.join("\n")
	}

	/**
	 * To String
	 *
	 * @returns {string}
	 */
	toString(): string {
		return `Matrix ${this.type}\n${this.inspect()}`
	}

	protected _add(matrix: Matrix, into: Matrix) {
		if (!this.isSameSize(matrix)) throw new Error("different size")
		return this.map((x, i, j) => x + matrix.elements[i - 1][j - 1], into)
	}

	protected _subtract(matrix: Matrix, into: Matrix) {
		if (!this.isSameSize(matrix)) throw new Error("different size")
		return this.map((x, i, j) => x - matrix.elements[i - 1][j - 1], into)
	}

	private _multiply(matrix: Matrix, into: Matrix) {
		if (!this.canMultiply(matrix)) {
			throw new Error(`Cannot multiply ${this.type} x ${matrix.type}`)
		}

		let i = this.elements.length,
			nj = matrix.columns,
			j
		let cols = this.columns,
			c,
			elements: number[][] = [],
			sum
		while (i--) {
			j = nj
			elements[i] = []
			while (j--) {
				c = cols
				sum = 0
				while (c--) {
					sum += this.elements[i][c] * matrix.elements[c][j]
				}
				elements[i][j] = sum
			}
		}
		return into ? into.set(elements) : Matrix.create(elements)
	}

	protected canMultiply(matrix: Matrix) {
		if (this.elements.length === 0) return false
		return this.columns === matrix.rows
	}

	protected map(fn: (val: number, i: number, j: number) => number, into: Matrix) {
		const elements: number[][] = []
		let i = this.elements.length
		const nj = this.elements[0].length
		let j = 0
		while (i--) {
			j = nj
			elements[i] = []
			while (j--) {
				elements[i][j] = fn.call(undefined, this.elements[i][j], i + 1, j + 1)
			}
		}

		return into.set(elements)
	}

	public set(elements: number[][] | number[]) {
		let i = 0
		let j = 0
		if (elements[0] && Array.isArray(elements[0])) {
			const array2d: number[][] = elements as any
			i = array2d.length
			this.elements = []
			while (i--) {
				j = array2d[i].length
				this.elements[i] = []
				while (j--) {
					this.elements[i][j] = array2d[i][j]
				}
			}
			return this
		}
		const array1d: number[] = elements as any
		const n = array1d.length
		this.elements = []
		for (i = 0; i < n; i++) {
			this.elements.push([array1d[i]])
		}
		return this
	}
}
