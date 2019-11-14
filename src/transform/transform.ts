import { createMatrix, resetMatrix, matrix3dToCSS, matrix3dValues } from "../geometry"
import { onChange } from "../utils/onchange"

/**
 * Basic Transform class, provide (position, rotation, scale) and take care of transformation
 *
 * @export
 * @class TransformMatrix
 */
export class TransformMatrix {
	public parent: TransformMatrix | undefined
	public matrix: DOMMatrix
	public position: number[]
	public rotation: number[]
	public scale: number[]

	public get global() {
		let mat = createMatrix(matrix3dValues(this.matrix))
		let el: TransformMatrix = this
		while (!!el.parent) {
			el = el.parent
			mat.multiply(el.matrix)
		}
		return mat
	}

	constructor() {
		this.matrix = createMatrix()
		this.position = onChange([0, 0, 0], () => this.compute())
		this.rotation = onChange([0, 0, 0], () => this.compute())
		this.scale = onChange([1, 1, 1], () => this.compute())
	}

	compute(reset: boolean = true) {
		if (reset) resetMatrix(this.matrix)
		this.matrix.translateSelf(this.position[0], this.position[1], this.position[2])
		this.matrix.rotateSelf(this.rotation[0], this.rotation[1], this.rotation[2])
		this.matrix.scaleSelf(this.scale[0], this.scale[1], this.scale[2])
	}

	toCSS() {
		return matrix3dToCSS(this.matrix)
	}
}
