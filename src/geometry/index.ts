import * as matrix from "./matrix"
import * as point from "./point"
import * as rect from "./rect"

const m = globalThis.DOMMatrix ? DOMMatrix : (matrix.DOMMatrix as any)
const p = globalThis.DOMPoint ? DOMPoint : (point.DOMPoint as any)
const r = globalThis.DOMRect ? DOMRect : (rect.DOMRect as any)

export * from "./vector"

export const createMatrix = (t?: string | number[]) => new m(t) as DOMMatrix
export const createPoint = (x?: number, y?: number, z?: number, w?: number) => new p(x, y, z, w) as DOMPoint
export const createRect = (x?: number, y?: number, width?: number, height?: number) =>
	new r(x, y, width, height) as DOMRect
export const mapMatrix = (matrix: DOMMatrix, cb: (i: number, j: number, val: number) => number) => {
	matrix.m11 = cb(1, 1, matrix.m11)
	matrix.m12 = cb(1, 2, matrix.m12)
	matrix.m13 = cb(1, 3, matrix.m13)
	matrix.m14 = cb(1, 4, matrix.m14)

	matrix.m21 = cb(2, 1, matrix.m21)
	matrix.m22 = cb(2, 2, matrix.m22)
	matrix.m23 = cb(2, 3, matrix.m23)
	matrix.m24 = cb(2, 4, matrix.m24)

	matrix.m31 = cb(3, 1, matrix.m31)
	matrix.m32 = cb(3, 2, matrix.m32)
	matrix.m33 = cb(3, 3, matrix.m33)
	matrix.m34 = cb(3, 4, matrix.m34)

	matrix.m41 = cb(4, 1, matrix.m41)
	matrix.m42 = cb(4, 2, matrix.m42)
	matrix.m43 = cb(4, 3, matrix.m43)
	matrix.m44 = cb(4, 4, matrix.m44)
}

// set identity matrix
export const resetMatrix = (matrix: DOMMatrix) => mapMatrix(matrix, (i, j) => (i === j ? 1 : 0))
export const matrix3dValues = (matrix: DOMMatrix) => {
	return [
		matrix.m11,
		matrix.m12,
		matrix.m13,
		matrix.m14,
		matrix.m21,
		matrix.m22,
		matrix.m23,
		matrix.m24,
		matrix.m31,
		matrix.m32,
		matrix.m33,
		matrix.m34,
		matrix.m41,
		matrix.m42,
		matrix.m43,
		matrix.m44
	]
}
export const matrix3dToCSS = (matrix: DOMMatrix) => {
	return `matrix3d(${matrix3dValues(matrix).join(",")})`
}

export const matrix2dToCSS = (matrix: DOMMatrix) => {
	return `matrix2d(${[matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f].join(",")})`
}
