/// <reference types="jest" />
import { binarySearchTree } from "../../src/algorithm/binarySearchTree"

test("insertion with string", () => {
	var bst = new binarySearchTree<string, number>()
	var input = "S E A R C H E X A M P L E".split(' ')
	for (var i = 0; i < input.length; i++) {
		bst.insert(input[i], i)
	}

	// check if the value for duplicated key is updated.
	expect(bst.get("A")).toBe(8)
	var result = bst.traverse()

	// remove duplication
	input.sort();
	let expected = [...new Set(input)];
	for (var i = 0; i < expected.length; i++) {
		expect(result[i].key).toBe(expected[i])
	}
})

test("insertion with number", () => {
	var bst = new binarySearchTree<number, number>()
	var input = [41, 20, 65, 11, 29, 32, 50, 91, 72, 99];
	for (var i = 0; i < input.length; i++) {
		bst.insert(input[i], input[i])
	}

	var result = bst.traverse()

	// remove duplication
	input.sort();
	let expected = [...new Set(input)];
	for (var i = 0; i < expected.length; i++) {
		expect(result[i].key).toBe(expected[i])
		expect(result[i].val).toBe(expected[i])
	}
})

test("deletion", () => {
	var bst = new binarySearchTree<number, number>()
	var input = [41, 20, 65, 11, 29, 32, 50, 91, 72, 99];
	for (var i = 0; i < input.length; i++) {
		bst.insert(input[i], input[i])
	}

	for (var i = 0; i < input.length; i++) {
		bst.delete(input[i])
		var result = bst.traverse()
		expect(result.length).toBe(input.length - i - 1)
		expect(bst.get(input[i])).toBe(null)

		// check if the bst has correct nodes
		for (var j = i + 1; j < input.length; j++) {
			expect(bst.get(input[j])).toBe(input[j])
		}
	}
})

test("Del min", () => {
	var bst = new binarySearchTree<number, number>()
	var input = [41, 20, 65, 11, 29, 32, 50, 91, 72, 99];

	for (var i = 0; i < input.length; i++) {
		bst.insert(input[i], input[i])
	}

	input.sort()
	for (var i = 0; i < input.length; i++) {
		bst.delMin()
		var result = bst.traverse()

		for(var j = i + 1; j < result.length; j++) {
			expect(bst.get(input[j])).toBe(input[j])
		}
	}
})
