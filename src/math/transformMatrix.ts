// import { onChange } from "../onchange";
// import { createMatrix, resetMatrix, matrix3dToCSS, createRect, DOMVector2 } from "../geometry"

// import * as mat4 from "./gl-matrix/mat4"
// import * as quat from "./gl-matrix/quat"
// import { forEach, roundTo, toDegree } from "./math"

/*
export class Matrix2D {
	matrix: number[]

	constructor(val?: number[]) {
		if (val) {
			this.matrix = val
		} else {
			this.matrix = mat4.create()
		}
	}

	set(pivot: number[], anchor: number[], translate: number[], rotation: number[], scale: number[]) {
		const out = mat4.create()
		const rot = quat.create()
		quat.fromEuler(rot, rotation[0], rotation[1], rotation[2])
		mat4.fromRotationTranslationScaleOrigin(out, rot, translate, scale, pivot)
		mat4.translate(out, out, anchor)
		this.matrix = out
	}

	euler() {
		let pos = [0, 0, 0]
		let q = [0, 0, 0, 0]
		let r = [0, 0, 0]
		let scale = [0, 0, 0]

		mat4.getTranslation(pos, this.matrix)
		mat4.getRotation(q, this.matrix)
		quat.getEuler(r, q)
		mat4.getScaling(scale, this.matrix)

		return {
			position: pos,
			rotation: [toDegree(r[0]), toDegree(r[1]), toDegree(r[2])],
			scale
		}
	}

	translate(val: number[]) {
		mat4.translate(this.matrix, this.matrix, val)
	}

	setValues(mat: number[]) {
		this.matrix = mat
	}

	multiply(...matrices: Matrix2D[]) {
		const out = mat4.clone(this.matrix)
		for (const mat of matrices) {
			mat4.multiply(out, out, mat.matrix)
		}
		return new Matrix2D(out)
	}

	scaleTransform(s: number[]) {
		const out = mat4.create()
		let tran = [0, 0, 0]
		let rot = [0, 0, 0, 0]
		let scale = [0, 0, 0]
		mat4.getTranslation(tran, this.matrix)
		mat4.getScaling(scale, this.matrix)
		mat4.getRotation(rot, this.matrix)
		tran[0] *= s[0]
		tran[1] *= s[1]
		tran[2] *= s[2]
		mat4.fromRotationTranslationScale(out, rot, tran, scale)
		return new Matrix2D(out)
	}

	centeredMatrix(m: Matrix2D) {
		let m1 = [0, 0, 0]
		mat4.getTranslation(m1, this.matrix)

		let m2 = [0, 0, 0]
		mat4.getTranslation(m2, m.matrix)

		mat4.translate(m.matrix, m.matrix, [m1[0] - m2[0], m1[1] - m2[1], m1[2] - m2[2]])
		return m
	}

	invert() {
		mat4.invert(this.matrix, this.matrix)
		return this
	}

	toCSS() {
		const data = mat4.clone(this.matrix)
		forEach(data, (_index, value) => roundTo(value, 3))
		return `matrix3d(${data.join(", ")})`
	}
}
*/
