/// <reference types="jest" />
import { TransformMatrix, RectTransformMatrix } from "../../src"

test("Transform Matrix", () => {
	var t = new TransformMatrix()
	t.position[0] = 2
	t.rotation[2] = 90
	console.log(t.toCSS())
})

test("Rect Transform Matrix", () => {
	var p = new RectTransformMatrix()
	p.size.set(4, 2)

	var t = new RectTransformMatrix()
	t.parent = p

	t.pivot.set(0, 0)
	t.anchor.set(0, 0)
	console.log([t.rect.left, t.rect.top, t.rect.right, t.rect.bottom])

	t.pivot.set(1, 1)
	t.anchor.set(1, 1)
	console.log([t.rect.left, t.rect.top, t.rect.right, t.rect.bottom])

	t.pivot.set(0, 0)
	t.anchor.set(0, 0)
	t.size.set(0.5, 0.5)
	console.log("top left", [t.rect.left, t.rect.top, t.rect.right, t.rect.bottom])

	t.pivot.set(0.5, 0.5)
	t.anchor.set(0, 0)
	t.size.set(0.5, 0.5)
	console.log("top left - no pivot", [t.rect.left, t.rect.top, t.rect.right, t.rect.bottom])

	t.pivot.set(1, 1)
	t.anchor.set(1, 1)
	t.size.set(0.5, 0.5)
	console.log("bottom right", [t.rect.left, t.rect.top, t.rect.right, t.rect.bottom])

	t.pivot.set(1, 0)
	t.anchor.set(1, 0)
	t.size.set(0.25, 0.25)
	console.log("top right", [t.rect.left, t.rect.top, t.rect.right, t.rect.bottom])
})
