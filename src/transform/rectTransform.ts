/* istanbul ignore file */
/* eslint @typescript-eslint/no-this-alias: 0 */

import { TransformMatrix } from "./transform"
import { DOMVector2, resetMatrix, decomposeMatrix, createMatrix, matrix3dValues } from "../geometry/index"
import { ArrayExt, onChange } from "../utils/index"

/**
 * Extend Transform matrix and add simple layout system with pivot, anchor and size
 *
 * @export
 * @class RectTransformMatrix
 */
export class RectTransformMatrix extends TransformMatrix {
	protected _parent: RectTransformMatrix | undefined
	protected _child: RectTransformMatrix[] = []
	get parent() {
		return this._parent
	}
	set parent(p: RectTransformMatrix | undefined) {
		if (p === this._parent) return
		if (this._parent) {
			ArrayExt.remove(this._parent._child, this)
		}
		this._parent = p
		this.computeRect()
		this.onParentChanged.emit(p)
		if (this._parent) {
			this._parent._child.push(this)
		}
	}

	get angle() {
		return this.rotation.z
	}
	set angle(val: number) {
		this.rotation.z = val
	}
	get compensatedSize() {
		if (this.parent) {
			return this.parent.size.clone().invert()
		}
		return new DOMVector2((this.anchor.x - 0.5) * this.res.x, (this.anchor.y - 0.5) * this.res.y)
	}

	public get localOrigin(): DOMPoint {
		let point = new DOMPoint()
		point = point.matrixTransform(this.matrix)
		point.x /= this.res.x
		point.y /= this.res.y
		return point
	}

	public get globalOrigin(): DOMPoint {
		let point = new DOMPoint()
		point = point.matrixTransform(this.globalMatrix)
		point.x /= this.res.x
		point.y /= this.res.y
		return point
	}

	public get globalMatrix(): DOMMatrix {
		const queue: RectTransformMatrix[] = [this]
		let self: RectTransformMatrix = this
		while (self.parent) {
			queue.push(self.parent)
			self = self.parent
		}

		const mat = createMatrix(matrix3dValues(queue[queue.length - 1].matrix))
		queue.pop()
		while (queue.length > 0) {
			const element = queue.pop()
			if (!element) continue
			mat.multiplySelf(element.matrix)
		}

		return mat
	}

	protected rectMatrix: DOMMatrix
	protected computedtMatrix: DOMMatrix
	public pivot: DOMVector2
	public anchor: DOMVector2
	public size: DOMVector2
	public skew: DOMVector2
	public res: DOMVector2

	constructor(x = 1280, y = 720) {
		super()
		this.rectMatrix = createMatrix()
		this.computedtMatrix = createMatrix()
		this.skew = onChange(new DOMVector2(0, 0), () => this.computeRect())
		this.pivot = onChange(new DOMVector2(0.5, 0.5), () => this.computeRect())
		this.anchor = onChange(new DOMVector2(0.5, 0.5), () => this.computeRect())
		this.size = onChange(new DOMVector2(1, 1), () => this.computeRect())
		this.res = new DOMVector2(x, y)
	}

	setParentFix(p: RectTransformMatrix | undefined) {
		const before = this.globalMatrix
		const dec1 = decomposeMatrix(before)

		this.parent = p
		const after = this.globalMatrix
		if (!this.parent) return

		const dec2 = decomposeMatrix(after)

		this.scale.x *= dec1.scale.x / dec2.scale.x
		this.scale.y *= dec1.scale.y / dec2.scale.y
		this.scale.z *= dec1.scale.z / dec2.scale.z

		this.rotation.x += dec1.rotate.x - dec2.rotate.x
		this.rotation.y += dec1.rotate.y - dec2.rotate.y
		this.rotation.z += dec1.rotate.z - dec2.rotate.z

		this.position.x += (dec1.translate.x - dec2.translate.x) / this.parent.size.x / this.res.x
		this.position.y += (dec1.translate.y - dec2.translate.y) / this.parent.size.y / this.res.y
		this.position.z += dec1.translate.z - dec2.translate.z
	}

	computeRect(updateChild = false) {
		resetMatrix(this.rectMatrix)

		const piv = this.pivot
			.clone()
			.add(-0.5, -0.5)
			.scale(this.res.x, this.res.y)

		// compute
		this.rectMatrix.scaleSelf(this.size.x, this.size.y, 1)
		if (this.parent) {
			this.rectMatrix.scaleSelf(1 / this.parent.size.x, 1 / this.parent.size.y, 1)
		}
		this.rectMatrix.translateSelf(-piv.x, -piv.y, 0)

		this.compute()
		if (updateChild) {
			for (const child of this._child) {
				child.computeRect()
			}
		}
	}

	compute() {
		resetMatrix(this.computedtMatrix)

		const skew = this.skew.clone().scale(this.res.x, this.res.y)
		const pos = this.position.clone().scale(this.res.x, this.res.y, 1)
		const anc = this.anchor
			.clone()
			.add(-0.5, -0.5)
			.scale(this.res.x, this.res.y)

		this.computedtMatrix.translateSelf(anc.x, anc.y, 0)

		// compute
		this.computedtMatrix.translateSelf(pos.x, pos.y, pos.z)
		this.computedtMatrix.rotateSelf(this.rotation.x, this.rotation.y, this.rotation.z)
		if (skew.x !== 0) this.computedtMatrix.skewXSelf(skew.x)
		if (skew.y !== 0) this.computedtMatrix.skewYSelf(skew.y)
		this.computedtMatrix.scaleSelf(this.scale.x, this.scale.y, this.scale.z)

		// compute result
		resetMatrix(this.matrix)
		this.matrix.preMultiplySelf(this.computedtMatrix)
		this.matrix.multiplySelf(this.rectMatrix)

		this.onChanged.emit()
	}
}
