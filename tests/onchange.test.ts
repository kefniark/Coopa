/// <reference types="jest" />
import { onChange } from "../src/onchange"

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
