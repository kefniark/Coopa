/// <reference types="jest" />

import { createMatrix, decomposeMatrix } from "../../src"

test("Basic", () => {
	const matrix = createMatrix()
	matrix.translateSelf(1, 2, 3)
	matrix.rotateSelf(0, 0, 40)
	matrix.scaleSelf(4, 5, 6)

	const mat = decomposeMatrix(matrix)
	console.log(mat)

	expect(mat.translate.x).toBe(1)
	expect(mat.translate.y).toBe(2)
	expect(mat.translate.z).toBe(3)

	expect(mat.rotate.x).toBe(0)
	expect(mat.rotate.y).toBe(0)
	expect(mat.rotate.z).toBe(40)

	expect(mat.scale.x).toBe(4)
	expect(mat.scale.y).toBe(5)
	expect(mat.scale.z).toBe(6)
})

test("Basic", () => {
	const matrix = createMatrix()
	matrix.translateSelf(1, 2, 3)
	matrix.rotateSelf(40, 0, 0)

	const mat = decomposeMatrix(matrix)
	console.log(mat)

	expect(mat.translate.x).toBe(1)
	expect(mat.translate.y).toBe(2)
	expect(mat.translate.z).toBe(3)

	expect(mat.rotate.x).toBe(40)
	expect(mat.rotate.y).toBe(0)
	expect(mat.rotate.z).toBe(0)
})

test("Basic", () => {
	const matrix = createMatrix()
	matrix.translateSelf(1, 2, 3)
	matrix.rotateSelf(0, 40, 0)

	const mat = decomposeMatrix(matrix)
	console.log(mat)

	expect(mat.translate.x).toBe(1)
	expect(mat.translate.y).toBe(2)
	expect(mat.translate.z).toBe(3)

	expect(mat.rotate.x).toBe(0)
	expect(mat.rotate.y).toBe(40)
	expect(mat.rotate.z).toBe(0)
})
