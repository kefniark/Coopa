/// <reference types="jest" />
import { onChange } from "../../src"

test("on-change", () => {
	var a: any = {}
	const proxy = onChange(a, (prop, val, prev) => {
		console.log("on-change", prop, val, prev)
	})

	proxy.a = 2
	proxy.a = 3
	proxy.b = { b: 1, c: 4 }
	proxy.b.c = 5
	proxy.b.d = { a: 1, b: 2 }
	proxy.b.d.a = 3
	delete proxy.b
})

test("on-change event", () => {
	let events = 0
	var a: any = { a: 1, b: 2 }
	const proxy = onChange(a, () => events++)

	proxy.a = 1
	proxy.b = 3
	proxy.b = 2
	proxy.b = 2

	expect(events).toBe(2)
})
