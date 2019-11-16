// /// <reference types="jest" />
// import { TransformMatrix, RectTransformMatrix } from "../../src"

// test("Transform Matrix", () => {
// 	var t = new TransformMatrix()
// 	t.position[0] = 2
// 	t.rotation[2] = 90
// 	console.log(t.toCSS())
// })

// test("Rect Transform Pivot Anchor", () => {
// 	var p = new RectTransformMatrix()
// 	p.size.set(4, 2)

// 	var t = new RectTransformMatrix()
// 	t.parent = p

// 	t.pivot.set(0, 0)
// 	t.anchor.set(0, 0)
// 	expect(t.rect.left).toBe(0)
// 	expect(t.rect.top).toBe(0)
// 	expect(t.rect.right).toBe(1)
// 	expect(t.rect.bottom).toBe(1)

// 	t.pivot.set(1, 1)
// 	t.anchor.set(1, 1)
// 	expect(t.rect.left).toBe(3)
// 	expect(t.rect.top).toBe(1)
// 	expect(t.rect.right).toBe(4)
// 	expect(t.rect.bottom).toBe(2)

// 	t.pivot.set(0, 0)
// 	t.anchor.set(0, 0)
// 	t.size.set(0.5, 0.5)
// 	expect(t.rect.left).toBe(0)
// 	expect(t.rect.top).toBe(0)
// 	expect(t.rect.right).toBe(0.5)
// 	expect(t.rect.bottom).toBe(0.5)

// 	t.pivot.set(0.5, 0.5)
// 	t.anchor.set(0, 0)
// 	t.size.set(0.5, 0.5)
// 	expect(t.rect.left).toBe(-0.25)
// 	expect(t.rect.top).toBe(-0.25)
// 	expect(t.rect.right).toBe(0.25)
// 	expect(t.rect.bottom).toBe(0.25)

// 	t.pivot.set(1, 1)
// 	t.anchor.set(1, 1)
// 	t.size.set(0.5, 0.5)
// 	expect(t.rect.left).toBe(3.5)
// 	expect(t.rect.top).toBe(1.5)
// 	expect(t.rect.right).toBe(4)
// 	expect(t.rect.bottom).toBe(2)

// 	t.pivot.set(1, 0)
// 	t.anchor.set(1, 0)
// 	t.size.set(0.25, 0.25)
// 	expect(t.rect.left).toBe(3.75)
// 	expect(t.rect.top).toBe(0)
// 	expect(t.rect.right).toBe(4)
// 	expect(t.rect.bottom).toBe(0.25)

// 	p.size.set(1, 1)

// 	expect(t.rect.left).toBe(0.75)
// 	expect(t.rect.top).toBe(0)
// 	expect(t.rect.right).toBe(1)
// 	expect(t.rect.bottom).toBe(0.25)
// })

// test("Transform Change Anchor/Pivot", () => {
// 	var p0 = new RectTransformMatrix()

// 	var p1 = new RectTransformMatrix()
// 	p1.parent = p0
// 	p1.pivot.set(0, 0)
// 	p1.anchor.set(0, 0)
// 	p1.size.set(4, 2)

// 	var t = new RectTransformMatrix()
// 	t.parent = p1
// 	t.pivot.set(1, 1)
// 	t.anchor.set(1, 1)
// 	t.size.set(0.5, 0.5)
// 	console.log(t.toCSS())

// 	t.setPivotFix(0, 0)
// 	console.log("after changed pivot", t.toCSS(), t.global)

// 	t.setAnchorFix(0, 0)
// 	console.log("after changed anchor", t.toCSS(), t.global)
// })

// // test("Transform Parent", () => {
// // 	var p0 = new RectTransformMatrix()

// // 	var p1 = new RectTransformMatrix()
// // 	p1.parent = p0
// // 	p1.pivot.set(0, 0)
// // 	p1.anchor.set(0, 0)
// // 	p1.size.set(4, 2)

// // 	var p2 = new RectTransformMatrix()
// // 	p2.parent = p0
// // 	p2.rotation[2] = 180
// // 	p2.pivot.set(1, 1)
// // 	p2.anchor.set(1, 1)
// // 	p2.size.set(2, 4)
// // 	p2.scale[1] = 1.5

// // 	var t = new RectTransformMatrix()
// // 	t.parent = p1
// // 	t.toCSS()

// // 	t.setParentFix(p2)
// // 	t.toCSS()
// // })
