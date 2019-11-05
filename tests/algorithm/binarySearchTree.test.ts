/// <reference types="jest" />
import { binarySearchTree } from "../../src/algorithm/binarySearchTree"

test("insertion", () => {
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
	for(var i = 0; i < expected.length; i++) {
		expect(result[i].key).toBe(expected[i])
	}
})

