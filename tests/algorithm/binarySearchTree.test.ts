/// <reference types="jest" />
import { BinarySearchTree } from "../../src"

test("insertion with string", () => {
	var bst = new BinarySearchTree<string, number>()
	var input = "S E A R C H E X A M P L E".split(' ')
	for (var i = 0; i < input.length; i++) {
		bst.set(input[i], i)
	}

	// check if the value for duplicated key is updated.
	expect(bst.get("A")).toBe(8)
	var result = bst.entries()

	// remove duplication
	input.sort();
	let expected = [...new Set(input)];
	for (var i = 0; i < expected.length; i++) {
		expect(result[i].key).toBe(expected[i])
	}
})

test("insertion with number", () => {
	var bst = new BinarySearchTree<number, number>()
	var input = [41, 20, 65, 11, 29, 32, 50, 91, 72, 99];
	for (var i = 0; i < input.length; i++) {
		bst.set(input[i], input[i])
	}

	var result = bst.entries()

	// remove duplication
	input.sort();
	let expected = [...new Set(input)];
	for (var i = 0; i < expected.length; i++) {
		expect(result[i].key).toBe(expected[i])
		expect(result[i].val).toBe(expected[i])
	}
})

test("deletion", () => {
	var bst = new BinarySearchTree<number, number>()
	var input = [41, 91, 65, 11, 29, 32, 50, 22, 72, 99];
	for (var i = 0; i < input.length; i++) {
		bst.set(input[i], input[i])
	}

	for (var i = 0; i < input.length; i++) {
		bst.delete(input[i])
		var result = bst.entries()
		expect(result.length).toBe(input.length - i - 1)
		expect(bst.get(input[i])).toBe(null)

		// check if the bst has correct nodes
		for (var j = i + 1; j < input.length; j++) {
			expect(bst.get(input[j])).toBe(input[j])
		}
	}

	bst.delete(-1)

})

test("Clear", () => {
	var bst = new BinarySearchTree<number, number>()
	var input = [41, 20, 65, 11, 29, 32, 50, 91, 72, 99];

	for (var i = 0; i < input.length; i++) {
		bst.set(input[i], input[i])
	}
	bst.clear()
	var result = bst.entries()
	expect(result.length).toBe(0)
})

test("Keys and Value", () => {
	var bst = new BinarySearchTree<number, number>()
	var input = [41, 20, 65, 11, 29, 32, 50, 91, 72, 99];
	var map: { [key: string]: number; } = {}
	for (var i = 0; i < input.length; i++) {
		map[input[i]] = i
		bst.set(input[i], i)
	}

	var keys = bst.keys()
	var values = bst.values()

	// remove duplication
	input.sort();
	for (var i = 0; i < input.length; i++) {
		expect(keys[i]).toBe(input[i])
		expect(values[i]).toBe(map[input[i]])
	}
})

test("Has Key", () => {
	var bst = new BinarySearchTree<number, number>()
	var input = [41, 20, 65, 11, 29, 32, 50, 91, 72, 99];
	for (var i = 0; i < input.length; i++) {
		bst.set(input[i], i)
	}

	for (var i = 0; i < input.length; i++) {
		expect(bst.has(input[i])).toBe(true)
	}


	for (var i = 0; i < input.length; i++) {
		bst.delete(input[i])
		expect(bst.has(input[i])).toBe(false)
	}
})

test("ToString", () => {
	var bst = new BinarySearchTree<number, number>()
	bst.print()
	var input = [41, 20, 65, 11, 29, 32, 50, 91, 72, 99];
	for (var i = 0; i < input.length; i++) {
		bst.set(input[i], i)
	}
	bst.print()
})
