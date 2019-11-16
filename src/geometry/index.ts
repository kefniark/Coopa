import * as matrix from "./matrix"
import * as point from "./point"
import * as rect from "./rect"
import { ArrayExt } from "../utils/extension/array"
import { DOMVector3 } from "./vector"
import { roundTo } from "../math/math"

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

const quatToDeg = (quaternion: number[]) => {
	const [qx, qy, qz, qw] = quaternion
	const qw2 = qw * qw
	const qx2 = qx * qx
	const qy2 = qy * qy
	const qz2 = qz * qz
	const test = qx * qy + qz * qw
	const unit = qw2 + qx2 + qy2 + qz2
	const conv = 180 / Math.PI

	if (test > 0.49999 * unit) {
		return [0, 2 * Math.atan2(qx, qw) * conv, 90]
	}
	if (test < -0.49999 * unit) {
		return [0, -2 * Math.atan2(qx, qw) * conv, -90]
	}

	return [
		Math.atan2(2 * qx * qw - 2 * qy * qz, 1 - 2 * qx2 - 2 * qz2) * conv,
		Math.atan2(2 * qy * qw - 2 * qx * qz, 1 - 2 * qy2 - 2 * qz2) * conv,
		Math.asin(2 * qx * qy + 2 * qz * qw) * conv
	]
}

export const decomposeMatrix = (matrix: DOMMatrix) => {
	const quat = new Array(4)
	const scale = ArrayExt.createSimilar(3, 0)
	const skew = ArrayExt.createSimilar(3, 0)
	const translation = ArrayExt.createSimilar(3, 0)

	// translation
	translation[0] = matrix.m41
	translation[1] = matrix.m42
	translation[2] = matrix.m43

	// scale & shear
	const norm = [
		new DOMVector3(matrix.m11, matrix.m12, matrix.m13),
		new DOMVector3(matrix.m21, matrix.m22, matrix.m23),
		new DOMVector3(matrix.m31, matrix.m32, matrix.m33)
	]

	// Compute X scale & XY shear
	scale[0] = norm[0].length
	norm[0].scaleTo(1 / scale[0])
	skew[0] = norm[0].dot(norm[1])

	norm[1].addVec(norm[0].clone().scaleTo(-skew[0]))

	// Compute Y scale
	scale[1] = norm[1].length
	norm[1].scaleTo(1 / scale[1])
	skew[0] /= scale[1]

	// Compute XZ and YZ shears
	skew[1] = norm[0].dot(norm[2])
	norm[2].addVec(norm[0].clone().scaleTo(-skew[1]))
	skew[2] = norm[1].dot(norm[2])
	norm[2].addVec(norm[1].clone().scaleTo(-skew[2]))

	// Compute Z scale
	scale[2] = norm[2].length
	norm[2].scaleTo(1 / scale[2])
	skew[1] /= scale[2]
	skew[2] /= scale[2]

	// Check determinant -1 (negate & scale)
	const pdum = norm[1].clone().cross(norm[2])
	if (norm[0].clone().dot(pdum) < 0) {
		for (let i = 0; i < 3; i++) {
			scale[i] *= -1
			norm[i].x *= -1
			norm[i].y *= -1
			norm[i].z *= -1
		}
	}

	// Now, get the rotations out
	quat[0] = 0.5 * Math.sqrt(Math.max(1 + norm[0].x - norm[1].y - norm[2].z, 0))
	quat[1] = 0.5 * Math.sqrt(Math.max(1 - norm[0].x + norm[1].y - norm[2].z, 0))
	quat[2] = 0.5 * Math.sqrt(Math.max(1 - norm[0].x - norm[1].y + norm[2].z, 0))
	quat[3] = 0.5 * Math.sqrt(Math.max(1 + norm[0].x + norm[1].y + norm[2].z, 0))

	if (norm[2].y > norm[1].z) quat[0] = -quat[0]
	if (norm[0].z > norm[2].x) quat[1] = -quat[1]
	if (norm[1].x > norm[0].y) quat[2] = -quat[2]

	// Convert to degree
	let rotation: number[] = []
	if (quat[0] >= 0 && quat[0] < 0.001 && quat[1] >= 0 && quat[1] < 0.001) {
		rotation = [0, 0, (Math.atan2(norm[0].y, norm[0].x) * 180) / Math.PI]
	} else {
		rotation = quatToDeg(quat)
	}

	return {
		translate: { x: roundTo(translation[0], 4), y: roundTo(translation[1], 4), z: roundTo(translation[2], 4) },
		rotate: { x: roundTo(rotation[0], 4), y: roundTo(rotation[1], 4), z: roundTo(rotation[2], 4) },
		scale: { x: roundTo(scale[0], 4), y: roundTo(scale[1], 4), z: roundTo(scale[2], 4) }
	}
}
