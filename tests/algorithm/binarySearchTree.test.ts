/// <reference types="jest" />
import { BinarySearchTree } from "../../src"

test("insertion with string", () => {
	const bst = new BinarySearchTree<string, number>()
	const input = "S E A R C H E X A M P L E".split(" ")
	for (let i = 0; i < input.length; i++) {
		bst.set(input[i], i)
	}

	// check if the value for duplicated key is updated.
	expect(bst.get("A")).toBe(8)
	const result = bst.entries()

	// remove duplication
	input.sort()
	const expected = [...new Set(input)]
	for (let i = 0; i < expected.length; i++) {
		expect(result[i].key).toBe(expected[i])
	}
})

test("insertion with number", () => {
	const bst = new BinarySearchTree<number, number>()
	const input = [41, 20, 65, 11, 29, 32, 50, 91, 72, 99]
	for (let i = 0; i < input.length; i++) {
		bst.set(input[i], input[i])
	}

	const result = bst.entries()

	// remove duplication
	input.sort()
	const expected = [...new Set(input)]
	for (let i = 0; i < expected.length; i++) {
		expect(result[i].key).toBe(expected[i])
		expect(result[i].val).toBe(expected[i])
	}
})

test("deletion", () => {
	const bst = new BinarySearchTree<number, number>()
	const input = [41, 91, 65, 11, 29, 32, 50, 22, 72, 99]
	for (let i = 0; i < input.length; i++) {
		bst.set(input[i], input[i])
	}

	for (let i = 0; i < input.length; i++) {
		bst.delete(input[i])
		const result = bst.entries()
		expect(result.length).toBe(input.length - i - 1)
		expect(bst.get(input[i])).toBe(null)
		// check if the bst has correct nodes
		for (let j = i + 1; j < input.length; j++) {
			expect(bst.get(input[j])).toBe(input[j])
		}
	}

	bst.delete(-1)
})

test("Clear", () => {
	const bst = new BinarySearchTree<number, number>()
	const input = [41, 20, 65, 11, 29, 32, 50, 91, 72, 99]

	for (let i = 0; i < input.length; i++) {
		bst.set(input[i], input[i])
	}
	bst.clear()
	const result = bst.entries()
	expect(result.length).toBe(0)
})

test("Keys and Value", () => {
	const bst = new BinarySearchTree<number, number>()
	const input = [41, 20, 65, 11, 29, 32, 50, 91, 72, 99]
	const map: { [key: string]: number } = {}
	for (let i = 0; i < input.length; i++) {
		map[input[i]] = i
		bst.set(input[i], i)
	}

	const keys = bst.keys()
	const values = bst.values()

	// remove duplication
	input.sort()
	for (let i = 0; i < input.length; i++) {
		expect(keys[i]).toBe(input[i])
		expect(values[i]).toBe(map[input[i]])
	}
})

test("Has Key", () => {
	const bst = new BinarySearchTree<number, number>()
	const input = [41, 20, 65, 11, 29, 32, 50, 91, 72, 99]
	for (let i = 0; i < input.length; i++) {
		bst.set(input[i], i)
	}

	for (let i = 0; i < input.length; i++) {
		expect(bst.has(input[i])).toBe(true)
	}

	for (let i = 0; i < input.length; i++) {
		bst.delete(input[i])
		expect(bst.has(input[i])).toBe(false)
	}
})

test("Print and Get Max Height", () => {
	const bst = new BinarySearchTree<number, number>()
	bst.print()
	const input = [41, 20, 65, 11, 29, 32, 50, 91, 72, 99]
	for (let i = 0; i < input.length; i++) {
		bst.set(input[i], i)
	}
	const height1 = bst.getMaxHeight()
	expect(height1).toBe(4)

	bst.print()
	input.sort()
	bst.clear()

	for (let i = 0; i < input.length; i++) {
		bst.set(input[i], i)
		const height2 = bst.getMaxHeight()
		expect(height2).toBe(i + 1)
	}
	bst.print()
})
