import * as mat4 from "./gl-matrix/mat4"
import * as quat from "./gl-matrix/quat"
import { forEach, roundTo } from "./math"

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
		let pos = [0,0,0]
		let rot = [0,0,0,0]
		let scale = [0,0,0]

		mat4.getTranslation(pos, this.matrix)
		mat4.getRotation(rot, this.matrix)
		mat4.getScaling(scale, this.matrix)

		return {
			position: pos,
			rotation: rot,
			scale
		}
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
