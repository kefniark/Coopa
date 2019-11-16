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
		return new DOMVector2(1, 1)
	}

	public get global(): DOMMatrix {
		const mat = createMatrix(matrix3dValues(this.matrix))
		mat.m41 /= this.res.x
		mat.m42 /= this.res.y
		if (this.parent) {
			const el: TransformMatrix = this.parent
			mat.multiplySelf(el.global)
		}
		return mat
	}

	public pivot: DOMVector2
	public anchor: DOMVector2
	public size: DOMVector2
	public skew: DOMVector2
	public res: DOMVector2

	constructor(x: number = 1280, y: number = 720) {
		super()
		this.skew = onChange(new DOMVector2(0, 0), () => this.computeRect())
		this.pivot = onChange(new DOMVector2(0.5, 0.5), () => this.computeRect())
		this.anchor = onChange(new DOMVector2(0.5, 0.5), () => this.computeRect())
		this.size = onChange(new DOMVector2(1, 1), () => this.computeRect())
		this.res = new DOMVector2(x, y)
	}

	setParentFix(p: RectTransformMatrix | undefined) {
		var before = this.global
		console.log(decomposeMatrix(before))
		var dec1 = decomposeMatrix(before)

		this.parent = p
		var after = this.global
		if (!this.parent) return

		var dec2 = decomposeMatrix(after)
		console.log("avant compensation", dec1, dec2)

		this.scale.x *= dec1.scale.x / dec2.scale.x
		this.scale.y *= dec1.scale.y / dec2.scale.y
		this.scale.z *= dec1.scale.z / dec2.scale.z

		this.rotation.x += dec1.rotate.x - dec2.rotate.x
		this.rotation.y += dec1.rotate.y - dec2.rotate.y
		this.rotation.z += dec1.rotate.z - dec2.rotate.z

		var pat1 = decomposeMatrix(before.inverse().multiply(this.global))

		this.position.x -= pat1.translate.x
		this.position.y += pat1.translate.y
		this.position.z -= pat1.translate.z
		console.log(pat1, pat1.translate.x, this.size.x)

		console.log("apres compensation", decomposeMatrix(this.global))
	}

	computeRect(updateChild = false) {
		this.compute()
		if (updateChild) {
			for (var child of this._child) {
				child.computeRect()
			}
		}
	}

	compute() {
		resetMatrix(this.matrix)

		// compute
		var skewDisp = this.skew.clone().scale(this.res.x, this.res.y)
		var piv = this.pivot.clone().add(-0.5, -0.5).scale(this.res.x, this.res.y)
		var anc = this.anchor.clone().add(-0.5, -0.5).scale(this.res.x, this.res.y)
		var pos = this.position.clone().scale(this.res.x, this.res.y, 1)

		// compute
		this.matrix.translateSelf(pos.x + anc.x, pos.y + anc.y, pos.z)
		this.matrix.rotateSelf(this.rotation.x, this.rotation.y, this.rotation.z)
		if (skewDisp.x !== 0) this.matrix.skewXSelf(skewDisp.x)
		if (skewDisp.y !== 0) this.matrix.skewYSelf(skewDisp.y)
		this.matrix.scaleSelf(this.scale.x * this.size.x, this.scale.y * this.size.y, this.scale.z)
		if (this.parent) {
			this.matrix.scaleSelf(1 / this.parent.size.x, 1 / this.parent.size.y, 1)
		}
		this.matrix.translateSelf(-piv.x, -piv.y, 0)

		this.onChanged.emit()
	}

	toCSS() {
		return super.toCSS()
	}
}
