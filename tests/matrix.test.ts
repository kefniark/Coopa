/// <reference types="jest" />
import { Matrix2D } from "../src/math"

test("Matrix 2D", () => {
	const matrix1 = new Matrix2D()
	matrix1.set([1, 2, 0], [0, 0, 1], [1, 1, 0])

	const matrix2 = new Matrix2D()
	matrix2.set([1, 2, 0], [0, 0, 1], [1, 1, 0])

	const matrix3 = new Matrix2D()
	matrix3.set([1, 2, 0], [0, 0, 1], [1, 1, 0])

	expect(matrix1.toCSS()).toBeDefined()

	const res = matrix1.multiply(...[matrix2, matrix3])
	expect(res.toCSS()).toBeDefined()

	const matrix4 = new Matrix2D()
	matrix4.setValues(res.matrix)
})
