import { TransformMatrix } from "./transform"
import { DOMVector2, createRect, resetMatrix } from "../geometry"
import { onChange } from "../utils/onchange"

/**
 * Extend Transform matrix and add simple layout system with pivot, anchor and size
 *
 * @export
 * @class RectTransformMatrix
 */
export class RectTransformMatrix extends TransformMatrix {
	public parent: RectTransformMatrix | undefined
	public pivot: DOMVector2
	public anchor: DOMVector2
	public size: DOMVector2
	public rect: DOMRect

	constructor() {
		super()
		this.rect = createRect()
		this.pivot = onChange(new DOMVector2(0.5, 0.5), () => this.computeRect())
		this.anchor = onChange(new DOMVector2(0.5, 0.5), () => this.computeRect())
		this.size = onChange(new DOMVector2(1, 1), () => this.computeRect())
	}

	// setPivotFix(x: number, y: number) {

	// }

	// setAnchorFix(x: number, y: number) {

	// }

	// setSizeFix(x: number, y: number) {

	// }

	computeRect() {
		var w = this.parent ? this.parent.size.x : 1
		var h = this.parent ? this.parent.size.y : 1
		this.rect.width = this.size.x
		this.rect.height = this.size.y
		this.rect.x = this.anchor.x * w - this.pivot.x * this.size.x
		this.rect.y = this.anchor.y * h - this.pivot.y * this.size.y
		this.compute()
	}

	compute(reset: boolean = true) {
		if (reset) resetMatrix(this.matrix)

		// compute
		this.matrix.translateSelf(this.pivot.x, this.pivot.y)
		super.compute(false)
		this.matrix.translateSelf(-this.pivot.x, -this.pivot.y)
		this.matrix.translateSelf(-this.rect.x / 2, -this.rect.y / 2)
	}
}
