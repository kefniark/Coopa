/// <reference types="jest" />
import { uid } from "../../src"

test("Basic", () => {
	expect(uid().length).toBe(8)
	expect(uid(6).length).toBe(6)
	expect(uid(16).length).toBe(16)
})

test("Check for colision", () => {
	const set = new Set<string>()
	for (let i = 0; i < 100000; i++) {
		const id = uid()
		if (set.has(id)) throw new Error("collision detected !")
		set.add(id)
	}
	expect(set.size).toBe(100000)
})
