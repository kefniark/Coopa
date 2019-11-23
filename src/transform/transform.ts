/* istanbul ignore file */
import { createMatrix, resetMatrix, matrix3dToCSS, matrix3dValues, DOMVector3, matrix2dToCSS } from "../geometry/index"
import { ArrayExt } from "../extension/index"
import { Event, onChange } from "../events/index"

/**
 * Basic Transform class, provide (position, rotation, scale) and take care of transformation
 *
 * @export
 * @class TransformMatrix
 */
export class TransformMatrix {
	public onParentChanged: Event<TransformMatrix | undefined>
	public onChanged: Event<void>
	public onDelayedChanged: Event<void>
	protected _parent: TransformMatrix | undefined
	protected _child: TransformMatrix[] = []
	get parent() {
		return this._parent
	}
	set parent(p: TransformMatrix | undefined) {
		if (p === this._parent) return
		if (this._parent) {
			ArrayExt.remove(this._parent._child, this)
		}
		this._parent = p
		this.onParentChanged.emit(p)
		if (this._parent) {
			this._parent._child.push(this)
		}
	}

	public matrix: DOMMatrix
	public position: DOMVector3
	public rotation: DOMVector3
	public scale: DOMVector3

	public get globalMatrix(): DOMMatrix {
		const mat = createMatrix(matrix3dValues(this.matrix))
		if (this.parent) {
			const el: TransformMatrix = this.parent
			mat.multiplySelf(el.globalMatrix)
		}
		return mat
	}

	constructor() {
		this.matrix = createMatrix()
		this.position = onChange(new DOMVector3(0, 0, 0), () => this.compute())
		this.rotation = onChange(new DOMVector3(0, 0, 0), () => this.compute())
		this.scale = onChange(new DOMVector3(1, 1, 1), () => this.compute())
		this.onChanged = new Event()
		this.onParentChanged = new Event()
	}

	compute() {
		resetMatrix(this.matrix)
		this.matrix.translateSelf(this.position.x, this.position.y, this.position.z)
		this.matrix.rotateSelf(this.rotation.x, this.rotation.y, this.rotation.z)
		this.matrix.scaleSelf(this.scale.x, this.scale.y, this.scale.z)
		this.onChanged.emit()
	}

	toCSS() {
		return {
			transform: matrix3dToCSS(this.matrix)
		}
	}

	toCSS2D() {
		return {
			transform: matrix2dToCSS(this.matrix)
		}
	}
}
